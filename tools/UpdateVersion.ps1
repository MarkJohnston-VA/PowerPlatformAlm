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

.PARAMETER SolutionPath
    The path to the solution directory containing the Solution.xml file.
    This parameter is required.

.PARAMETER PluginAssembliesPath
    The path to the plugin assemblies directory containing XML files.
    This parameter is required.

.PARAMETER VersionNumber
    The version number to set. If not provided, will use the RELEASE_VERSION_NUMBER environment variable.
    If neither is provided, the script will exit with an error.

.EXAMPLE
    .\UpdateVersion.ps1 -SolutionPath ".\src\Solutions\MarkTestSmall20250627\src\Other\Solution.xml" -PluginAssembliesPath ".\src\Solutions\MarkTestSmall20250627\src\PluginAssemblies"
    Updates the version using the RELEASE_VERSION_NUMBER environment variable.

.EXAMPLE
    .\UpdateVersion.ps1 -SolutionPath ".\src\Solutions\MarkTestSmall20250627\src\Other\Solution.xml" -PluginAssembliesPath ".\src\Solutions\MarkTestSmall20250627\src\PluginAssemblies" -VersionNumber "2.2.0.0"
    Updates the version to the specified value.

.EXAMPLE
    .\UpdateVersion.ps1 -SolutionPath ".\src\Solutions\MySolution\src\Other\Solution.xml" -PluginAssembliesPath ".\src\Solutions\MySolution\src\PluginAssemblies" -VersionNumber "1.0.0.0"
    Updates the version in a specific solution file.
#>

param(
    [Parameter(Mandatory)]
    [string]$SolutionPath,
    [Parameter(Mandatory)]
    [string]$PluginAssembliesPath,
    [string]$VersionNumber
)

# Function to write colored output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# Get the version number from parameter or environment variable
if ([string]::IsNullOrEmpty($VersionNumber)) {
    $VersionNumber = $env:RELEASE_VERSION_NUMBER
    Write-ColorOutput "Using version from environment variable: $VersionNumber" "Cyan"
} else {
    Write-ColorOutput "Using version from parameter: $VersionNumber" "Cyan"
}

# Validate version number is provided
if ([string]::IsNullOrEmpty($VersionNumber)) {
    Write-ColorOutput "ERROR: No version number provided. Please set the RELEASE_VERSION_NUMBER environment variable or use the -VersionNumber parameter." "Red"
    exit 1
}

# Validate version number format (basic check for x.x.x.x format)
if ($VersionNumber -notmatch '^\d+\.\d+\.\d+\.\d+$') {
    Write-ColorOutput "ERROR: Version number '$VersionNumber' is not in the correct format. Expected format: x.x.x.x (e.g., 2.1.0.0)" "Red"
    exit 1
}

# Function to update version in plugin assembly XML files
function Update-PluginAssemblyVersions {
    param(
        [string]$PluginAssembliesPath,
        [string]$NewVersion
    )
    
    # Find all XML files in the plugin assemblies directory
    $pluginXmlFiles = Get-ChildItem -Path $PluginAssembliesPath -Recurse -Filter "*.xml" -ErrorAction SilentlyContinue
    
    if ($pluginXmlFiles.Count -eq 0) {
        Write-ColorOutput "No plugin assembly XML files found in: $PluginAssembliesPath" "Yellow"
        return
    }
    
    foreach ($xmlFile in $pluginXmlFiles) {
        Write-ColorOutput "Processing plugin assembly file: $($xmlFile.FullName)" "Cyan"
        
        try {
            # Read the file as text to preserve formatting
            $pluginContent = Get-Content $xmlFile.FullName | Out-String
            $originalContent = $pluginContent
            
            # Update FullName attribute in PluginAssembly element
            $fullNamePattern = '(FullName="[^"]*?)Version=\d+\.\d+\.\d+\.\d+([^"]*?")'
            $fullNameMatch = [regex]::Match($pluginContent, $fullNamePattern)
            
            if ($fullNameMatch.Success) {
                $replaceString = '$1Version=' + $NewVersion + '$2'
                $pluginContent = $pluginContent -replace $fullNamePattern, $replaceString
                Write-ColorOutput "  Updated FullName attribute" "Green"
            }
            
            # Update AssemblyQualifiedName attributes in PluginType elements
            $qualifiedNamePattern = '(AssemblyQualifiedName="[^"]*?)Version=\d+\.\d+\.\d+\.\d+([^"]*?")'
            $qualifiedNameMatches = [regex]::Matches($pluginContent, $qualifiedNamePattern)
            
            if ($qualifiedNameMatches.Count -gt 0) {
                $replaceString = '$1Version=' + $NewVersion + '$2'
                $pluginContent = $pluginContent -replace $qualifiedNamePattern, $replaceString
                Write-ColorOutput "  Updated $($qualifiedNameMatches.Count) AssemblyQualifiedName attributes" "Green"
            }
            
            # Only write the file if there were actual changes
            if ($pluginContent -ne $originalContent) {
                Set-Content -Path $xmlFile.FullName -Value $pluginContent -Encoding UTF8
                Write-ColorOutput "  ✓ Plugin assembly file updated successfully" "Green"
            } else {
                Write-ColorOutput "  No version updates needed in this file" "Yellow"
            }
            
        } catch {
            Write-ColorOutput "  ERROR: Failed to update plugin assembly file: $($xmlFile.FullName)" "Red"
            Write-ColorOutput "  Error details: $($_.Exception.Message)" "Red"
        }
    }
}

# Convert relative paths to absolute paths
Write-ColorOutput "Validating file paths..." "Cyan"

if (Test-Path $SolutionPath) {
    $SolutionPath = (Resolve-Path $SolutionPath).Path
    Write-ColorOutput "Solution file found: $SolutionPath" "Green"
} else {
    Write-ColorOutput "ERROR: Solution.xml file not found at the specified path: $SolutionPath" "Red"
    exit 1
}

if (Test-Path $PluginAssembliesPath) {
    $PluginAssembliesPath = (Resolve-Path $PluginAssembliesPath).Path
    Write-ColorOutput "Plugin assemblies path found: $PluginAssembliesPath" "Green"
} else {
    Write-ColorOutput "WARNING: Plugin assemblies path not found: $PluginAssembliesPath" "Yellow"
    Write-ColorOutput "Will only update Solution.xml file." "Yellow"
    $PluginAssembliesPath = $null
}

Write-ColorOutput "============================================" "Cyan"
Write-ColorOutput "Power Platform Solution Version Updater" "Cyan"
Write-ColorOutput "============================================" "Cyan"
Write-ColorOutput "Solution file: $SolutionPath" "Cyan"
if ($PluginAssembliesPath) {
    Write-ColorOutput "Plugin assemblies path: $PluginAssembliesPath" "Cyan"
}
Write-ColorOutput "New version number: $VersionNumber" "Green"
Write-ColorOutput "============================================" "Cyan"

$overallSuccess = $true

try {
    # Update Solution.xml
    Write-ColorOutput "`n--- Updating Solution.xml ---" "Cyan"
    
    # Read the file as text to preserve formatting
    $solutionContent = Get-Content $SolutionPath | Out-String
    
    # Use regex to find and extract the current version
    $versionPattern = '<Version>(\d+\.\d+\.\d+\.\d+)</Version>'
    $versionMatch = [regex]::Match($solutionContent, $versionPattern)
    
    if (-not $versionMatch.Success) {
        Write-ColorOutput "ERROR: Version element not found in Solution.xml" "Red"
        $overallSuccess = $false
    } else {
        $oldVersion = $versionMatch.Groups[1].Value
        Write-ColorOutput "Current version: $oldVersion" "Yellow"
        
        # Replace only the version number, preserving all formatting
        $newSolutionContent = $solutionContent -replace $versionPattern, "<Version>$VersionNumber</Version>"
        
        # Verify the replacement was successful
        $verificationMatch = [regex]::Match($newSolutionContent, '<Version>(\d+\.\d+\.\d+\.\d+)</Version>')
        if ($verificationMatch.Success -and $verificationMatch.Groups[1].Value -eq $VersionNumber) {
            # Write the updated content back to the file
            Set-Content -Path $SolutionPath -Value $newSolutionContent -Encoding UTF8
            Write-ColorOutput "✓ Solution.xml version successfully updated from $oldVersion to $VersionNumber" "Green"
        } else {
            Write-ColorOutput "ERROR: Version replacement verification failed" "Red"
            $overallSuccess = $false
        }
    }
    
} catch {
    Write-ColorOutput "ERROR: Failed to update version in Solution.xml" "Red"
    Write-ColorOutput "Error details: $($_.Exception.Message)" "Red"
    $overallSuccess = $false
}

# Update Plugin Assembly XML files
if ($PluginAssembliesPath) {
    Write-ColorOutput "`n--- Updating Plugin Assembly Files ---" "Cyan"
    try {
        Update-PluginAssemblyVersions -PluginAssembliesPath $PluginAssembliesPath -NewVersion $VersionNumber
    } catch {
        Write-ColorOutput "ERROR: Failed to update plugin assembly files" "Red"
        Write-ColorOutput "Error details: $($_.Exception.Message)" "Red"
        $overallSuccess = $false
    }
}

Write-ColorOutput "`n============================================" "Cyan"
if ($overallSuccess) {
    Write-ColorOutput "✓ All version updates completed successfully!" "Green"
} else {
    Write-ColorOutput "⚠ Some version updates failed. Please check the errors above." "Red"
    exit 1
}
Write-ColorOutput "============================================" "Cyan"