<#
.SYNOPSIS
    Packs Power Platform Canvas Apps from source files back to .msapp format.

.DESCRIPTION
    This script searches for Canvas App source directories within a specified solution path and packs them
    back into .msapp files. This is the reverse operation of ExtractCanvasApps.ps1, allowing developers
    to convert their source-controlled Canvas App files back to the binary format required for deployment.
    
    The script uses the Power Platform CLI (pac) to pack Canvas App source files into .msapp files,
    making them ready for solution import and deployment to Power Platform environments.

.PARAMETER solutionPath
    The path to the solution directory containing Canvas App source directories to pack.
    This should be the root directory of your Power Platform solution.

.PARAMETER dryRun
    When set to $true (default), the script will only display what would be packed without actually
    performing the packing operation. Set to $false to perform the actual packing.

.EXAMPLE
    .\PackCanvasApps.ps1 -solutionPath "MarkTestSmall20250627" -dryRun $true
    
    Performs a dry run to show which Canvas App sources would be packed without actually packing them.

.EXAMPLE
    .\PackCanvasApps.ps1 -solutionPath "MarkTestSmall20250627" -dryRun $false
    
    Packs all Canvas App source directories found in the specified solution path to .msapp files.

.EXAMPLE
    .\PackCanvasApps.ps1 -solutionPath "C:\Solutions\MyPowerPlatformSolution"
    
    Performs a dry run (default behavior) for Canvas App sources in the specified absolute path.

.NOTES
    Author: Mark Johnston
    Date: June 30, 2025
    
    Prerequisites:
    - Power Platform CLI (pac) must be installed and available in the system PATH
    - Canvas App source directories must exist (typically created by ExtractCanvasApps.ps1)
    - Appropriate permissions to read source directories and write .msapp files
    
    The script looks for Canvas App source directories in the 'src/CanvasApps/src' path structure
    and creates corresponding .msapp files with '_DocumentUri.msapp' suffix.

.LINK
    https://docs.microsoft.com/en-us/power-platform/developer/cli/reference/canvas
#>

param(
    [Parameter(Mandatory = $true, HelpMessage = "Path to the solution directory containing Canvas App sources")]
    [ValidateScript({Test-Path $_ -PathType Container})]
    [string]$solutionPath,
    
    [Parameter(Mandatory = $false, HelpMessage = "Set to false to perform actual packing, true for dry run")]
    [bool]$dryRun = $true
)

Write-Host "Starting Canvas App packing process..." -ForegroundColor Cyan
Write-Host "Solution Path: $solutionPath" -ForegroundColor White
Write-Host "Dry Run Mode: $dryRun" -ForegroundColor White
Write-Host ""

# Construct the path to Canvas Apps source directories
$canvasAppsParentFolder = Join-Path -Path $solutionPath -ChildPath "src/CanvasApps"
$canvasAppSourcePath = Join-Path -Path $canvasAppsParentFolder -ChildPath "src"

# Validate that the Canvas Apps source path exists
if (-not (Test-Path $canvasAppSourcePath -PathType Container)) {
    Write-Warning "Canvas Apps source directory not found: $canvasAppSourcePath"
    Write-Host "This typically means Canvas Apps haven't been extracted yet. Run ExtractCanvasApps.ps1 first." -ForegroundColor Yellow
    exit 0
}

# Find all Canvas App source directories
Write-Host "Searching for Canvas App source directories..." -ForegroundColor Yellow
$canvasAppSourceFolders = Get-ChildItem -Path $canvasAppSourcePath -Directory

if ($canvasAppSourceFolders.Count -eq 0) {
    Write-Warning "No Canvas App source directories found in: $canvasAppSourcePath"
    Write-Host "This typically means Canvas Apps haven't been extracted yet. Run ExtractCanvasApps.ps1 first." -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $($canvasAppSourceFolders.Count) Canvas App source director(ies) to process:" -ForegroundColor Green
$canvasAppSourceFolders | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }
Write-Host ""

# Process each Canvas App source directory
foreach ($canvasAppSourceFolder in $canvasAppSourceFolders) {
    try {
        # Construct the output .msapp file path
        $canvasAppMsAppFileName = Join-Path -Path $canvasAppsParentFolder -ChildPath ($canvasAppSourceFolder.Name + "_DocumentUri.msapp")

        Write-Host "Processing Canvas App: $($canvasAppSourceFolder.Name)" -ForegroundColor Cyan
        Write-Host "  Source directory: $($canvasAppSourceFolder.FullName)" -ForegroundColor Gray
        Write-Host "  Target .msapp file: $canvasAppMsAppFileName" -ForegroundColor Gray
        
        if ($dryRun) {
            Write-Host "  [DRY RUN] Would pack to: $canvasAppMsAppFileName" -ForegroundColor Yellow
        }
        else {
            # Ensure the target directory exists
            $targetDirectory = Split-Path $canvasAppMsAppFileName -Parent
            if (-not (Test-Path $targetDirectory)) {
                New-Item -Path $targetDirectory -ItemType Directory -Force | Out-Null
                Write-Host "  Created directory: $targetDirectory" -ForegroundColor Green
            }
            
            # Check if source directory contains Canvas App files
            $sourceFiles = Get-ChildItem -Path $canvasAppSourceFolder.FullName -Recurse -File
            if ($sourceFiles.Count -eq 0) {
                Write-Warning "  Skipping - Source directory is empty: $($canvasAppSourceFolder.FullName)"
                continue
            }
            
            # Execute the pac canvas pack command
            Write-Host "  Packing Canvas App..." -ForegroundColor Yellow
            $pacResult = pac canvas pack --msapp $canvasAppMsAppFileName --sources $canvasAppSourceFolder.FullName 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  ✓ Successfully packed Canvas App" -ForegroundColor Green
                
                # Display file size information
                if (Test-Path $canvasAppMsAppFileName) {
                    $fileSize = (Get-Item $canvasAppMsAppFileName).Length
                    $fileSizeKB = [math]::Round($fileSize / 1KB, 2)
                    Write-Host "  📦 Created .msapp file ($fileSizeKB KB)" -ForegroundColor Green
                }
            }
            else {
                Write-Error "  ✗ Failed to pack Canvas App: $pacResult"
            }
        }
        Write-Host ""
    }
    catch {
        Write-Error "Error processing Canvas App $($canvasAppSourceFolder.Name): $($_.Exception.Message)"
    }
}

if ($dryRun) {
    Write-Host "Dry run completed. Use -dryRun `$false to perform actual packing." -ForegroundColor Yellow
}
else {
    Write-Host "Canvas App packing process completed." -ForegroundColor Green
    
    # Summary of created files
    $createdMsAppFiles = Get-ChildItem -Path $canvasAppsParentFolder -Filter "*_DocumentUri.msapp" -ErrorAction SilentlyContinue
    if ($createdMsAppFiles.Count -gt 0) {
        Write-Host ""
        Write-Host "Created .msapp files:" -ForegroundColor Green
        $createdMsAppFiles | ForEach-Object { 
            $fileSize = [math]::Round($_.Length / 1KB, 2)
            Write-Host "  - $($_.Name) ($fileSize KB)" -ForegroundColor White 
        }
    }
}