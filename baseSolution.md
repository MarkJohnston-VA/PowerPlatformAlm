# Base Solution

The Base Solution is a custom, unmanaged solution that contains all customizations applied to the system by the VRM.

In theory, the Base Solution could be used as the starting point for a new Envrionment or to clean up an Environment that's become corrupted, just by being imported into a vanilla Dataverse instance. (In practice, this will rarely, if ever, be done.)

**The most practical use of the Base Solution is to provide a flattened view of schema changes across versions.**

The Base Solution is similar to the Default Solution, except that the Default Solution can not be exported. The Base Solution will have to be built once by copying all VRM-created custom Solution Components. The Base Solution will be exported, unpacked, and placed into Source Control.

After each Release, the Base Solution will need to be updated by copying any newly-added Solution Components into it. After updating, the Base Solution can be exported, unpacked, and updated into Source Control to represent the incremental changes for each Release.

## Building the Base Solution

The following is a general approach that can be used to create the Base Solution in an environment (presumably a cleaner upper environment, like QA or PreProd):

1. Create an empty Solution ("Base Solution"), selecting the current VRM publisher.
1. Populate the Base Solution manually using code similar to the example below.
1. Export the Base Solution.
1. Unpack the Base Solution.
1. Add the unpacked code to Source Control (`/src/Solutions/BaseSolution`).

### Code Sample for Building the Base Solution

Below is a code sample in C# that can be executed in [LINQPad 8](https://www.linqpad.net/) (TRM Approved, though the Premium features require a license). This can also be executed in Visual Studio. The only external dependency is [Microsoft.PowerPlatform.Dataverse.Client](https://www.nuget.org/packages/Microsoft.PowerPlatform.Dataverse.Client).

```cs
//TODO: Replace this with your Environment
const string EnvironmentUrl = "https://dvagov-commcare-mock.crm9.dynamics.com";
const string BaseSolutionName = "BaseSolution";

void Main()
{
    var serviceClient = GetServiceClient(EnvironmentUrl);

    var allComponents = RetrieveAllComponents(serviceClient);

    var existingBaseSolutionComponents = RetrieveExistingBaseSolutionComponents(serviceClient);    

    var responses = AddSolutionComponents(serviceClient, allComponents, existingBaseSolutionComponents);
    foreach(var error in responses.Errors)
    {
        Console.WriteLine($"ERROR with Solution Component ({error.Item1}): {error.Item2}");
    }
    //TODO: Perhaps some additional logging may be needed for the Responses.
}

ServiceClient GetServiceClient(string environmentUrl)
{
  //NOTE: This will authenticate by launching a browser. This can be replaced with SPN (App Registration), or any other valid authentication type.
    //https://learn.microsoft.com/en-us/power-apps/developer/data-platform/authenticate-oauth
    var connectionString = string.Format("AuthType=OAuth;Url={0};RedirectUri=http://localhost;AppId=51f81489-12ee-4a9e-aaae-a2591f45987d;LoginPrompt=Auto", environmentUrl);
    return new ServiceClient(connectionString);
}

List<Entity> RetrieveAllComponents(ServiceClient serviceClient)
{
    //TODO: Update the filter criteria here to only retrieve the components
    //    desired to be added to the BaseSolution.
    //    For example, filter only include components from specific Publishers
    //    (or with a specific prefix).
    //    Currently, this retrieves all unmanaged components that were not
    //    created by "SYSTEM". That's probably overkill for what VRM needs.
    var query = new QueryExpression("solutioncomponent")
    {
        ColumnSet = new ColumnSet("componenttype", "objectid", "rootcomponentbehavior"),
        LinkEntities =
        {
            new LinkEntity
            {
                JoinOperator = JoinOperator.Inner,
                LinkFromEntityName = "solutioncomponent",
                LinkFromAttributeName = "solutionid",
                LinkToAttributeName = "solutionid",
                LinkToEntityName = "solution",
                EntityAlias = "solution",
                LinkCriteria = new FilterExpression
                {
                    FilterOperator = LogicalOperator.And,
                    Conditions = 
                    {
                        new ConditionExpression("ismanaged", ConditionOperator.Equal, false),
                        new ConditionExpression("isvisible", ConditionOperator.Equal, true),    
                    }
                }
            },
            new LinkEntity
            {    
                JoinOperator = JoinOperator.Inner,
                LinkFromEntityName = "solutioncomponent",
                LinkFromAttributeName = "createdonbehalfby",
                LinkToAttributeName = "systemuserid",
                LinkToEntityName = "systemuser",
                EntityAlias = "createdby",
                LinkCriteria = new FilterExpression
                {
                    FilterOperator = LogicalOperator.And,
                    Conditions = 
                    {
                        new ConditionExpression("fullname", ConditionOperator.NotLike, "SYSTEM"),
                    }
                },
            }
        },
    };

    var queryResult = new List<Entity>();
    EntityCollection pageResult;

    do
    {
        pageResult = serviceClient.RetrieveMultiple(query);

        queryResult.AddRange(pageResult.Entities);

        // prepare next request
        if (pageResult.MoreRecords)
        {
            query.PageInfo.PageNumber++;
            query.PageInfo.PagingCookie = pageResult.PagingCookie;
        }
    }
    while (pageResult.MoreRecords);

    Console.WriteLine($"Retrieved {queryResult.Count} Solution Components from ALL Solutions");

    return queryResult;
}

List<Entity> RetrieveExistingBaseSolutionComponents(ServiceClient serviceClient)
{
    var query = new QueryExpression("solutioncomponent")
    {
        ColumnSet = new ColumnSet("solutioncomponentid"),
        LinkEntities =
        {
            new LinkEntity("solutioncomponent", "solution", "solutionid", "solutionid", JoinOperator.Inner)
            {
                EntityAlias = "solution",
                LinkCriteria =
                {
                    Conditions =
                    {
                        new ConditionExpression("ismanaged", ConditionOperator.Equal, false),
                        new ConditionExpression("isvisible", ConditionOperator.Equal, true),
                        new ConditionExpression("uniquename", ConditionOperator.Like, BaseSolutionName)
                    }
                }
            }
        }
    };

    var queryResult = new List<Entity>();
    EntityCollection pageResult;

    do
    {
        pageResult = serviceClient.RetrieveMultiple(query);

        queryResult.AddRange(pageResult.Entities);

        // prepare next request
        if (pageResult.MoreRecords)
        {
            query.PageInfo.PageNumber++;
            query.PageInfo.PagingCookie = pageResult.PagingCookie;
        }
    }
    while (pageResult.MoreRecords);

    Console.WriteLine($"Retrieved {queryResult.Count} existing Solution Components from {BaseSolutionName}");

    return queryResult;

}

( List<AddSolutionComponentResponse> Responses, List<(Guid, Exception)> Errors ) AddSolutionComponents(ServiceClient serviceClient, List<Entity> componentsToAdd, List<Entity> existingBaseSolutionComponents)
{
    var Responses = new List<AddSolutionComponentResponse>();
    var Errors = new List<(Guid, Exception)>();
    
    foreach(var component in componentsToAdd.Where(c => !existingBaseSolutionComponents.Any(e => c.Id == e.Id)))
    {
        try
        {
            var componentId = component.GetAttributeValue<Guid>("objectid");
            Console.WriteLine($"Starting component {componentId}...");
            var request = new AddSolutionComponentRequest
            {
                AddRequiredComponents = false,
                ComponentId = component.GetAttributeValue<Guid>("objectid"),
                ComponentType = component.GetAttributeValue<OptionSetValue>("componenttype").Value,
                SolutionUniqueName = BaseSolutionName,
                DoNotIncludeSubcomponents = component.GetAttributeValue<OptionSetValue>("rootcomponentbehavior")?.Value == 1 ||
                                        component.GetAttributeValue<OptionSetValue>("rootcomponentbehavior")?.Value == 2
            };

            Responses.Add(serviceClient.Execute(request) as AddSolutionComponentResponse);
            Console.Write("DONE!");

        } catch(Exception ex)
        {
            Errors.Add((component.GetAttributeValue<Guid>("objectid"), ex));
            Console.Write($"ERROR! {ex.Message}");
        }
    }

    return (Responses, Errors);
}


```