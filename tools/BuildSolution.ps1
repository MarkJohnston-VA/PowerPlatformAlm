<#
.SYNOPSIS
    Builds a Power Platform solution by packing canvas apps, updating version numbers, and compiling the solution.

.DESCRIPTION
    This script automates the complete build process for a Power Platform solution by performing the following steps:
    1. Validates the provided version number format
    2. Packs any canvas apps in the solution using PackCanvasApps.ps1
    3. Updates version numbers in Solution.xml, plugin assemblies, and PCF controls using UpdateVersion.ps1
    4. Builds the solution using dotnet build with the specified version

    The script expects a specific folder structure:
    - Solution source files in: src\Solutions\{SolutionName}\
    - Build tools in: tools\ directory
    - Solution project file: {SolutionName}.cdsproj

.PARAMETER SolutionName
    The name of the Power Platform solution to build. This should match the folder name under src\Solutions\.
    Example: "MarkTestSmall20250627"

.PARAMETER VersionNumber
    The version number to apply to the solution in x.x.x.x format (semantic versioning with build number).
    This version will be applied to:
    - Solution.xml (full 4-part version)
    - Plugin assembly files (full 4-part version)
    - PCF controls (first 3 parts only, e.g., x.x.x)
    
    Example: "2.1.0.0"

.EXAMPLE
    .\BuildSolution.ps1 -SolutionName "TestRelease_20250801" -VersionNumber "2.1.0.0"

    Builds the TestRelease_20250801 solution with version 2.1.0.0

.EXAMPLE
    .\BuildSolution.ps1 -SolutionName "MyCustomSolution" -VersionNumber "1.0.5.23"
    
    Builds the MyCustomSolution with version 1.0.5.23

.NOTES
    File Name      : BuildSolution.ps1
    Author         : Power Platform ALM Team
    Prerequisite   : PowerShell 5.1+, .NET SDK, Power Platform CLI (if canvas apps present)
    
    Dependencies:
    - PackCanvasApps.ps1 (for canvas app packaging)
    - UpdateVersion.ps1 (for version number updates)
    - {SolutionName}.cdsproj (solution project file)
    
    Exit Codes:
    - 0: Success
    - 1: Invalid or missing version number
    - 2: Required files or directories not found
    - 3: Build process failed

.LINK
    Power Platform ALM Documentation: https://docs.microsoft.com/power-platform/alm/

#>

param(
    [Parameter(Mandatory=$true, HelpMessage="The name of the Power Platform solution to build")]
    [ValidateNotNullOrEmpty()]
    [string]$SolutionName,
    
    [Parameter(Mandatory=$true, HelpMessage="Version number in x.x.x.x format (e.g., 2.1.0.0)")]
    [ValidateNotNullOrEmpty()]
    [string]$VersionNumber
)

# Display script header
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Power Platform Solution Builder" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Solution: $SolutionName" -ForegroundColor Yellow
Write-Host "Version: $VersionNumber" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan

# Validate version number is provided (redundant check since parameter is mandatory, but kept for safety)
if ([string]::IsNullOrEmpty($VersionNumber)) {
    Write-Host "ERROR: No version number provided. Please use the -VersionNumber parameter." -ForegroundColor Red
    exit 1
}

# Validate version number format (semantic versioning with build number: x.x.x.x)
if ($VersionNumber -notmatch '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$') {
    Write-Host "ERROR: Version number '$VersionNumber' is not in the correct format." -ForegroundColor Red
    Write-Host "Expected format: x.x.x.x (e.g., 2.1.0.0)" -ForegroundColor Red
    Write-Host "Where: x = Major.Minor.Patch.Build" -ForegroundColor Yellow
    exit 1
}

# Get script directory for relative path resolution
$scriptFullPath = $MyInvocation.MyCommand.Path
$scriptDirectory = Split-Path $scriptFullPath -Parent

# Resolve solution folder path
$solutionRelativePath = "$scriptDirectory\..\src\Solutions\$SolutionName"
if (-not (Test-Path $solutionRelativePath)) {
    Write-Host "ERROR: Solution folder not found at: $solutionRelativePath" -ForegroundColor Red
    Write-Host "Please verify the solution name and folder structure." -ForegroundColor Yellow
    exit 2
}
$solutionFolderPath = Resolve-Path $solutionRelativePath

Write-Host "Solution folder: $($solutionFolderPath.Path)" -ForegroundColor Green

# Set environment variable for version number
Write-Host "`n--- Setting Environment Variables ---" -ForegroundColor Cyan
$env:RELEASE_VERSION_NUMBER = $VersionNumber
Write-Host "Set RELEASE_VERSION_NUMBER environment variable to: $VersionNumber" -ForegroundColor Green
$env:MAJOR_MINOR_VERSION_NUMBER = $VersionNumber -replace '\.\d+\.\d+$', ''
Write-Host "Set MAJOR_MINOR_VERSION_NUMBER environment variable to: $($env:MAJOR_MINOR_VERSION_NUMBER)" -ForegroundColor Green

# Step 1: Pack Canvas Apps
Write-Host "`n--- Step 1: Packing Canvas Apps ---" -ForegroundColor Cyan
try {
    & "$scriptDirectory\PackCanvasApps.ps1" -solutionPath $solutionFolderPath.Path -dryRun $false
    if ($LASTEXITCODE -ne 0) {
        Write-Host "WARNING: Canvas app packing completed with warnings or errors (Exit Code: $LASTEXITCODE)" -ForegroundColor Yellow
    } else {
        Write-Host "Canvas app packing completed successfully" -ForegroundColor Green
    }
} catch {
    Write-Host "ERROR: Failed to pack canvas apps - $($_.Exception.Message)" -ForegroundColor Red
    exit 3
}

# Step 2: Update Version Numbers
Write-Host "`n--- Step 2: Updating Version Numbers ---" -ForegroundColor Cyan
try {
    & "$scriptDirectory\UpdateVersion.ps1" -SolutionName $SolutionName -VersionNumber $VersionNumber
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Version update failed (Exit Code: $LASTEXITCODE)" -ForegroundColor Red
        exit 3
    } else {
        Write-Host "Version update completed successfully" -ForegroundColor Green
    }
} catch {
    Write-Host "ERROR: Failed to update version numbers - $($_.Exception.Message)" -ForegroundColor Red
    exit 3
}

# Step 3: Add Project References and Plugin Packages
Write-Host "`n--- Step 3: Adding Project References and Plugin Packages ---" -ForegroundColor Cyan

# Read the SolutionBuildConfiguration.json file
$configFilePath = Join-Path $scriptDirectory "..\src\SolutionBuildConfiguration.json"
if (-not (Test-Path $configFilePath)) {
    Write-Host "WARNING: SolutionBuildConfiguration.json not found at: $configFilePath" -ForegroundColor Yellow
    Write-Host "Skipping project reference addition" -ForegroundColor Yellow
} else {
    try {
        $configContent = Get-Content $configFilePath -Raw | ConvertFrom-Json
        $projectReferences = $configContent.projectReferences
        
        if ($projectReferences -and $projectReferences.Count -gt 0) {
            # Save current location and change to solution directory
            $originalLocation = Get-Location
            try {
                Set-Location $solutionFolderPath.Path
                Write-Host "Working directory set to: $($solutionFolderPath.Path)" -ForegroundColor Yellow
                
                foreach ($reference in $projectReferences) {
                    # Convert relative path to absolute path relative to the project file location
                    $relativePath = Join-Path $scriptDirectory "..\$reference"
                    $absolutePath = Resolve-Path $relativePath -ErrorAction SilentlyContinue
                    if ($absolutePath) {
                        Write-Host "Adding project reference: $($absolutePath.Path)" -ForegroundColor Yellow
                        & pac solution add-reference --path $absolutePath.Path
                        if ($LASTEXITCODE -eq 0) {
                            Write-Host "Successfully added reference: $reference" -ForegroundColor Green
                        } else {
                            Write-Host "WARNING: Failed to add reference: $reference (Exit Code: $LASTEXITCODE)" -ForegroundColor Yellow
                        }
                    } else {
                        Write-Host "WARNING: Project reference not found: $reference" -ForegroundColor Yellow
                    }
                }
            } finally {
                # Always restore the original location
                Set-Location $originalLocation
            }
        } else {
            Write-Host "No project references found in configuration file" -ForegroundColor Yellow
        }

        # Handle plugin packages
        if ($configContent.pluginPackages -and $configContent.pluginPackages.Count -gt 0) {
            # Save current location and change to solution directory
            $originalLocation = Get-Location
            try {
                Set-Location $solutionFolderPath.Path
                Write-Host "Working directory set to: $($solutionFolderPath.Path)" -ForegroundColor Yellow

                foreach ($package in $configContent.pluginPackages) {
                    $shortName = $package.shortName
                    $projectFolder = $package.projectFolder
                    $packageName = $package.packageName
                    $projectName = $package.projectName
                    $targetName = "Build$($package.shortName)"
                    $newTarget = @"
<Target Name="$targetName">
 <PropertyGroup>
  <LinkedProject>..\..\$projectFolder\$($projectName).csproj</LinkedProject>
  <$($shortName)Target>src\pluginpackages\$($packageName)\package\$($packageName).nupkg</$($shortName)Target>
  <$($shortName)Source>..\..\$($projectFolder)\bin\`$(Configuration)\$($projectName).1.0.0.nupkg</$($shortName)Source>
 </PropertyGroup>
 <MSBuild Projects="`$(LinkedProject)" Targets="Clean;Build;Pack">
 </MSBuild>
 <Copy SourceFiles="`$($($shortName)Source)" DestinationFiles="`$($($shortName)Target)" OverwriteReadOnlyFiles="true" />
</Target>
"@

                    # Read the solution project file
                    $projectFilePath = Join-Path $solutionFolderPath.Path "$SolutionName.cdsproj"
                    if (Test-Path $projectFilePath) {
                        Write-Host "Injecting plugin build target for package: $($package.packageName)" -ForegroundColor Yellow
                        
                        try {
                            # Read the project file content
                            $projectContent = Get-Content $projectFilePath -Raw

                            # Update the DefaultTargets attribute to include the new target
                            $defaultTargetsPattern = '(<Project[^>]*DefaultTargets=")([^"]*?)(")'
                            if ($projectContent -match $defaultTargetsPattern) {
                                $currentTargets = $matches[2]
                                $targetList = $currentTargets -split(';')
                                # Add the new target if it doesn't already exist
                                if ($targetList -notcontains $targetName) {
                                    $targetList = @($targetName) + $targetList
                                }
                                # Join targets with semicolon
                                $newTargetsValue = $targetList -join ";"
                                $projectContent = $projectContent -replace $defaultTargetsPattern, "`${1}$newTargetsValue`$3"
                                
                                Write-Host "Updated DefaultTargets to: $newTargetsValue" -ForegroundColor Green
                            } else {
                                # If no DefaultTargets attribute exists, add it to the Project element
                                $projectElementPattern = '(<Project[^>]*?)(\s*>)'
                                if ($projectContent -match $projectElementPattern) {
                                    $newDefaultTargets = "$targetName;Build"
                                    $projectContent = $projectContent -replace $projectElementPattern, "`${1} DefaultTargets=`"$newDefaultTargets`"`$2"
                                    Write-Host "Added DefaultTargets attribute: $newDefaultTargets" -ForegroundColor Green
                                } else {
                                    Write-Host "WARNING: Could not find Project element to add DefaultTargets attribute" -ForegroundColor Yellow
                                }
                            }
                            
                            # Check if the target already exists to avoid duplicates
                            if ($projectContent -notmatch "<Target Name=`"$targetName`">") {
                                # Find the closing </Project> tag and insert the new target before it
                                $insertionPoint = $projectContent.LastIndexOf("</Project>")
                                if ($insertionPoint -gt 0) {
                                    # Insert the new target with proper indentation
                                    $indentedTarget = $newTarget -replace '^', '  ' -replace '\n', "`n  "
                                    $projectContent = $projectContent.Substring(0, $insertionPoint) + 
                                                    "`n" + $indentedTarget + "`n" + 
                                                    $projectContent.Substring($insertionPoint)
                                    
                                    Write-Host "Successfully injected target '$targetName' into project file" -ForegroundColor Green
                                } else {
                                    Write-Host "WARNING: Could not find </Project> tag in project file" -ForegroundColor Yellow
                                }
                            } else {
                                Write-Host "Target '$targetName' already exists in project file, skipping target injection" -ForegroundColor Yellow
                            }
                            
                            # Write the updated content back to the file (includes DefaultTargets changes)
                            [System.IO.File]::WriteAllText($projectFilePath, $projectContent, [System.Text.Encoding]::UTF8)
                            Write-Host "Project file changes saved successfully" -ForegroundColor Green
                        } catch {
                            Write-Host "WARNING: Failed to inject target into project file - $($_.Exception.Message)" -ForegroundColor Yellow
                        }
                    } else {
                        Write-Host "WARNING: Project file not found: $projectFilePath" -ForegroundColor Yellow
                    }
                }

            } finally {
                # Always restore the original location
                Set-Location $originalLocation
            }

        } else {
            Write-Host "No plugin packages found in configuration file" -ForegroundColor Yellow
        }

    } catch {
        Write-Host "WARNING: Failed to process project references - $($_.Exception.Message)" -ForegroundColor Yellow
        Write-Host "Continuing with build process..." -ForegroundColor Yellow
    }
}

# Step 4: Build Solution
Write-Host "`n--- Step 4: Building Solution ---" -ForegroundColor Cyan

# Locate the solution project file
$buildFile = Join-Path $solutionFolderPath.Path "$SolutionName.cdsproj"
if (-not (Test-Path $buildFile)) {
    Write-Host "ERROR: Solution project file not found: $buildFile" -ForegroundColor Red
    Write-Host "Expected file: $SolutionName.cdsproj" -ForegroundColor Yellow
    exit 2
}

$buildFile = (Resolve-Path $buildFile).Path
Write-Host "Building project file: $buildFile" -ForegroundColor Yellow

try {
    # Build the solution using dotnet CLI with Release configuration and detailed verbosity
    & dotnet build "$buildFile" --configuration Release --verbosity detailed
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n============================================" -ForegroundColor Green
        Write-Host "BUILD SUCCESSFUL" -ForegroundColor Green
        Write-Host "============================================" -ForegroundColor Green
        Write-Host "Solution '$SolutionName' version $VersionNumber built successfully" -ForegroundColor Green
    } else {
        Write-Host "`n============================================" -ForegroundColor Red
        Write-Host "BUILD FAILED" -ForegroundColor Red
        Write-Host "============================================" -ForegroundColor Red
        Write-Host "Build failed with exit code: $LASTEXITCODE" -ForegroundColor Red
        exit 3
    }
} catch {
    Write-Host "ERROR: Build process failed - $($_.Exception.Message)" -ForegroundColor Red
    exit 3
}

Write-Host "`nBuild process completed successfully!" -ForegroundColor Green