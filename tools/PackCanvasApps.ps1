param(
  [string]$solutionPath,
  [bool]$dryRun = $true
)

Write-Host "CanvasApp: Re-packing Canvas Apps"
$canvasAppFolders = Get-ChildItem -Path (Join-Path -Path $solutionPath -ChildPath "CanvasApps" -AdditionalChildPath "src") -Directory
foreach ($canvasAppFolder in $canvasAppFolders) {
  
  $canvasAppMsAppFileName = $canvasAppFolder.Name + "_DocumentUri.msapp"
  Write-Host "CanvasApp: Packing canvas app $canvasAppSourcePath to $canvasAppMsAppFilePath"
    if(!$dryRun) {
      pac canvas pack --msapp $canvasAppMsAppFileName --sources $canvasAppFolder.FullName
    }
}