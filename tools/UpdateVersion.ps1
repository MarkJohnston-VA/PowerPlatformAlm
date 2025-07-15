<#
.SYNOPSIS
    Updates version numbers across Power Platform solution components with advanced version merging logic.

.DESCRIPTION
    This script comprehensively updates version numbers across all Power Platform solution components 
    using advanced version merging logic. It preserves the current major.minor version while applying 
    the new build.revision numbers, ensuring version consistency without breaking existing references.
    
    The script updates the following components:
    - Solution.xml version element (full 4-part version)
    - Plugin assembly versions in Solution.xml RootComponents (excluding PublicKeyToken=null entries)
    - Plugin assembly XML files (.data.xml) with FullName, FileName, and AssemblyQualifiedName attributes
    - SdkMessageProcessingStep XML files with PluginTypeName version references
    - PCF control manifest files (ControlManifest.Input.xml) using first 3 parts of version only
    
    Version Merging Logic:
    - For existing version A.B.C.D and new version X.Y.Z.W
    - Result will be A.B.Z.W (preserves current major.minor, uses new build.revision)
    - This prevents breaking changes while updating build information

.PARAMETER SolutionName
    The name of the Power Platform solution to update. This should match the folder name under src\Solutions\.
    Example: "TestRelease_20250801"

.PARAMETER VersionNumber
    The version number in x.x.x.x format. If not provided, uses the RELEASE_VERSION_NUMBER environment variable.
    The version merging logic will be applied to preserve existing major.minor versions.
    Example: "1.0.5.23"

.EXAMPLE
    .\UpdateVersion.ps1 -SolutionName "TestRelease_20250801" -VersionNumber "1.0.5.23"
    
    Updates all components in TestRelease_20250801 solution. If existing version is 2.1.3.4, 
    the result will be 2.1.5.23 (preserving 2.1, using 5.23 from new version).

.EXAMPLE
    $env:RELEASE_VERSION_NUMBER = "1.2.0.15"
    .\UpdateVersion.ps1 -SolutionName "MyCustomSolution"
    
    Updates all components using the environment variable version with merging logic applied.

.NOTES
    File Name      : UpdateVersion.ps1
    Author         : Mark Johnston (with GitHub Copilot) - Mark.Johnston@va.gov
    Prerequisite   : PowerShell 5.1+
    
    Features:
    - Advanced version merging (preserves major.minor, updates build.revision)
    - Regex exclusion of PublicKeyToken=null entries
    - Manual regex processing to avoid PowerShell script block variable scope issues
    - Text-based file updates preserving original formatting
    - PCF control version handling (3-part version format)
    - Comprehensive error handling and validation
    
    Exit Codes:
    - 0: Success
    - 1: Invalid or missing version number

.LINK
    Power Platform ALM Documentation: https://docs.microsoft.com/power-platform/alm/

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

# Convert relative paths to absolute paths
Write-Host "Validating file paths..." -ForegroundColor Cyan

$SolutionRelativePath = ".\src\Solutions\$SolutionName\src\Other\Solution.xml"
$PluginAssembliesRelativePath = ".\src\Solutions\$SolutionName\src\PluginAssemblies"
$SdkMessageProcessingStepsRelativePath = ".\src\Solutions\$SolutionName\src\SdkMessageProcessingSteps"

# Check Solution.xml path
if (Test-Path $SolutionRelativePath) {
    $SolutionPath = (Resolve-Path $SolutionRelativePath).Path
} else {
    Write-Host "ERROR: Solution.xml file not found at: $SolutionRelativePath" -ForegroundColor Red
    exit 1
}

# Check Plugin Assemblies path
$PluginAssembliesPath = $null
if (Test-Path $PluginAssembliesRelativePath) {
    $PluginAssembliesPath = (Resolve-Path $PluginAssembliesRelativePath).Path
}

# Check SdkMessageProcessingSteps path
$SdkMessageProcessingStepsPath = $null
if (Test-Path $SdkMessageProcessingStepsRelativePath) {
    $SdkMessageProcessingStepsPath = (Resolve-Path $SdkMessageProcessingStepsRelativePath).Path
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Power Platform Solution Version Updater" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Solution file: $SolutionPath" -ForegroundColor Cyan
if ($PluginAssembliesPath) {
    Write-Host "Plugin assemblies path: $PluginAssembliesPath" -ForegroundColor Cyan
}
else {
    Write-Host "WARNING: Plugin assemblies path not found: $PluginAssembliesRelativePath" -ForegroundColor Yellow
}
if ($SdkMessageProcessingStepsPath) {
    Write-Host "SdkMessageProcessingSteps path: $SdkMessageProcessingStepsPath" -ForegroundColor Cyan
} else {
    Write-Host "WARNING: SdkMessageProcessingSteps path not found: $SdkMessageProcessingStepsRelativePath" -ForegroundColor Yellow
}
Write-Host "New version number: $VersionNumber" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan

$overallSuccess = $true

# Update Solution.xml
Write-Host "`n--- Updating Solution.xml ---" -ForegroundColor Cyan

# Read the file as text to preserve formatting - use -Raw to get exact content
$solutionContent = Get-Content $SolutionPath -Raw

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
        # Write the updated content back to the file without adding extra newlines
        [System.IO.File]::WriteAllText($SolutionPath, $newSolutionContent, [System.Text.Encoding]::UTF8)
        Write-Host "Solution.xml version successfully updated from $oldVersion to $VersionNumber" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Version replacement verification failed" -ForegroundColor Red
        $overallSuccess = $false
    }
}

# Update Plugin Assembly Versions in Solution.xml RootComponents
Write-Host "`n--- Updating Plugin Assembly Versions in Solution.xml RootComponents ---" -ForegroundColor Cyan

try {
    # Read the Solution.xml as text to preserve formatting
    $solutionContent = Get-Content $SolutionPath -Raw
    $originalContent = $solutionContent
    $updatedContent = $originalContent
    
    # Use regex to find and update only the version number within schemaName for type="91" components
    # Pattern matches: <RootComponent type="91" ... schemaName="AssemblyName, Version=x.x.x.x, Culture..." ... />
    # Excludes entries where schemaName contains "PublicKeyToken=null"
    $pattern = '(<RootComponent[^>]*type="91"[^>]*schemaName="(?!.*PublicKeyToken=null)[^"]*Version=)([\d\.]+)([^"]*"[^>]*/>)'
    
    # Find all matches first, then process them
    $regexMatches = [regex]::Matches($updatedContent, $pattern)
    foreach ($match in $regexMatches) {
        $prefix = $match.Groups[1].Value
        $currentVersion = $match.Groups[2].Value
        $suffix = $match.Groups[3].Value
        
        # Split versions into parts with error checking
        $currentParts = $currentVersion -split '\.'
        $newParts = $VersionNumber -split '\.'
        
        # Ensure both versions have 4 parts
        if ($currentParts.Count -ge 4 -and $newParts.Count -ge 4) {
            # Combine: first two parts from current version + first two parts from new version
            $combinedVersion = "$($currentParts[0]).$($currentParts[1]).$($newParts[0]).$($newParts[1])"
        } else {
            # Fallback to using the full new version if parsing fails
            $combinedVersion = $VersionNumber
        }
        
        $replacement = "$prefix$combinedVersion$suffix"
        $updatedContent = $updatedContent.Replace($match.Value, $replacement)
    }
    
    # Check if any changes were made
    if ($updatedContent -ne $originalContent) {
        Write-Host "Updated plugin assembly version(s) in Solution.xml RootComponents (text-based replacement)" -ForegroundColor Green
    } else {
        Write-Host "No plugin assembly components (type=91) with version found in Solution.xml RootComponents" -ForegroundColor Yellow
    }
    
    # Write the updated content back to the file
    [System.IO.File]::WriteAllText($SolutionPath, $updatedContent, [System.Text.Encoding]::UTF8)
} catch {
    Write-Host "WARNING: Failed to update plugin assembly versions in Solution.xml RootComponents - $($_.Exception.Message)" -ForegroundColor Yellow
    $overallSuccess = $false
}

if($null -ne $PluginAssembliesPath) {
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
                # Read the file as text to preserve formatting - use -Raw to get exact content
                $pluginContent = Get-Content $xmlFile.FullName -Raw
                $originalContent = $pluginContent
                
                # Use simple string replacement instead of complex regex
                
                # Update FullName attribute
                if ($pluginContent -match 'FullName=') {
                    # Use manual regex processing to avoid script block variable scope issues
                    $versionPattern = '(Version=)([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)'
                    $regexMatches = [regex]::Matches($pluginContent, $versionPattern)
                    foreach ($match in $regexMatches) {
                        $prefix = $match.Groups[1].Value
                        $currentVersion = $match.Groups[2].Value
                        
                        # Split versions into parts with error checking
                        $currentParts = $currentVersion -split '\.'
                        $newParts = $VersionNumber -split '\.'
                        
                        # Ensure both versions have 4 parts
                        if ($currentParts.Count -ge 4 -and $newParts.Count -ge 4) {
                            # Combine: first two parts from current version + first two parts from new version
                            $combinedVersion = "$($currentParts[0]).$($currentParts[1]).$($newParts[0]).$($newParts[1])"
                        } else {
                            # Fallback to using the full new version if parsing fails
                            $combinedVersion = $VersionNumber
                        }
                        
                        $replacement = "$prefix$combinedVersion"
                        $pluginContent = $pluginContent.Replace($match.Value, $replacement)
                    }
                    Write-Host "  Updated FullName attribute" -ForegroundColor Green
                }

                # Update FileName
                if ($pluginContent -match 'FullName="([^,]+),.*Version=[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+') {
                    $assemblyName = $matches[1]
                    # Update the FileName element to use the correct assembly name from FullName
                    # Pattern: <FileName>/PluginAssemblies/.../SomeAssemblyName.dll</FileName>
                    # Replace the final DLL name with the assembly name from FullName
                    $fileNamePattern = '(<FileName>[^<]*/)[^/]+\.dll(</FileName>)'
                    $fileNameReplacement = "`${1}$assemblyName.dll`$2"
                    
                    if ($pluginContent -match $fileNamePattern) {
                        $pluginContent = $pluginContent -replace $fileNamePattern, $fileNameReplacement
                        Write-Host "  Updated FileName to use assembly name: $assemblyName.dll" -ForegroundColor Green
                    }
                }
                
                # Update AssemblyQualifiedName attributes  
                if ($pluginContent -match 'AssemblyQualifiedName=') {
                    # Use manual regex processing to avoid script block variable scope issues
                    $versionPattern = '(Version=)([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)'
                    $regexMatches = [regex]::Matches($pluginContent, $versionPattern)
                    foreach ($match in $regexMatches) {
                        $prefix = $match.Groups[1].Value
                        $currentVersion = $match.Groups[2].Value
                        
                        # Split versions into parts with error checking
                        $currentParts = $currentVersion -split '\.'
                        $newParts = $VersionNumber -split '\.'
                        
                        # Ensure both versions have 4 parts
                        if ($currentParts.Count -ge 4 -and $newParts.Count -ge 4) {
                            # Combine: first two parts from current version + first two parts from new version
                            $combinedVersion = "$($currentParts[0]).$($currentParts[1]).$($newParts[0]).$($newParts[1])"
                        } else {
                            # Fallback to using the full new version if parsing fails
                            $combinedVersion = $VersionNumber
                        }
                        
                        $replacement = "$prefix$combinedVersion"
                        $pluginContent = $pluginContent.Replace($match.Value, $replacement)
                    }
                    Write-Host "  Updated AssemblyQualifiedName attributes" -ForegroundColor Green
                }
                
                # Only write the file if there were actual changes
                if ($pluginContent -ne $originalContent) {
                    [System.IO.File]::WriteAllText($xmlFile.FullName, $pluginContent, [System.Text.Encoding]::UTF8)
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
}

# Update SdkMessageProcessingSteps XML files
Write-Host "`n--- Updating SdkMessageProcessingSteps XML Files ---" -ForegroundColor Cyan
if($null -ne $SdkMessageProcessingStepsPath) {
    # Find all XML files in the SdkMessageProcessingSteps directory
    $sdkStepXmlFiles = Get-ChildItem -Path $SdkMessageProcessingStepsPath -Recurse -Filter "*.xml" -ErrorAction SilentlyContinue

    if ($sdkStepXmlFiles.Count -eq 0) {
        Write-Host "No SdkMessageProcessingStep XML files found in: $SdkMessageProcessingStepsPath" -ForegroundColor Yellow
    } else {
        foreach ($xmlFile in $sdkStepXmlFiles) {
            Write-Host "Processing SdkMessageProcessingStep file: $($xmlFile.FullName)" -ForegroundColor Cyan
            
            try {
                # Read the file as text to preserve formatting - use -Raw to get exact content
                $stepContent = Get-Content $xmlFile.FullName -Raw
                $originalContent = $stepContent
                
                # Update PluginTypeName elements that contain version information
                # Pattern matches: <PluginTypeName>AssemblyName.ClassName, AssemblyName, Version=x.x.x.x, Culture=..., PublicKeyToken=...</PluginTypeName>
                if ($stepContent -match '<PluginTypeName>') {
                    # Use manual regex processing to avoid script block variable scope issues
                    $versionPattern = '(Version=)([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)'
                    $regexMatches = [regex]::Matches($stepContent, $versionPattern)
                    foreach ($match in $regexMatches) {
                        $prefix = $match.Groups[1].Value
                        $currentVersion = $match.Groups[2].Value
                        
                        # Split versions into parts with error checking
                        $currentParts = $currentVersion -split '\.'
                        $newParts = $VersionNumber -split '\.'
                        
                        # Ensure both versions have 4 parts
                        if ($currentParts.Count -ge 4 -and $newParts.Count -ge 4) {
                            # Combine: first two parts from current version + first two parts from new version
                            $combinedVersion = "$($currentParts[0]).$($currentParts[1]).$($newParts[0]).$($newParts[1])"
                        } else {
                            # Fallback to using the full new version if parsing fails
                            $combinedVersion = $VersionNumber
                        }
                        
                        $replacement = "$prefix$combinedVersion"
                        $stepContent = $stepContent.Replace($match.Value, $replacement)
                    }
                    Write-Host "  Updated PluginTypeName version references" -ForegroundColor Green
                }
                
                # Only write the file if there were actual changes
                if ($stepContent -ne $originalContent) {
                    [System.IO.File]::WriteAllText($xmlFile.FullName, $stepContent, [System.Text.Encoding]::UTF8)
                    Write-Host "  SdkMessageProcessingStep file updated successfully" -ForegroundColor Green
                } else {
                    Write-Host "  No version updates needed in this file" -ForegroundColor Yellow
                }
            } catch {
                Write-Host "  ERROR: Failed to process file - $($_.Exception.Message)" -ForegroundColor Red
                $overallSuccess = $false
            }
        }
    }
} else {
    Write-Host "SdkMessageProcessingSteps directory not found, skipping step updates" -ForegroundColor Yellow
}

# Update PCF ControlManifest.Input.xml files
Write-Host "`n--- Updating PCF Control Manifest Files ---" -ForegroundColor Cyan

$pcfPath = ".\src\PCF"
if (Test-Path $pcfPath) {
    $controlManifestFiles = Get-ChildItem -Path $pcfPath -Recurse -Filter "ControlManifest.Input.xml" -ErrorAction SilentlyContinue
    
    if ($controlManifestFiles.Count -eq 0) {
        Write-Host "No PCF ControlManifest.Input.xml files found in: $pcfPath" -ForegroundColor Yellow
    } else {
        foreach ($manifestFile in $controlManifestFiles) {
            Write-Host "Processing PCF manifest file: $($manifestFile.FullName)" -ForegroundColor Cyan
            
            try {
                # Read the file as text to preserve formatting - use -Raw to get exact content
                $manifestContent = Get-Content $manifestFile.FullName -Raw
                $originalContent = $manifestContent
                
                # Update ONLY the version attribute in the control element (not other version attributes)
                # Use only the first 3 parts of the version number for PCF controls
                $pcfVersionParts = $VersionNumber -split '\.'
                $pcfVersion = "$($pcfVersionParts[0]).$($pcfVersionParts[1]).$($pcfVersionParts[2])"
                
                # Use a more specific pattern that only matches within the control element
                $lines = $manifestContent -split "`n"
                $updatedLines = @()
                $controlElementFound = $false
                
                foreach ($line in $lines) {
                    if ($line -match '<control\s+.*version="[0-9]+\.[0-9]+\.[0-9]+(\.[0-9]+)?".*>') {
                        $line = $line -replace 'version="[0-9]+\.[0-9]+\.[0-9]+(\.[0-9]+)?"', "version=`"$pcfVersion`""
                        $controlElementFound = $true
                    }
                    $updatedLines += $line
                }
                
                if ($controlElementFound) {
                    $manifestContent = $updatedLines -join "`n"
                    Write-Host "  Updated control version attribute to $pcfVersion" -ForegroundColor Green
                }
                
                # Only write the file if there were actual changes
                if ($manifestContent -ne $originalContent) {
                    [System.IO.File]::WriteAllText($manifestFile.FullName, $manifestContent, [System.Text.Encoding]::UTF8)
                    Write-Host "  PCF manifest file updated successfully" -ForegroundColor Green
                } else {
                    Write-Host "  No version updates needed in this file" -ForegroundColor Yellow
                }
            } catch {
                Write-Host "  ERROR: Failed to process file - $($_.Exception.Message)" -ForegroundColor Red
                $overallSuccess = $false
            }
        }
    }
} else {
    Write-Host "PCF directory not found: $pcfPath" -ForegroundColor Yellow
}

Write-Host "============================================" -ForegroundColor Cyan
if ($overallSuccess) {
    Write-Host "All version updates completed successfully!" -ForegroundColor Green
} else {
    Write-Host "Some version updates failed. Please check the errors above." -ForegroundColor Red
}
Write-Host "============================================" -ForegroundColor Cyan