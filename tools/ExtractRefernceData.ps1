param(
    [Parameter(Mandatory = $true, HelpMessage = "The path of the data file to extract")]
    [string]$dataFile,

    [Parameter(Mandatory = $true, HelpMessage = "The relative path of data.xml to create/update")]
    [string]$dataRelativePath = ".\ReferenceData",

    [Parameter(Mandatory = $true, HelpMessage = "Environment: DEV, INT, QA, PreProd, Prod, Hotfix, Training")]
    [string]$environment = "Common",
    
    [Parameter(Mandatory = $false, HelpMessage = "Set to false to perform actual extraction, true for dry run")]
    [bool]$dryRun = $true
)

# Install XrmCIFramework
$version = "9.1.0.18"
Install-Package XrmCIFramework -Scope CurrentUser -Destination .\packages -Force -RequiredVersion $version

$sortExtractedData = $False
$splitExtractedData = $True

# Run the ExtractCMData script from XrmCIFramework
$scriptPath = '.\packages\XrmCIFramework.' + $version + '\tools\ExtractCMData.ps1'
& $scriptPath -dataFile $dataFile -extractFolder (Join-Path -Path $dataRelativePath -ChildPath $environment) -sortExtractedData $sortExtractedData -splitExtractedData $splitExtractedData

# Uninstall XrmCIFramework and cleanup
Uninstall-Package XrmCIFramework -Scope CurrentUser -Destination .\packages -Force
Remove-Item -Path ".\packages" -Recurse -Force