<#
.SYNOPSIS
    Extracts reference data from a Power Platform solution data file into individual XML files.

.DESCRIPTION
    This script uses the XrmCIFramework to extract reference data from a compressed data file
    into individual XML files organized by entity type. This allows reference data to be 
    stored in source control in a readable format and managed across different environments.
    
    The script temporarily installs XrmCIFramework, extracts the data, and then cleans up
    the temporary installation to avoid polluting the workspace.

.PARAMETER dataFile
    The path to the compressed data file (.zip) containing reference data to extract.
    This file is typically exported from a Power Platform environment.

.PARAMETER dataRelativePath
    The relative path where extracted XML files will be stored.
    Default is ".\ReferenceData".

.PARAMETER environment
    The target environment name used to organize extracted data into subfolders.
    Valid values: DEV, INT, QA, PreProd, Prod, Hotfix, Training, Common.
    Default is "Common".

.PARAMETER dryRun
    When set to $true (default), the script will show what would be extracted without
    actually performing the extraction. Set to $false to perform the actual extraction.

.EXAMPLE
    .\ExtractReferenceData.ps1 -dataFile ".\data\ReferenceData.zip" -environment "DEV"
    
    Performs a dry run extraction of reference data for the DEV environment.

.EXAMPLE
    .\ExtractReferenceData.ps1 -dataFile ".\data\ReferenceData.zip" -environment "Common" -dryRun $false
    
    Extracts reference data into the Common environment folder.

.EXAMPLE
    .\ExtractReferenceData.ps1 -dataFile "C:\Data\Export.zip" -dataRelativePath ".\CustomData" -environment "QA" -dryRun $false
    
    Extracts reference data to a custom path for the QA environment.

.NOTES
    Author: Mark Johnston (Mark.Johnston@va.gov)
    Date: July 2, 2025
    
    Prerequisites:
    - PowerShell execution policy must allow script execution
    - Internet connection required to download XrmCIFramework package
    - Sufficient disk space for temporary package installation
    
    The script will:
    1. Download and install XrmCIFramework package temporarily
    2. Extract data using the framework's ExtractCMData script
    3. Clean up temporary files and uninstall the package
    
    Output files are organized as: {dataRelativePath}\{environment}\{EntityName}.xml

.LINK
    https://github.com/WaelHamze/xrm-ci-framework
#>

param(
    [Parameter(Mandatory = $true, HelpMessage = "The path of the data file to extract")]
    [ValidateScript({Test-Path $_ -PathType Leaf})]
    [string]$dataFile,

    [Parameter(Mandatory = $false, HelpMessage = "The relative path of data.xml to create/update")]
    [string]$dataRelativePath = ".\ReferenceData",

    [Parameter(Mandatory = $false, HelpMessage = "Environment: DEV, INT, QA, PreProd, Prod, Hotfix, Training, Common")]
    [ValidateSet("DEV", "INT", "QA", "PreProd", "Prod", "Hotfix", "Training", "Common")]
    [string]$environment = "Common",
    
    [Parameter(Mandatory = $false, HelpMessage = "Set to false to perform actual extraction, true for dry run")]
    [bool]$dryRun = $true
)

function ExtractReferenceData {
    param(
        [string]$dataFile,
        [string]$dataRelativePath,
        [string]$environment,
        [bool]$dryRun
    )

    Write-Host "Starting reference data extraction process..." -ForegroundColor Cyan
    Write-Host "Data File: $dataFile" -ForegroundColor White
    Write-Host "Extract Path: $dataRelativePath\$environment" -ForegroundColor White
    Write-Host "Environment: $environment" -ForegroundColor White
    Write-Host "Dry Run Mode: $dryRun" -ForegroundColor White
    Write-Host ""

    if ($dryRun) {
        Write-Host "[DRY RUN] Would extract reference data from: $dataFile" -ForegroundColor Yellow
        Write-Host "[DRY RUN] Would create files in: $dataRelativePath\$environment" -ForegroundColor Yellow
        Write-Host "[DRY RUN] Data would be split into individual entity files" -ForegroundColor Yellow
        return $true
    }

    # Validate input file exists
    if (-not (Test-Path $dataFile -PathType Leaf)) {
        Write-Host "Error: Data file not found: $dataFile" -ForegroundColor Red
        return $false
    }

    # Create packages directory if it doesn't exist
    $packagesPath = ".\packages"
    if (-not (Test-Path $packagesPath)) {
        $null = New-Item -Path $packagesPath -ItemType Directory -Force
        Write-Host "Created packages directory: $packagesPath" -ForegroundColor Green
    }

    try {
        # Install XrmCIFramework
        $version = "9.1.0.18"
        Write-Host "Installing XrmCIFramework version $version..." -ForegroundColor Yellow
        
        Install-Package XrmCIFramework -Scope CurrentUser -Destination $packagesPath -Force -RequiredVersion $version -ErrorAction Stop
        Write-Host "Successfully installed XrmCIFramework" -ForegroundColor Green

        # Configure extraction settings
        $sortExtractedData = $false
        $splitExtractedData = $true

        # Construct script path
        $scriptPath = Join-Path -Path $packagesPath -ChildPath "XrmCIFramework.$version\tools\ExtractCMData.ps1"
        
        if (-not (Test-Path $scriptPath)) {
            Write-Host "Error: ExtractCMData script not found at: $scriptPath" -ForegroundColor Red
            return $false
        }

        # Ensure extract folder exists
        $extractPath = Join-Path -Path $dataRelativePath -ChildPath $environment
        if (-not (Test-Path $extractPath)) {
            $null = New-Item -Path $extractPath -ItemType Directory -Force -Recurse
            Write-Host "Created extract directory: $extractPath" -ForegroundColor Green
        }

        # Run the ExtractCMData script from XrmCIFramework
        Write-Host "Extracting reference data..." -ForegroundColor Yellow
        Write-Host "  Source: $dataFile" -ForegroundColor Gray
        Write-Host "  Destination: $extractPath" -ForegroundColor Gray
        Write-Host "  Split data: $splitExtractedData" -ForegroundColor Gray
        
        & $scriptPath -dataFile $dataFile -extractFolder $extractPath -sortExtractedData $sortExtractedData -splitExtractedData $splitExtractedData
        Write-Host "Successfully extracted reference data" -ForegroundColor Green
        
        # Show summary of extracted files
        $extractedFiles = Get-ChildItem -Path $extractPath -Filter "*.xml" -ErrorAction SilentlyContinue
        if ($extractedFiles -and $extractedFiles.Count -gt 0) {
            Write-Host ""
            Write-Host "Extracted $($extractedFiles.Count) XML files:" -ForegroundColor Green
            $extractedFiles | ForEach-Object { 
                $fileSize = [math]::Round($_.Length / 1KB, 2)
                Write-Host "  - $($_.Name) ($fileSize KB)" -ForegroundColor White 
            }
        }
        return $true
    }
    catch {
        Write-Host "Error during extraction: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    finally {
        # Cleanup: Uninstall XrmCIFramework and remove packages
        try {
            Write-Host "Cleaning up temporary files..." -ForegroundColor Yellow
            Uninstall-Package XrmCIFramework -Scope CurrentUser -Destination $packagesPath -Force -ErrorAction SilentlyContinue
            if (Test-Path $packagesPath) {
                Remove-Item -Path $packagesPath -Recurse -Force -ErrorAction SilentlyContinue
                Write-Host "Cleaned up packages directory" -ForegroundColor Green
            }
        }
        catch {
            Write-Warning "Could not fully clean up packages directory: $($_.Exception.Message)"
        }
    }
}

# Execute the extraction
$success = ExtractReferenceData -dataFile $dataFile -dataRelativePath $dataRelativePath -environment $environment -dryRun $dryRun

if ($dryRun) {
    Write-Host "Dry run completed. Use -dryRun `$false to perform actual extraction." -ForegroundColor Yellow
}
elseif ($success) {
    Write-Host "Reference data extraction completed successfully." -ForegroundColor Green
}
else {
    Write-Host "Reference data extraction failed." -ForegroundColor Red
    exit 1
}