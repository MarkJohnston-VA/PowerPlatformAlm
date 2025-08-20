<#
.SYNOPSIS
    Orchestrates building multiple Power Platform solutions using BuildIndividualSolution.ps1.

.DESCRIPTION
    This script provides orchestration for building multiple Power Platform solutions by:
    1. Reading solution configurations from SolutionBuildConfiguration.json including names and versions
    2. Calling BuildIndividualSolution.ps1 for each solution defined in the configuration
    3. Providing summary reporting of build results across all solutions

    The script expects a specific folder structure:
    - Solution source files in: power-platform\Solutions\{SolutionName}\
    - Build tools in: tools\ directory  
    - Configuration file: power-platform\SolutionBuildConfiguration.json
    - BuildIndividualSolution.ps1 script in the same directory

.EXAMPLE
    .\BuildSolutions.ps1

    Builds all solutions defined in SolutionBuildConfiguration.json with their respective versions.

.NOTES
    File Name      : BuildSolutions.ps1
    Author         : Mark Johnston (with GitHub Copilot) - Mark.Johnston@va.gov
    Prerequisite   : PowerShell 5.1+, .NET SDK, Power Platform CLI (for canvas apps)
    
    Dependencies:
    - BuildSolution.ps1 (for building individual solutions)
    - SolutionBuildConfiguration.json (for solution definitions, project references and plugin packages)
    
    Exit Codes:
    - 0: Success (all solutions built successfully)
    - 1: Invalid or missing configuration file
    - 2: Required files or directories not found
    - 3: One or more build processes failed

.LINK
    Power Platform ALM Documentation: https://docs.microsoft.com/power-platform/alm/

#>

# Display script header
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Power Platform Multi-Solution Builder" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# Get script directory for relative path resolution
$scriptFullPath = $MyInvocation.MyCommand.Path
$scriptDirectory = Split-Path $scriptFullPath -Parent

# Read the SolutionBuildConfiguration.json file
$configFilePath = Join-Path $scriptDirectory "..\power-platform\SolutionBuildConfiguration.json"
if (-not (Test-Path $configFilePath)) {
    Write-Host "ERROR: SolutionBuildConfiguration.json not found at: $configFilePath" -ForegroundColor Red
    exit 1
}

try {
    $configContent = Get-Content $configFilePath -Raw | ConvertFrom-Json
    $solutions = $configContent.solutions
    
    if (-not $solutions -or $solutions.Count -eq 0) {
        Write-Host "ERROR: No solutions found in configuration file" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Found $($solutions.Count) solution(s) to build:" -ForegroundColor Yellow
    foreach ($solution in $solutions) {
        Write-Host "  - $($solution.name) (v$($solution.version))" -ForegroundColor White
    }
    Write-Host "============================================" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: Failed to read configuration file - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Verify BuildSolution.ps1 exists
$individualBuildScript = Join-Path $scriptDirectory "BuildSolution.ps1"
if (-not (Test-Path $individualBuildScript)) {
    Write-Host "ERROR: BuildSolution.ps1 not found at: $individualBuildScript" -ForegroundColor Red
    exit 2
}

# Process each solution
$successCount = 0
$failureCount = 0
$buildResults = @()

foreach ($solution in $solutions) {
    $SolutionName = $solution.name
    $VersionNumber = $solution.version
    
    Write-Host "`n============================================" -ForegroundColor Cyan
    Write-Host "Starting Build: $SolutionName (v$VersionNumber)" -ForegroundColor Cyan
    Write-Host "============================================" -ForegroundColor Cyan

    try {
        # Call BuildSolution.ps1 for this solution
        & $individualBuildScript -SolutionName $SolutionName -VersionNumber $VersionNumber
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "BUILD SUCCESSFUL: $SolutionName" -ForegroundColor Green
            $successCount++
            $buildResults += [PSCustomObject]@{
                Solution = $SolutionName
                Version = $VersionNumber
                Status = "Success"
                ErrorCode = 0
            }
        } else {
            Write-Host "BUILD FAILED: $SolutionName (Exit Code: $LASTEXITCODE)" -ForegroundColor Red
            $failureCount++
            $buildResults += [PSCustomObject]@{
                Solution = $SolutionName
                Version = $VersionNumber
                Status = "Failed"
                ErrorCode = $LASTEXITCODE
            }
        }
    } catch {
        Write-Host "ERROR: Build process failed for $SolutionName - $($_.Exception.Message)" -ForegroundColor Red
        $failureCount++
        $buildResults += [PSCustomObject]@{
            Solution = $SolutionName
            Version = $VersionNumber
            Status = "Error"
            ErrorCode = -1
        }
    }
}

# Final summary
Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "MULTI-SOLUTION BUILD SUMMARY" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Total Solutions: $($solutions.Count)" -ForegroundColor White
Write-Host "Successful Builds: $successCount" -ForegroundColor Green
if($failureCount -gt 0) {
    Write-Host "Failed Builds: $failureCount" -ForegroundColor Red
}

# Display detailed results
Write-Host "`nDetailed Results:" -ForegroundColor Cyan
foreach ($result in $buildResults) {
    $statusColor = if ($result.Status -eq "Success") { "Green" } else { "Red" }
    Write-Host "  $($result.Solution) (v$($result.Version)): $($result.Status)" -ForegroundColor $statusColor
}

if ($failureCount -eq 0) {
    Write-Host "`nAll solutions built successfully!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`nSome solutions failed to build. Check the output above for details." -ForegroundColor Red
    exit 3
}