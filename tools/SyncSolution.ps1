<#
.SYNOPSIS
    Syncs a Power Platform solution from environment, extracts Canvas Apps, and cleans plugin DLL files.

.DESCRIPTION
    This script automates the complete solution synchronization process from a Power Platform environment
    with post-sync cleanup and optimization. It performs the following comprehensive steps:
    
    1. Runs 'pac solution sync' to sync the solution from the Power Platform environment (with optional mapping file)
    2. Calls ExtractCanvasApps.ps1 to extract Canvas Apps to source-friendly format and delete .msapp files
    3. Cleans up plugin assembly DLL files from the PluginAssemblies directory (removes binary files from source control)
    
    This provides a complete solution sync workflow optimized for source control, removing binary files
    that should not be version controlled while preserving all source-friendly formats.

.PARAMETER SolutionName
    The name of the Power Platform solution to sync. This should match the solution name 
    in your Power Platform environment and the folder name under src\Solutions\.
    Example: "TestRelease_20250801"

.PARAMETER MapFileName
    Optional. The name of the mapping file to use for solution sync. If specified, this file
    should exist in the solution directory and will be used with the --map parameter.
    Example: "map.xml"

.EXAMPLE
    .\SyncSolution.ps1 -SolutionName "TestRelease_20250801"
    
    Syncs the TestRelease_20250801 solution without a mapping file, extracts Canvas Apps to source format,
    deletes .msapp files, and cleans up plugin DLL files.

.EXAMPLE
    .\SyncSolution.ps1 -SolutionName "TestRelease_20250801" -MapFileName "map.xml"
    
    Syncs the TestRelease_20250801 solution using the map.xml mapping file, extracts Canvas Apps,
    and performs complete cleanup of binary files.

.EXAMPLE
    .\SyncSolution.ps1 -SolutionName "MyCustomSolution" -MapFileName "custom-map.xml"
    
    Syncs MyCustomSolution using a custom mapping file with full post-sync processing.

.NOTES
    File Name      : SyncSolution.ps1
    Author         : Mark Johnston (with GitHub Copilot) - Mark.Johnston@va.gov
    Prerequisite   : PowerShell 5.1+, Power Platform CLI (pac)
    
    Dependencies:
    - Power Platform CLI must be installed and authenticated to target environment
    - ExtractCanvasApps.ps1 must be in the same tools directory
    - Solution must exist in the connected Power Platform environment
    
    Post-Sync Processing:
    - Canvas Apps: Extracted to src/CanvasApps/src/{AppName} directories, .msapp files deleted
    - Plugin Assemblies: All .dll files removed from src/PluginAssemblies directory tree
    - Source Control Optimization: Only source-friendly files remain after processing
    
    Exit Codes:
    - 0: Success
    - 1: Solution folder not found
    - 2: pac solution sync failed
    - 3: Canvas app extraction failed (sync still completed)

.LINK
    Power Platform ALM Documentation: https://docs.microsoft.com/power-platform/alm/

#>

param(
    [Parameter(Mandatory=$true, HelpMessage="The name of the Power Platform solution to sync")]
    [ValidateNotNullOrEmpty()]
    [string]$SolutionName,
    
    [Parameter(Mandatory=$false, HelpMessage="Optional mapping file name for solution sync")]
    [string]$MapFileName
)

# Display script header
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Power Platform Solution Sync & Extract" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Solution: $SolutionName" -ForegroundColor Yellow
if ($MapFileName) {
    Write-Host "Map File: $MapFileName" -ForegroundColor Yellow
}
Write-Host "============================================" -ForegroundColor Cyan

# Get script directory for relative path resolution
$scriptFullPath = $MyInvocation.MyCommand.Path
$scriptDirectory = Split-Path $scriptFullPath -Parent

# Resolve solution folder path
$solutionRelativePath = "$scriptDirectory\..\src\Solutions\$SolutionName"
if (-not (Test-Path $solutionRelativePath)) {
    Write-Host "ERROR: Solution folder not found at: $solutionRelativePath" -ForegroundColor Red
    Write-Host "Please verify the solution name and folder structure." -ForegroundColor Yellow
    exit 1
}
$solutionFolderPath = Resolve-Path $solutionRelativePath

Write-Host "Solution folder: $($solutionFolderPath.Path)" -ForegroundColor Green

# Step 1: Sync Solution
Write-Host "`n--- Step 1: Syncing Solution ---" -ForegroundColor Cyan

# Save current location and change to solution directory
$originalLocation = Get-Location
try {
    Set-Location $solutionFolderPath.Path
    Write-Host "Working directory set to: $($solutionFolderPath.Path)" -ForegroundColor Yellow
    
    # Build the pac solution sync command
    $syncCommand = "pac solution sync"
    if ($MapFileName) {
        $mapFilePath = Join-Path $solutionFolderPath.Path $MapFileName
        if (Test-Path $mapFilePath) {
            $syncCommand += " --map `"$MapFileName`""
            Write-Host "Using mapping file: $MapFileName" -ForegroundColor Yellow
        } else {
            Write-Host "WARNING: Mapping file '$MapFileName' not found at: $mapFilePath" -ForegroundColor Yellow
            Write-Host "Proceeding without mapping file..." -ForegroundColor Yellow
        }
    }
    
    Write-Host "Running: $syncCommand" -ForegroundColor Yellow
    if ($MapFileName -and (Test-Path (Join-Path $solutionFolderPath.Path $MapFileName))) {
        & pac solution sync --map $MapFileName
    } else {
        & pac solution sync
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Solution sync completed successfully" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Solution sync failed (Exit Code: $LASTEXITCODE)" -ForegroundColor Red
        exit 2
    }
} catch {
    Write-Host "ERROR: Failed to sync solution - $($_.Exception.Message)" -ForegroundColor Red
    exit 2
} finally {
    # Always restore the original location
    Set-Location $originalLocation
}

# Step 2: Extract Canvas Apps
Write-Host "`n--- Step 2: Extracting Canvas Apps ---" -ForegroundColor Cyan

try {
    $extractScript = Join-Path $scriptDirectory "ExtractCanvasApps.ps1"
    if (-not (Test-Path $extractScript)) {
        Write-Host "WARNING: ExtractCanvasApps.ps1 not found at: $extractScript" -ForegroundColor Yellow
        Write-Host "Skipping Canvas App extraction" -ForegroundColor Yellow
    } else {
        Write-Host "Calling ExtractCanvasApps.ps1..." -ForegroundColor Yellow
        & $extractScript -solutionPath $solutionFolderPath.Path -dryRun $false
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Canvas App extraction completed successfully" -ForegroundColor Green
        } else {
            Write-Host "WARNING: Canvas App extraction completed with warnings (Exit Code: $LASTEXITCODE)" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "WARNING: Failed to extract Canvas Apps - $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "Solution sync was successful, but Canvas App extraction failed" -ForegroundColor Yellow
}

# Step 3: Clean Plugin Assembly DLL Files
Write-Host "`n--- Step 3: Cleaning Plugin Assembly DLL Files ---" -ForegroundColor Cyan

try {
    $pluginAssembliesPath = Join-Path $solutionFolderPath.Path "src\PluginAssemblies"
    
    if (Test-Path $pluginAssembliesPath) {
        Write-Host "Searching for DLL files in: $pluginAssembliesPath" -ForegroundColor Yellow
        
        # Find all DLL files recursively in the PluginAssemblies directory
        $dllFiles = Get-ChildItem -Path $pluginAssembliesPath -Filter "*.dll" -Recurse -ErrorAction SilentlyContinue
        
        if ($dllFiles -and $dllFiles.Count -gt 0) {
            Write-Host "Found $($dllFiles.Count) DLL file(s) to delete:" -ForegroundColor Yellow
            
            foreach ($dllFile in $dllFiles) {
                try {
                    Write-Host "  Deleting: $($dllFile.FullName)" -ForegroundColor Gray
                    Remove-Item -Path $dllFile.FullName -Force
                    Write-Host "  ✓ Deleted: $($dllFile.Name)" -ForegroundColor Green
                }
                catch {
                    Write-Host "  ⚠ Failed to delete $($dllFile.Name): $($_.Exception.Message)" -ForegroundColor Yellow
                }
            }
            
            Write-Host "Plugin assembly DLL cleanup completed" -ForegroundColor Green
        } else {
            Write-Host "No DLL files found in PluginAssemblies directory" -ForegroundColor Yellow
        }
    } else {
        Write-Host "PluginAssemblies directory not found: $pluginAssembliesPath" -ForegroundColor Yellow
        Write-Host "Skipping DLL cleanup" -ForegroundColor Yellow
    }
} catch {
    Write-Host "WARNING: Failed to clean plugin assembly DLL files - $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "This does not affect the solution sync process" -ForegroundColor Yellow
}

Write-Host "`n============================================" -ForegroundColor Green
Write-Host "SYNC AND EXTRACT COMPLETED" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host "Solution '$SolutionName' synced and Canvas Apps extracted successfully" -ForegroundColor Green

Write-Host "`nSync and extract process completed!" -ForegroundColor Green

