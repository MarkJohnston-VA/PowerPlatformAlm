# ALM Example

## Updating the Repo

1. Use `pac auth` to get authenticated and connected to the desired source environment (presumably DEV)
1. Create Current Release Solution in DEV Environment
1. Create new branch in repo
1. Clone Current Release Solution: `pac solution clone --name <SolutionName>` (Make sure solution source files end up in `/solution-src/<SolutionName>`)
1. Extract Canvas Apps (extracts the YAML source from the .msapp binary): `/tools/ExtractCannvasApp.ps1 solution-src/<SolutionName> $false`
1. Use CMT or `pac data` to download Reference Data
1. Use `/tools/ExtractReferenceData.ps1 <PathToData.zip> .\ReferenceData <Environment> $false` to extract the data into this `/ReferenceData/<Environment>` (Note: *Common* should be used for any data that is common in all environments)

## Packaging/Exporting for Deployment

1.