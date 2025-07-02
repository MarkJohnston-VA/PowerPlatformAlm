# ALM Example

This repo is a POC showing how to store several types of assets from PowerPlatform in source contorl and then package them into artifacts for deployment.

The initial test solution was created from the CDCE DEV instance.

## Folder Structure

- **src** - The main folder where all source lives
  - **EnvironmentVariables** - JSON files containing the (NON-SENSITIVE) environment variable values for each environment
  - **PCFControls** - TBD - Contains all PCF Controls projects
  - **Plugins** - Contains all Plugin project folders
  - **Portal** - Contains exported Portal Files, including the deployment profiles
  - **ReferenceData** - Contains data files for generic data required to support the system, this includes subfolders for each environment (and one for Common)
  - **Solutions** - Contains one folder for each Solution (generally, one for the Base Solution and one at a time for each Release)
  - **WebResources** - Contains source for all web resources, including projects that require building before deployment (i.e. TypeScript)
- **tools** - scripts and tools to help with converting to and from source code

## Updating the Repo

### Prerequisites

1. Make sure you've installed (or updated) [Microsoft Power Platform CLI (aka "PAC CLI")](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction?tabs=windows#install-microsoft-power-platform-cli)
1. Use the PAC CLI to authenticate to the desired Environment: https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/auth#connect-to-your-tenant

### Solution Source
1. Create Current Release Solution in DEV Environment (use any desired method - usually done with a browser using the Maker Portal)
1. Create new branch in this repo to be used for the current release
1. Clone Current Release Solution for the first time: `pac solution clone --name <SolutionName>` (Make sure solution source files end up in `/src/Solutions/<SolutionName>`)
1. Once a solution's source has been created and needs to be updated with the lastet changes from the environment, use `pac solution sync --solution-folder .\src\Solutions\<SolutionName>\src --map .\src\Solutions\<SolutionName>\map.xml`
1. Extract Canvas Apps (extracts the YAML source from the .msapp binary): `/tools/ExtractCannvasApp.ps1 ./src/Solutions/<SolutionName> $false`

### Reference Data
1. Use CMT or `pac data` to download Reference Data
1. Use `/tools/ExtractReferenceData.ps1 <PathToData.zip> .\ReferenceData <Environment> $false` to extract the data into this `/ReferenceData/<Environment>` (Note: *Common* should be used for any data that is common in all environments)

### Portal

1. Use `pac pages list` to find the websiteId of the desired Portal
1. Use `pac pages download --websiteId <YourWebsiteId> --path .\src\Portal --overwrite`

## Packaging/Exporting for Deployment

1. Use `dotnet build BuildSolution.cdsproj -p:SolutionName=<SolutionName>` to build the Solution; the solution zip file will be created in `./bin/Debug/<SolutionName>.zip` (when building for Debug). Add `--configuration=Release` to build for Release.
1. Use `./tools/PackReferenceData.ps1 .\src\ReferenceData <Environment> $false`; an output file will created: `.\bin\Data_<Environment>.zip` (repeat this for each environment, such as `Common`, `QA`, `PROD`, etc.)

NOTE: Portal content is not packaged; it is uploaded directly from source using `pac pages upload`.

## Ongoing Considerations

1. Since Plugin Assemblies will be built as needed and since the assemblies are binary, there should be no Plugin Assemblies stored in the `/src/Solution/<SolutionName>/src/PluginAssemblies` folder. There is not yet automation or a plan to delete these after syncing from the source environment. They can be deleted by hand, or left in the repo.
1. The binary file for each Canvas App (.msapp) is downloaded, even though the automation/script will unpack it into source and then pack it when exporting. The binary file isn't needed (assuming the unpack/pack works correctly), but it may still be added to the repo for the time being.
1. There seems to be a convention with the build tooling that the Plugin Assemblies are expected to have a file name that matches the Assembly Name. If the file name is different then the build process can't seem to find it. Several workarounds have been explored, but the best one is to rename the registered Plugin Assembly to have the same name as its physical file.