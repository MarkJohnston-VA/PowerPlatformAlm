<#
.SYNOPSIS
    Packages reference data XML files into a compressed data file for Power Platform deployment.

.DESCRIPTION
    This script uses the XrmCIFramework to package individual reference data XML files
    back into a compressed data file (.zip) suitable for importing into Power Platform environments.
    This is the reverse operation of ExtractReferenceData.ps1, allowing reference data
    managed in source control to be packaged for deployment.
    
    The script temporarily installs XrmCIFramework, packages the data, and then cleans up
    the temporary installation to avoid polluting the workspace.

.PARAMETER DataRelativePath
    The relative path containing XML files to package.
    Default is ".\power-platform\ReferenceData".

.PARAMETER Environment
    The source environment name used to locate XML files in subfolders.
    Valid values: DEV, INT, QA, PreProd, Prod, Hotfix, Training, Common.
    Default is "Common".

.PARAMETER DryRun
    When set to $true (default), the script will show what would be packaged without
    actually performing the packaging. Set to $false to perform the actual packaging.

.EXAMPLE
    .\PackageReferenceData.ps1 -Environment "DEV"
    
    Performs a dry run packaging of reference data from the DEV environment folder.

.EXAMPLE
    .\PackageReferenceData.ps1 -Environment "Common" -DryRun $false
    
    Packages reference data from the Common environment folder into a data file.

.EXAMPLE
    .\PackageReferenceData.ps1 -DataRelativePath ".\CustomData" -Environment "QA" -DryRun $false
    
    Packages reference data from a custom path for the QA environment.

.NOTES
    Author: Mark Johnston (with GitHub Copilot) - Mark.Johnston@va.gov
    Date: July 2, 2025
    
    Prerequisites:
    - PowerShell execution policy must allow script execution
    - Internet connection required to download XrmCIFramework package
    - XML files must exist in the specified data path
    - Sufficient disk space for temporary package installation and output file
    
    The script will:
    1. Download and install XrmCIFramework package temporarily
    2. Package XML files using the framework's PackCMData script
    3. Create a compressed data file in .\bin\Data_{environment}.zip
    4. Clean up temporary files and uninstall the package
    
    Input files are expected at: {DataRelativePath}\{Environment}\*.xml
    Output file is created at: .\bin\Data_{Environment}.zip

.LINK
    https://github.com/WaelHamze/xrm-ci-framework
#>

param(
    [Parameter(Mandatory = $false, HelpMessage = "The relative path containing XML files to package")]
    [string]$DataRelativePath = ".\power-platform\ReferenceData",

    [Parameter(Mandatory = $false, HelpMessage = "Environment: DEV, INT, QA, PreProd, Prod, Hotfix, Training, Common")]
    [ValidateSet("DEV", "INT", "QA", "PreProd", "Prod", "Hotfix", "Training", "Common")]
    [string]$Environment = "Common",
    
    [Parameter(Mandatory = $false, HelpMessage = "Set to false to perform actual packaging, true for dry run")]
    [bool]$DryRun = $true
)

function PackageReferenceData {
    param(
        [string]$DataRelativePath,
        [string]$Environment,
        [bool]$DryRun
    )

    Write-Host "Starting reference data packaging process..." -ForegroundColor Cyan
    Write-Host "Source Path: $DataRelativePath\$Environment" -ForegroundColor White
    Write-Host "Environment: $Environment" -ForegroundColor White
    Write-Host "Dry Run Mode: $DryRun" -ForegroundColor White
    Write-Host ""

    # Construct paths
    $sourcePath = Join-Path -Path $DataRelativePath -ChildPath $Environment
    $dataFile = ".\bin\Data_$Environment.zip"

    if ($DryRun) {
        Write-Host "[DRY RUN] Would package XML files from: $sourcePath" -ForegroundColor Yellow
        Write-Host "[DRY RUN] Would create data file: $dataFile" -ForegroundColor Yellow
        Write-Host "[DRY RUN] XML files would be combined into single data package" -ForegroundColor Yellow
        
        # Show what files would be packaged
        if (Test-Path $sourcePath) {
            $xmlFiles = Get-ChildItem -Path $sourcePath -Filter "*.xml" -ErrorAction SilentlyContinue
            if ($xmlFiles -and $xmlFiles.Count -gt 0) {
                Write-Host "[DRY RUN] Found $($xmlFiles.Count) XML files to package:" -ForegroundColor Yellow
                $xmlFiles | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor Gray }
            }
            else {
                Write-Host "[DRY RUN] No XML files found in source directory" -ForegroundColor Yellow
            }
        }
        else {
            Write-Host "[DRY RUN] Source directory does not exist: $sourcePath" -ForegroundColor Yellow
        }
        return $true
    }

    # Validate source directory exists
    if (-not (Test-Path $sourcePath -PathType Container)) {
        Write-Host "Error: Source directory not found: $sourcePath" -ForegroundColor Red
        Write-Host "Run ExtractReferenceData.ps1 first to create XML files." -ForegroundColor Yellow
        return $false
    }

    # Check for XML files
    $xmlFiles = Get-ChildItem -Path $sourcePath -Filter "*.xml" -ErrorAction SilentlyContinue
    if (-not $xmlFiles -or $xmlFiles.Count -eq 0) {
        Write-Host "Error: No XML files found in: $sourcePath" -ForegroundColor Red
        Write-Host "Run ExtractReferenceData.ps1 first to create XML files." -ForegroundColor Yellow
        return $false
    }

    Write-Host "Found $($xmlFiles.Count) XML files to package:" -ForegroundColor Green
    $xmlFiles | ForEach-Object { 
        $fileSize = [math]::Round($_.Length / 1KB, 2)
        Write-Host "  - $($_.Name) ($fileSize KB)" -ForegroundColor White 
    }
    Write-Host ""

    # Create bin directory if it doesn't exist
    $binPath = ".\bin"
    if (-not (Test-Path $binPath)) {
        $null = New-Item -Path $binPath -ItemType Directory -Force
        Write-Host "Created bin directory: $binPath" -ForegroundColor Green
    }

    # Create packages directory if it doesn't exist
    $packagesPath = ".\packages"
    if (-not (Test-Path $packagesPath)) {
        $null = New-Item -Path $packagesPath -ItemType Directory -Force
        Write-Host "Created packages directory: $packagesPath" -ForegroundColor Green
    }

    try {
        # Download and extract XrmCIFramework NuGet package
        $version = "9.1.0.18"
        $nupkgName = "XrmCIFramework.$version.nupkg"
        $nupkgPath = Join-Path $packagesPath $nupkgName
        $extractPath = Join-Path $packagesPath "XrmCIFramework.$version"

        Write-Host "Downloading XrmCIFramework NuGet package version $version..." -ForegroundColor Yellow
        $nugetUrl = "https://www.nuget.org/api/v2/package/XrmCIFramework/$version"
        Invoke-WebRequest -Uri $nugetUrl -OutFile $nupkgPath -ErrorAction Stop
        Write-Host "Downloaded $nupkgName to $nupkgPath" -ForegroundColor Green

        Write-Host "Extracting NuGet package..." -ForegroundColor Yellow
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        # Custom extraction logic: do not fail if files already exist
        $zip = [System.IO.Compression.ZipFile]::OpenRead($nupkgPath)
        foreach ($entry in $zip.Entries) {
            $destination = Join-Path $extractPath $entry.FullName
            $destinationDir = Split-Path $destination -Parent
            if (!(Test-Path $destinationDir)) {
                New-Item -Path $destinationDir -ItemType Directory -Force | Out-Null
            }
            if ($entry.Name -and !(Test-Path $destination)) {
                [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $destination, $false)
            }
        }
        $zip.Dispose()
        Write-Host "Extracted to $extractPath (skipped existing files)" -ForegroundColor Green

        # Configure packaging settings
        $combineDataXmlFile = $true

        # Construct script path (NuGet packages have tools in 'tools' folder)
        $scriptPath = Join-Path $extractPath "tools\PackCMData.ps1"

        if (-not (Test-Path $scriptPath)) {
            Write-Host "Error: PackCMData script not found at: $scriptPath" -ForegroundColor Red
            return $false
        }

        # Run the PackCMData script from XrmCIFramework
        Write-Host "Packaging reference data..." -ForegroundColor Yellow
        Write-Host "  Source: $sourcePath" -ForegroundColor Gray
        Write-Host "  Destination: $dataFile" -ForegroundColor Gray
        Write-Host "  Combine XML files: $combineDataXmlFile" -ForegroundColor Gray

        & $scriptPath -dataFile $dataFile -extractFolder $sourcePath -combineDataXmlFile $combineDataXmlFile

        Write-Host "Successfully packaged reference data" -ForegroundColor Green

        # Show summary of created file
        if (Test-Path $dataFile) {
            $fileSize = (Get-Item $dataFile).Length
            $fileSizeMB = [math]::Round($fileSize / 1MB, 2)
            Write-Host ""
            Write-Host "Created data package: $dataFile ($fileSizeMB MB)" -ForegroundColor Green
        }

        # Clean up extracted files and nupkg
        Write-Host "Cleaning up NuGet package and extracted files..." -ForegroundColor Yellow
        if (Test-Path $extractPath) {
            Remove-Item -Path $extractPath -Recurse -Force -ErrorAction SilentlyContinue
        }
        if (Test-Path $nupkgPath) {
            Remove-Item -Path $nupkgPath -Force -ErrorAction SilentlyContinue
        }
        Write-Host "Cleanup complete." -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Error during packaging: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    finally {
        # No additional cleanup needed; handled after packaging
    }
}

# Execute the packaging
$success = PackageReferenceData -DataRelativePath $DataRelativePath -Environment $Environment -DryRun $DryRun

if ($DryRun) {
    Write-Host "Dry run completed. Use -dryRun `$false to perform actual packaging." -ForegroundColor Yellow
}
elseif ($success) {
    Write-Host "Reference data packaging completed successfully." -ForegroundColor Green
}
else {
    Write-Host "Reference data packaging failed." -ForegroundColor Red
    exit 1
}