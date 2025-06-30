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
    /// Message : Associate Dissassociate
    /// Primary Entity : systemuser
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    public class SystemUserAssociate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            IOrganizationService service = serviceFactory.CreateOrganizationService(null);
            IOrganizationService service1 = serviceFactory.CreateOrganizationService(null);


            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));



            if (context.MessageName == "Associate" || context.MessageName == "Disassociate")
            {
                if (context.InputParameters.Contains("Relationship"))
                {
                    Relationship rel = (Relationship)context.InputParameters["Relationship"];

                    if (rel.SchemaName != "teammembership_association") // Replace with actual relationship name
                    {
                        return;
                    }

                    EntityReference targetEntity;
                    EntityReferenceCollection relatedEntities;

                    if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is EntityReference)
                    {
                        targetEntity = (EntityReference)context.InputParameters["Target"];

                        if (context.InputParameters.Contains("RelatedEntities") && context.InputParameters["RelatedEntities"] is EntityReferenceCollection)
                        {
                            relatedEntities = context.InputParameters["RelatedEntities"] as EntityReferenceCollection;

                            foreach (var relatedEntity in relatedEntities)
                            {

                                if (relatedEntity.LogicalName == "systemuser")
                                {
                                    Guid userID = relatedEntity.Id;
                                    //Guid userID = new Guid("8eb8ffac-fcc7-ed11-b597-001dd806acfb"); //for debugging
                                    List<Guid> userteams = FetchUserTeamIds(service, userID);
                                    List<Entity> userFacilities = FetchAccountsOwnedByUserTeams(service, userteams);
                                    if (userFacilities.Count  == 1)
                                    {

                                        Entity userRecord = new Entity("systemuser", userID);
                                        userRecord["cdcep_primaryfacility"] = new EntityReference("account", userFacilities[0].Id);
                                        service.Update(userRecord);

                                    }
                                    else
                                    {
                                        Entity userRecord = new Entity("systemuser", userID);
                                        userRecord["cdcep_primaryfacility"] = null;
                                        service.Update(userRecord);
                                    }

                                }

                            }

     
                        }

                        tracingService.Trace(targetEntity.LogicalName);
                        //if (targetEntity != null )
                        //{

                        //    Guid userID = targetEntity.Id;
                        //    tracingService.Trace("Hello Error- ASK SHIJU About THIS ERROR -" + targetEntity.LogicalName + targetEntity.Id);
                        //   // throw new InvalidPluginExecutionException("Hello Error- ASK SHIJU About THIS ERROR -" + targetEntity.LogicalName + targetEntity.Id);
                        //}

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

        private List<Entity> FetchAccountsOwnedByUserTeams(IOrganizationService service, List<Guid> teamIds)
        {
          //  string st="";

          //  foreach (Guid i in teamIds)

          //  {
          //      st += i.ToString() + "---";
          //      Console.WriteLine(i);

          //  }

          ////  throw new InvalidPluginExecutionException("Teams-" + st);
            List<Entity> ownedAccounts = new List<Entity>();

            // Check if there are any team IDs to search for
            if (teamIds == null || teamIds.Count == 0)
            {
                return ownedAccounts;
            }



            //object value = teamIds;
            //ConditionExpression c = new ConditionExpression("ownerid", ConditionOperator.In, teamIds);

            // Create a query to find accounts owned by the teams
            QueryExpression query = new QueryExpression
            {
                EntityName = "account", 
                ColumnSet = new ColumnSet(false), 

                // Define the condition for the query: Owner ID in the list of team IDs
                Criteria = new FilterExpression
                {

                    Conditions =
                        {
                            new ConditionExpression
                                {
                                    AttributeName = Constants.Account.Msnfp_Accounttype,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 844060002 }
                                },

                            new ConditionExpression("ownerid", ConditionOperator.In, teamIds)
                        }
                }
            };

            // Execute the query
            EntityCollection results = service.RetrieveMultiple(query);

            // Add the results to the list
            ownedAccounts.AddRange(results.Entities);
           // throw new InvalidPluginExecutionException("Hello userid found -" + ownedAccounts.Count());  
            return ownedAccounts;
        }


    }


}

