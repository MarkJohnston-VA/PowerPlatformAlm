param(
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

$dataFile = ".\bin\Data_$environment.zip"
$combineDataXmlFile = $True

# Run the PackCMData script from XrmCIFramework
$scriptPath = '.\packages\XrmCIFramework.' + $version + '\tools\PackCMData.ps1'
& $scriptPath -dataFile $dataFile -extractFolder (Join-Path -Path $dataRelativePath -ChildPath $environment) -combineDataXmlFile $combineDataXmlFile

# Uninstall XrmCIFramework
Uninstall-Package XrmCIFramework -Scope CurrentUser -Destination .\packages -Force