<#
.SYNOPSIS
    Extracts reference data from a Power Platform solution data file into individual XML files.

.DESCRIPTION
    This script uses the XrmCIFramework to extract reference data from a compressed data file
    into individual XML files organized by entity type. This allows reference data to be 
    stored in source control in a readable format and managed across different environments.
    
    The script temporarily installs XrmCIFramework, extracts the data, and then cleans up
    the temporary installation to avoid polluting the workspace.

.PARAMETER DataFile
    The path to the compressed data file (.zip) containing reference data to extract.
    This file is typically exported from a Power Platform environment.

.PARAMETER DataRelativePath
    The relative path where extracted XML files will be stored.
    Default is ".\src\ReferenceData".

.PARAMETER Environment
    The target environment name used to organize extracted data into subfolders.
    Valid values: DEV, INT, QA, PreProd, Prod, Hotfix, Training, Common.
    Default is "Common".

.PARAMETER DryRun
    When set to $true (default), the script will show what would be extracted without
    actually performing the extraction. Set to $false to perform the actual extraction.

.EXAMPLE
    .\ExtractReferenceData.ps1 -DataFile ".\data\ReferenceData.zip" -Environment "DEV"

    Performs a dry run extraction of reference data for the DEV environment.

.EXAMPLE
    .\ExtractReferenceData.ps1 -DataFile ".\data\ReferenceData.zip" -Environment "Common" -DryRun $false

    Extracts reference data into the Common environment folder.

.EXAMPLE
    .\ExtractReferenceData.ps1 -DataFile "C:\Data\Export.zip" -DataRelativePath ".\CustomData" -Environment "QA" -DryRun $false

    Extracts reference data to a custom path for the QA environment.

.NOTES
    Author: Mark Johnston (with GitHub Copilot) - Mark.Johnston@va.gov
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
    [string]$DataFile,

    [Parameter(Mandatory = $false, HelpMessage = "The relative path of data.xml to create/update")]
    [string]$DataRelativePath = ".\src\ReferenceData",

    [Parameter(Mandatory = $false, HelpMessage = "Environment: DEV, INT, QA, PreProd, Prod, Hotfix, Training, Common")]
    [ValidateSet("DEV", "INT", "QA", "PreProd", "Prod", "Hotfix", "Training", "Common")]
    [string]$Environment = "Common",
    
    [Parameter(Mandatory = $false, HelpMessage = "Set to false to perform actual extraction, true for dry run")]
    [bool]$DryRun = $true
)

function ExtractReferenceData {
    param(
        [string]$DataFile,
        [string]$DataRelativePath,
        [string]$Environment,
        [bool]$DryRun
    )

    Write-Host "Starting reference data extraction process..." -ForegroundColor Cyan
    Write-Host "Data File: $DataFile" -ForegroundColor White
    Write-Host "Extract Path: $DataRelativePath\$Environment" -ForegroundColor White
    Write-Host "Environment: $Environment" -ForegroundColor White
    Write-Host "Dry Run Mode: $DryRun" -ForegroundColor White
    Write-Host ""

    if ($DryRun) {
        Write-Host "[DRY RUN] Would extract reference data from: $DataFile" -ForegroundColor Yellow
        Write-Host "[DRY RUN] Would create files in: $DataRelativePath\$Environment" -ForegroundColor Yellow
        Write-Host "[DRY RUN] Data would be split into individual entity files" -ForegroundColor Yellow
        return $true
    }

    # Validate input file exists
    if (-not (Test-Path $DataFile -PathType Leaf)) {
        Write-Host "Error: Data file not found: $DataFile" -ForegroundColor Red
        return $false
    }

    # Create packages directory if it doesn't exist
    $packagesRelativePath = ".\packages"
    if (-not (Test-Path $packagesRelativePath)) {
        $null = New-Item -Path $packagesRelativePath -ItemType Directory -Force
        Write-Host "Created packages directory: $packagesRelativePath" -ForegroundColor Green
    }
    $packagesPath = Resolve-Path $packagesRelativePath

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
        $extractPath = Join-Path -Path (Resolve-Path $DataRelativePath) -ChildPath $Environment
        if (-not (Test-Path $extractPath)) {
            $null = New-Item -Path $extractPath -ItemType Directory -Force
            Write-Host "Created extract directory: $extractPath" -ForegroundColor Green
        }

        # Run the ExtractCMData script from XrmCIFramework
        Write-Host "Extracting reference data..." -ForegroundColor Yellow
        Write-Host "  Source: $DataFile" -ForegroundColor Gray
        Write-Host "  Destination: $extractPath" -ForegroundColor Gray
        Write-Host "  Split data: $splitExtractedData" -ForegroundColor Gray
        
        & $scriptPath -dataFile $DataFile -extractFolder $extractPath -sortExtractedData $sortExtractedData -splitExtractedData $splitExtractedData
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
$success = ExtractReferenceData -dataFile $DataFile -dataRelativePath $DataRelativePath -environment $Environment -dryRun $DryRun

if ($DryRun) {
    Write-Host "Dry run completed. Use -dryRun `$false to perform actual extraction." -ForegroundColor Yellow
}
elseif ($success) {
    Write-Host "Reference data extraction completed successfully." -ForegroundColor Green
}
else {
    Write-Host "Reference data extraction failed." -ForegroundColor Red
    exit 1
}