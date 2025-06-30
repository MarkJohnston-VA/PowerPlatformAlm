using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to 
    /// Message : 
    /// Primary Entity : systemuser
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    public class SystemUserVISNChange : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            IOrganizationService service = serviceFactory.CreateOrganizationService(null);
            IOrganizationService service1 = serviceFactory.CreateOrganizationService(null);


            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            
            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.SystemUsers.LogicalName)
                return;

            Entity targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            tracingService.Trace(context.Depth.ToString());
            tracingService.Trace(context.MessageName);


            if (context.Depth > 1)
                return;
            if (context.MessageName == "Update")
            {

                // Retrieve the Business Unit ID of the user
                var user = service.Retrieve("systemuser", targetEntity.Id, new ColumnSet("businessunitid"));
                //users current business unit
                var userBusinessUnitId = user.GetAttributeValue<EntityReference>("businessunitid").Id;

                QueryExpression query = new QueryExpression("team")
                {
                    ColumnSet = new ColumnSet("teamid", "businessunitid"),
                    LinkEntities =
                        {
                            new LinkEntity
                            {
                                LinkFromEntityName = "team",
                                LinkToEntityName = "teammembership",
                                LinkFromAttributeName = "teamid",
                                LinkToAttributeName = "teamid",
                                LinkCriteria =
                                {
                                    Conditions =
                                    {
                                        new ConditionExpression("systemuserid", ConditionOperator.Equal, targetEntity.Id),
                        
                                    }
                                }
                            }
                        }
                };

                // Execute the query
                EntityCollection teams = service.RetrieveMultiple(query);
                string st = "Teams \n"; 
                foreach (var team in teams.Entities)
                {
                    Guid teamBusinessUnitId = ((EntityReference)team["businessunitid"]).Id;
                    tracingService.Trace("Team ID:  " + team.Id);
                    st += team.Id + "\n";
                }
                tracingService.Trace(st);

                // Disassociate the user from each team, except the default team
                foreach (var team in teams.Entities)
                {
                    Guid teamBusinessUnitId = ((EntityReference)team["businessunitid"]).Id;
                   // tracingService.Trace("teamBusinessUnitId  " + teamBusinessUnitId);

                    if (!IsthisaDefaultTeam(service,team.Id) && (!DoesTeamNameStartWithPrefix(service, team.Id,"CDCE")) ) // Skip the default team and ""CDCE Team"
                    {
                        service.Disassociate("team", team.Id, new Relationship("teammembership_association"), new EntityReferenceCollection() { new EntityReference("systemuser", targetEntity.Id) });
                    }
                }



            }
        }



        private List<Guid> FetchUserTeamIds(IOrganizationService service, Guid userId)
        {
            List<Guid> teamIds = new List<Guid>();

            // Create a query expression to retrieve the team IDs the user belongs to
            QueryExpression query = new QueryExpression
            {
                EntityName = "teammembership", // Replace with the correct entity name
                ColumnSet = new ColumnSet("teamid"), // Adjust if the team ID column name is different

                // Define the condition for the query: User ID in the team membership
                Criteria = new FilterExpression
                {
                    Conditions =
                        {
                            new ConditionExpression
                            {
                                AttributeName = "systemuserid", // Replace with the correct attribute name
                                Operator = ConditionOperator.Equal,
                                Values = { userId }
                            }
                        }
                }
            };

            // Execute the query
           EntityCollection results = service.RetrieveMultiple(query);

            // Extract the team IDs from the results
            foreach (Entity teamMembership in results.Entities)
            {
                Guid teamId = teamMembership.GetAttributeValue<Guid>("teamid");
                teamIds.Add(teamId);
            }

            return teamIds;
        }

        private bool IsthisaDefaultTeam(IOrganizationService service, Guid TeamID)
        {
            

            // Create a query expression to retrieve the team IDs the user belongs to
            QueryExpression query = new QueryExpression
            {
                EntityName = "team", // Replace with the correct entity name
                ColumnSet = new ColumnSet("teamid"), // Adjust if the team ID column name is different

                // Define the condition for the query: User ID in the team membership
                Criteria = new FilterExpression
                {
                    Conditions =
                         {
                           new ConditionExpression("teamid", ConditionOperator.Equal, TeamID),
                           new ConditionExpression("isdefault", ConditionOperator.Equal, true),
                         }
                }
            };

            // Execute the query
            EntityCollection results = service.RetrieveMultiple(query);

            if (results.Entities.Count > 0)
            {
                return true;
            }

            return false;
        }

        private bool DoesTeamNameStartWithPrefix(IOrganizationService service, Guid teamId, string prefix)
        {
            // Retrieve the team name using the teamId
            ColumnSet columns = new ColumnSet("name"); 
            Entity teamEntity = service.Retrieve("team", teamId, columns);
            string teamName = teamEntity.Attributes.Contains("name") ? teamEntity["name"].ToString() : string.Empty;

            // Check if the team name starts with the specified prefix
            return teamName.StartsWith(prefix, StringComparison.OrdinalIgnoreCase);
        }


        //private bool IsThisExcemptedTeam(IOrganizationService service, Guid TeamID)
        //{


        //    // Create a query expression to retrieve the team IDs the user belongs to
        //    QueryExpression query = new QueryExpression
        //    {
        //        EntityName = "team", 
        //        ColumnSet = new ColumnSet("name"), 

        //        // Define the condition for the query: User ID in the team membership
        //        Criteria = new FilterExpression
        //        {
        //            Conditions =
        //                 {
        //                   new ConditionExpression("name", ConditionOperator.Contains, "CDCE")
        //                 }
        //        }
        //    };

        //    // Execute the query
        //    EntityCollection results = service.RetrieveMultiple(query);

        //    if (results.Entities.Count > 0)
        //    {
        //        return true;
        //    }

        //    return false;
        //}




    }




}

