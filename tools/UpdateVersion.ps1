<#
.SYNOPSIS
    Updates version numbers in Power Platform solution XML files using an environment variable.

.DESCRIPTION
    This script updates version numbers in Solution.xml files and Plugin Assembly XML files
    to use the value from the RELEASE_VERSION_NUMBER environment variable. This allows version 
    numbers to be dynamically set during build/deployment processes.
    
    The script updates:
    - Version element in Solution.xml files
    - FullName attribute in PluginAssembly elements
    - AssemblyQualifiedName attributes in PluginType elements

.PARAMETER SolutionName
    The name of the solution (without file extension) to update.
    This parameter is required.

.PARAMETER VersionNumber
    The version number to set. If not provided, will use the RELEASE_VERSION_NUMBER environment variable.
    If neither is provided, the script will exit with an error.


.EXAMPLE
    .\UpdateVersion.ps1 -SolutionName "MySolution" -VersionNumber "1.0.0.0"
    Updates the version in a specific solution file.
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SolutionName,
    [string]$VersionNumber
)

# Get the version number from parameter or environment variable
if ([string]::IsNullOrEmpty($VersionNumber)) {
    $VersionNumber = $env:RELEASE_VERSION_NUMBER
    Write-Host "Using version from environment variable: $VersionNumber" -ForegroundColor Cyan
} else {
    Write-Host "Using version from parameter: $VersionNumber" -ForegroundColor Cyan
}

# Validate version number is provided
if ([string]::IsNullOrEmpty($VersionNumber)) {
    Write-Host "ERROR: No version number provided. Please set the RELEASE_VERSION_NUMBER environment variable or use the -VersionNumber parameter." -ForegroundColor Red
    exit 1
}

# Validate version number format (basic check for x.x.x.x format)
if ($VersionNumber -notmatch '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$') {
    Write-Host "ERROR: Version number '$VersionNumber' is not in the correct format. Expected format: x.x.x.x (e.g., 2.1.0.0)" -ForegroundColor Red
    exit 1
}

# Convert relative paths to absolute paths
Write-Host "Validating file paths..." -ForegroundColor Cyan

$SolutionPath = Resolve-Path ".\src\Solutions\$SolutionName\src\Other\Solution.xml"
$PluginAssembliesPath = Resolve-Path ".\src\Solutions\$SolutionName\src\PluginAssemblies"

if (Test-Path $SolutionPath) {
    $SolutionPath = (Resolve-Path $SolutionPath).Path
    Write-Host "Solution file found: $SolutionPath" -ForegroundColor Green
} else {
    Write-Host "ERROR: Solution.xml file not found at the specified path: $SolutionPath" -ForegroundColor Red
    exit 1
}

if (Test-Path $PluginAssembliesPath) {
    $PluginAssembliesPath = (Resolve-Path $PluginAssembliesPath).Path
    Write-Host "Plugin assemblies path found: $PluginAssembliesPath" -ForegroundColor Green
} else {
    Write-Host "WARNING: Plugin assemblies path not found: $PluginAssembliesPath" -ForegroundColor Yellow
    Write-Host "Will only update Solution.xml file." -ForegroundColor Yellow
    $PluginAssembliesPath = $null
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Power Platform Solution Version Updater" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Solution file: $SolutionPath" -ForegroundColor Cyan
if ($PluginAssembliesPath) {
    Write-Host "Plugin assemblies path: $PluginAssembliesPath" -ForegroundColor Cyan
}
Write-Host "New version number: $VersionNumber" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan

$overallSuccess = $true

# Update Solution.xml
Write-Host "`n--- Updating Solution.xml ---" -ForegroundColor Cyan

# Read the file as text to preserve formatting
$solutionContent = Get-Content $SolutionPath | Out-String

# Use compatible regex pattern for Windows PowerShell
$versionPattern = '<Version>([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)</Version>'
$versionMatch = [regex]::Match($solutionContent, $versionPattern)

if (-not $versionMatch.Success) {
    Write-Host "ERROR: Version element not found in Solution.xml" -ForegroundColor Red
    $overallSuccess = $false
} else {
    $oldVersion = $versionMatch.Groups[1].Value
    Write-Host "Current version: $oldVersion" -ForegroundColor Yellow
    
    # Replace only the version number, preserving all formatting
    $newSolutionContent = $solutionContent -replace $versionPattern, "<Version>$VersionNumber</Version>"
    
    # Verify the replacement was successful
    $verificationMatch = [regex]::Match($newSolutionContent, '<Version>([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)</Version>')
    if ($verificationMatch.Success -and $verificationMatch.Groups[1].Value -eq $VersionNumber) {
        # Write the updated content back to the file
        Set-Content -Path $SolutionPath -Value $newSolutionContent -Encoding UTF8
        Write-Host "Solution.xml version successfully updated from $oldVersion to $VersionNumber" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Version replacement verification failed" -ForegroundColor Red
        $overallSuccess = $false
    }
}

# Update Plugin Assembly XML files
Write-Host "`n--- Updating Plugin Assembly Files ---" -ForegroundColor Cyan

# Find all XML files in the plugin assemblies directory
$pluginXmlFiles = Get-ChildItem -Path $PluginAssembliesPath -Recurse -Filter "*.xml" -ErrorAction SilentlyContinue

if ($pluginXmlFiles.Count -eq 0) {
    Write-Host "No plugin assembly XML files found in: $PluginAssembliesPath" -ForegroundColor Yellow
} else {
    foreach ($xmlFile in $pluginXmlFiles) {
        Write-Host "Processing plugin assembly file: $($xmlFile.FullName)" -ForegroundColor Cyan
        
        try {
            # Read the file as text to preserve formatting
            $pluginContent = Get-Content $xmlFile.FullName | Out-String
            $originalContent = $pluginContent
            
            # Use simple string replacement instead of complex regex
            
            # Update FullName attribute
            if ($pluginContent -match 'FullName=') {
                $pluginContent = $pluginContent -replace 'Version=[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+', "Version=$VersionNumber"
                Write-Host "  Updated FullName attribute" -ForegroundColor Green
            }
            
            # Update AssemblyQualifiedName attributes  
            if ($pluginContent -match 'AssemblyQualifiedName=') {
                $pluginContent = $pluginContent -replace 'Version=[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+', "Version=$VersionNumber"
                Write-Host "  Updated AssemblyQualifiedName attributes" -ForegroundColor Green
            }
            
            # Only write the file if there were actual changes
            if ($pluginContent -ne $originalContent) {
                Set-Content -Path $xmlFile.FullName -Value $pluginContent -Encoding UTF8
                Write-Host "  Plugin assembly file updated successfully" -ForegroundColor Green
            } else {
                Write-Host "  No version updates needed in this file" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "  ERROR: Failed to process file - $($_.Exception.Message)" -ForegroundColor Red
            $overallSuccess = $false
        }
    }
}

Write-Host "============================================" -ForegroundColor Cyan
if ($overallSuccess) {
    Write-Host "All version updates completed successfully!" -ForegroundColor Green
} else {
    Write-Host "Some version updates failed. Please check the errors above." -ForegroundColor Red
}
Write-Host "============================================" -ForegroundColor Cyan