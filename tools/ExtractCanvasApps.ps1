<#
.SYNOPSIS
    Extracts Power Platform Canvas Apps from .msapp files to source-friendly format.

.DESCRIPTION
    This script searches for Canvas App .msapp files within a specified solution path and extracts them
    into separate source directories. This allows Canvas Apps to be stored in source control in an 
    editable format rather than as binary .msapp files.
    
    The script uses the Power Platform CLI (pac) to unpack Canvas Apps into their constituent source files,
    making them suitable for version control, collaborative development, and CI/CD pipelines.

.PARAMETER solutionPath
    The path to the solution directory containing Canvas Apps (.msapp files) to extract.
    This should be the root directory of your Power Platform solution.

.PARAMETER dryRun
    When set to $true (default), the script will only display what would be extracted without actually
    performing the extraction. Set to $false to perform the actual extraction.

.EXAMPLE
    .\ExtractCanvasApps.ps1 -solutionPath "MarkTestSmall20250627" -dryRun $true
    
    Performs a dry run to show which Canvas Apps would be extracted without actually extracting them.

.EXAMPLE
    .\ExtractCanvasApps.ps1 -solutionPath "MarkTestSmall20250627" -dryRun $false
    
    Extracts all Canvas Apps found in the specified solution path to their respective source directories.

.NOTES
    Author: Mark Johnston
    Date: June 30, 2025
    
    Prerequisites:
    - Power Platform CLI (pac) must be installed and available in the system PATH
    - Appropriate permissions to read .msapp files and write to the solution directory
    
    The script creates a 'src' subdirectory for each Canvas App, using the app name 
    (extracted before the '_DocumentUri' suffix) as the folder name.

.LINK
    https://docs.microsoft.com/en-us/power-platform/developer/cli/reference/canvas
#>

param(
    [Parameter(Mandatory = $true, HelpMessage = "Path to the solution directory containing Canvas Apps")]
    [ValidateScript({Test-Path $_ -PathType Container})]
    [string]$solutionPath,
    
    [Parameter(Mandatory = $false, HelpMessage = "Set to false to perform actual extraction, true for dry run")]
    [bool]$dryRun = $true
)

Write-Host "Starting Canvas App extraction process..." -ForegroundColor Cyan
Write-Host "Solution Path: $solutionPath" -ForegroundColor White
Write-Host "Dry Run Mode: $dryRun" -ForegroundColor White
Write-Host ""

# Find all Canvas App (.msapp) files in the solution directory
Write-Host "Searching for Canvas Apps (.msapp files)..." -ForegroundColor Yellow
$canvasApps = Get-ChildItem -Path $solutionPath -Recurse -Include *.msapp

if ($canvasApps.Count -eq 0) {
    Write-Warning "No Canvas Apps (.msapp files) found in the specified path: $solutionPath"
    exit 0
}

Write-Host "Found $($canvasApps.Count) Canvas App(s) to process:" -ForegroundColor Green
$canvasApps | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }
Write-Host ""

# Process each Canvas App
foreach ($app in $canvasApps) {
    try {
        # Extract the app name (remove the '_DocumentUri...' suffix)
        $appNameEndIndex = $app.BaseName.IndexOf("_DocumentUri")
        if ($appNameEndIndex -eq -1) {
            Write-Warning "Skipping $($app.Name) - does not follow expected naming convention"
            continue
        }
        
        $appName = $app.BaseName.Substring(0, $appNameEndIndex)
        $canvasAppExtractPath = Join-Path -Path $app.Directory -ChildPath "src" -AdditionalChildPath $appName

        Write-Host "Processing Canvas App: $($app.Name)" -ForegroundColor Cyan
        Write-Host "  Source file: $($app.FullName)" -ForegroundColor Gray
        Write-Host "  Extract path: $canvasAppExtractPath" -ForegroundColor Gray
        
        if ($dryRun) {
            Write-Host "  [DRY RUN] Would extract to: $canvasAppExtractPath" -ForegroundColor Yellow
        }
        else {
            # Ensure the extract directory exists
            if (-not (Test-Path $canvasAppExtractPath)) {
                New-Item -Path $canvasAppExtractPath -ItemType Directory -Force | Out-Null
                Write-Host "  Created directory: $canvasAppExtractPath" -ForegroundColor Green
            }
            
            # Execute the pac canvas unpack command
            Write-Host "  Extracting Canvas App..." -ForegroundColor Yellow
            $pacResult = pac canvas unpack --msapp $app.FullName --sources $canvasAppExtractPath 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  ✓ Successfully extracted Canvas App" -ForegroundColor Green
            }
            else {
                Write-Error "  ✗ Failed to extract Canvas App: $pacResult"
            }
        }
        Write-Host ""
    }
    catch {
        Write-Error "Error processing Canvas App $($app.Name): $($_.Exception.Message)"
    }
}

if ($dryRun) {
    Write-Host "Dry run completed. Use -dryRun `$false to perform actual extraction." -ForegroundColor Yellow
}
else {
    Write-Host "Canvas App extraction process completed." -ForegroundColor Green
}