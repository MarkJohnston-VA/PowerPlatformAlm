# ALM Example

This repo is a POC showing how to store several types of assets from PowerPlatform in source contorl and then package them into artifacts for deployment.

The initial test solution was created from the CDCE DEV instance.

## Folder Structure

- **power-platform** - The main folder where all power-platform related source lives
  - **EnvironmentVariables** - JSON files containing the (NON-SENSITIVE) environment variable values for each environment
  - **PCFControls** - Contains all PCF Controls projects
  - **Plugins** - Contains all Plugin project folders
  - **Portal** - Contains exported Portal Files, including the deployment profiles
  - **ReferenceData** - Contains data files for generic data required to support the system, this includes subfolders for each environment (and one for Common)
  - **Solutions** - Contains one folder for each Solution (generally, one for the Base Solution and one at a time for each Release)
  - **WebResources** - Contains source for all web resources, including projects that require building before deployment (i.e. TypeScript)
- **tools** - scripts and tools to help with converting to and from source code
- **tests** - Unit Tests of each type (Dotnet, JavaScript/TypeScript)

## Configurations

A configuration file is used by the Build Solution script (`.\tools\BuildSolution.ps1` or `.\tools\BuildAllSolutions.ps1`): `.\power-platform\SolutionBuildConfiguration.json`. This configuration file has the following schema:
  - **solutions** - Array of Solution objects:
    - **name** - Name of the Solution. This must be consistently used in both the system and source control. For example, the Solution Name is also expected to match the folder name in Source Control, as well as the `.cdsproj` file name.
    - **version** - Version of the Solution, used when building (typically, increment this beyond the current version in the system when building)
    - **skipFromBuild** - Skip this solution when running `BuildAllSolutions.ps1`; solution can still be built with `BuildSolution.ps1` by providing Solution Name and Version Number
    - **projectReferences** - String array of references to `csproj` and `pcfproj` files that will be built and packaged. These are generally Plugin Assemblies and PCF Projects.
    - **pluginPackages** - Array of Plugin Package objects, with the following structure:
      - **shortName** - Short descriptive name of the Plugin Package. This can be anything as long as its unique (and doesn't contain spaces). Example: *VrmArchitectsPluginPackage*
      - **projectFolder** - Relative reference to the Plugins Package project folder, within the `src` folder. Example: `Plugins\\VRM.Architects.PluginPackage`
      - **packageName** - Logical name assigned to the Plugin Package by the system. Example: `vrmarch_VRM.Architects.PluginPackage`
      - **projectName** - Name of the csproj file, without the extension. Example: `VRM.Architects.PluginPackage`

Full sample of the SolutionBuildConfiguration.json:
```json
{
  "solutions": [
    {
      "name": "TestRelease_20250801",
      "version": "1.11.0.0",
      "projectReferences": [
        "power-platform\\Plugins\\VRM.Architects.Plugins\\VRM.Architects.Plugins.csproj",
        "power-platform\\PCF\\DemoPcf1\\DemoPcf1.pcfproj"
      ],
      "pluginPackages": [
        { 
          "shortName": "VrmArchitectsPluginPackage",
          "projectFolder": "Plugins\\VRM.Architects.PluginPackage",
          "packageName": "vrmarch_VRM.Architects.PluginPackage",
          "projectName": "VRM.Architects.PluginPackage"
        }
      ]
    },
    {
      "name": "TestRelease_20250901",
      "version": "1.1.0.0",
      "skipFromBuild": true
    }
  ]
}

```

## Updating the Repo

### Prerequisites

1. Make sure you've installed (or updated) [Microsoft Power Platform CLI (aka "PAC CLI")](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction?tabs=windows#install-microsoft-power-platform-cli)
1. Use the PAC CLI to authenticate to the desired Environment: https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/auth#connect-to-your-tenant
    - TLDR: `pac auth create --name SomeNameForYourDevEnvironment --url "https://YourDevEnvironment.crm9.dynamics.com"`

### Solution Source
1. Create Current Release Solution in DEV Environment (use any desired method - usually done with a browser using the Maker Portal)
1. Create new branch in this repo to be used for the current release
1. Clone Current Release Solution for the first time: `pac solution clone --name <SolutionName>` (Make sure solution source files end up in `/src/Solutions/<SolutionName>`)
1. Once a solution's source has been created and needs to be updated with the lastet changes from the environment, use the custom Powershell script: `.\tools\SyncSolution.ps1 -SolutionName "YourSolutionName" -MapFileName "YourMapFile.xml"` (the map file parameter is optional, but projects with web resources should use this)
    - This script calls `pac solution sync` (optionally with the `--map` parameter) and then extracts the Canvas App source files

### Reference Data
1. Use CMT or `pac data` to download Reference Data
1. Use `/tools/ExtractReferenceData.ps1 <PathToData.zip> .\ReferenceData <Environment> $false` to extract the data into this `/ReferenceData/<Environment>` (Note: *Common* should be used for any data that is common in all environments)

### Portal

1. Use `pac pages list` to find the websiteId of the desired Portal
1. Use `pac pages download --websiteId <YourWebsiteId> --path .\power-platform\Portal --overwrite`

## Packaging/Exporting for Deployment

- For building Solutions, there are 2 options:
  1. Build All Solutions - This uses `SolutionBuildConfiguration.json` to determine which solutions to build. Each solution included will be built with the specified versions. Use `.\tools\BuildAllSolutions.ps1` for this.
  1. Build individual solution (still requires configuration in `SolutionBuildConfiguration.json` for Project References and Plugin Packages). Use `.\tools\buildSolution.ps1 -SolutionName "TestRelease_20250801" -Version "1.4.0.0"` to build the Solution;
  
    The solution zip file(s) will be created in `./bin/Debug/<SolutionName>.zip` (when building for Debug). Add `--configuration=Release` to build for Release.

-  Use `./tools/PackReferenceData.ps1 .\power-platform\ReferenceData <Environment> $false`; an output file will created: `.\bin\Data_<Environment>.zip` (repeat this for each environment, such as `Common`, `QA`, `PROD`, etc.)

NOTE: Portal content is not packaged; it is uploaded directly from source using `pac pages upload`.

## Ongoing Considerations

1. There seems to be a convention with the build tooling that the Plugin Assemblies are expected to have a file name that matches the Assembly Name. If the file name is different then the build process can't seem to find it. Several workarounds have been explored, but the best one is to rename the registered Plugin Assembly to have the same name as its physical file. The `BuildSolution.ps1` script makes a number of edits to the relevant files to work around this issue.
1. A NuGet Package is used to assist with Packing and Unpacking the Reference Data: [XrmCIFramework](https://www.nuget.org/packages/XrmCIFramework). The PowerShell scripts automatically download this package before using it, and delete it after using it. However, these files often remain in use and aren't able to be removed from the `.\packages` folder in this Repo. These package files can be manually deleted at any time (they will be re-downloaded by the relevant scripts as needed).
1. Version management of PCF Controls lives in the `ControlManifest.Input.xml` file in each PCF control's source path, rather than in any metadata inside the Solution. When building the solution, the source file (`ControlManifest.Input.xml`) will be updated with the respective version number for EVERY SOLUTION that is included in `SolutionBuildConfiguration.json`, even if the PCF Control is not included in the Solution. THIS IS OK because only the expected version will be included with the Solution package, regardless of the last version number saved. (Theoretically, the PCF control could be included in more than one solution, even though it should only be in one.) A future enhancement may be to include PCF controls in the solution object in `SolutionBuildConfiguration.json`, and then the version change could be filtered to only apply it to the expected solution.

## Base Solution

The Base Solution is a custom, unmanaged solution that contains all customizations applied to the system by the VRM.

See [Base Solution documentation](./baseSolution.md) for details.