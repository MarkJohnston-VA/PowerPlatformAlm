using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to cancel all draft timeentries when Volunteer Assignment is Cancelled..
    /// Message : Update
    /// Primary Entity : cdcep_volunteerassignment
    /// Secondary Entity : none
    /// Filtering Attributes : statuscode
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PostOperation
    /// Execution Mode : Async
    /// </summary>
    public class VolunteerAssignmentOnChange : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(null);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null, postImageEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }
            if (context.Depth > 3)
                return;

            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.VolunteerAssignment.LogicalName && !context.PostEntityImages.Contains(Constants.POST_IMAGE))
                return;
            else
            {
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;
                postImageEntity = context.PostEntityImages[Constants.POST_IMAGE] as Entity;
            }

            if (targetEntity is Entity && context.MessageName == Constants.Messages.Update)
            {

                if (targetEntity.Attributes.Contains(Constants.Status.StatusCode))
                {
                    tracingService.Trace($"Volunteer Assignment Status Code : {targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StatusCode).Value}");
                    switch (targetEntity.GetAttributeValue<OptionSetValue>(Constants.Status.StatusCode).Value)
                    {
                        case 100000002:         //Declined
                        case 2:                 //Inactive
                            //EntityCollection draftTimeEntryCollection = RetrieveDraftTimeEntriesCollection(tracingService, service, targetEntity.ToEntityReference());
                            //tracingService.Trace($"Total Draft Time Entries : {draftTimeEntryCollection.Entities.Count}");
                            //foreach (Entity timeEntryEntity in draftTimeEntryCollection.Entities)
                            //{
                            //    timeEntryEntity[Constants.Status.StateCode] = new OptionSetValue(1);
                            //    timeEntryEntity[Constants.Status.StatusCode] = new OptionSetValue(796500004);

                            //    service.Update(timeEntryEntity);
                            //}
                            DeactivateVolunteerRequirements(tracingService, service, postImageEntity);
                            break;
                        case 100000001:         //Approved
                        case 1:                 //Active
                            tracingService.Trace($"Retrieving Existing Requirement...");
                            EntityCollection existingLocalVolunteerRequirementCollection = RetrieveVolunteerRequirement(tracingService, service, postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer));

                            CreateAllVolunteersRequirements(tracingService, service, postImageEntity, existingLocalVolunteerRequirementCollection);
                            CreateRoleTypeRequirement(tracingService, service, postImageEntity, existingLocalVolunteerRequirementCollection);
                            CreateRoleSpecificRequirement(tracingService, service, postImageEntity, existingLocalVolunteerRequirementCollection);

                            break;
                    }
                }
            }
        }

        #region Deactivate related Methods

        private void DeactivateVolunteerRequirements(ITracingService tracingService, IOrganizationService service, Entity postImageEntity)
        {
            tracingService.Trace($"Inside DeactivateVolunteerRequirements...");
            tracingService.Trace($"Retrieving Existing Requirement...");
            EntityCollection existingLocalVolunteerRequirementCollection = RetrieveVolunteerRequirementExceptAllVolunteersType(tracingService, service, postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer));
            EntityCollection activeVolAssignmentCollection = RetrieveActiveVolunteerAssignment(tracingService, service, postImageEntity);
            EntityCollection currentVolAssignmentRequirementCollection = RetrieveRequirementForCurrentVolunteerAssignment(tracingService, service, postImageEntity);
            tracingService.Trace($"Active Volunteer Assignment Count : {activeVolAssignmentCollection.Entities.Count}");

            Dictionary<Guid, EntityReference> RequirementDictionary = new Dictionary<Guid, EntityReference>();
            tracingService.Trace($"Current Volunteer Assignment Requirement Count : {currentVolAssignmentRequirementCollection.Entities.Count}");

            foreach (Entity entity in currentVolAssignmentRequirementCollection.Entities)
            {
                if (entity.LogicalName == Constants.Requirements.LogicalName)
                {
                    if (!RequirementDictionary.ContainsKey(entity.Id))
                        RequirementDictionary.Add(entity.Id, entity.ToEntityReference());
                }
                else if (entity.LogicalName == Constants.BenefitingServiceRoleRequirements.LogicalName)
                {
                    if (entity.Attributes.Contains(Constants.BenefitingServiceRoleRequirements.Requirement))
                    {
                        if (!RequirementDictionary.ContainsKey(entity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoleRequirements.Requirement).Id))
                            RequirementDictionary.Add(entity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoleRequirements.Requirement).Id, entity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoleRequirements.Requirement));
                    }
                }
            }

            foreach (Entity activeVolAssignmentEntity in activeVolAssignmentCollection.Entities)
            {
                tracingService.Trace($"Processing Volunteer Assignment : {activeVolAssignmentEntity.Id}");
                EntityCollection bsrRequirementEntityCollection = RetrieveRoleSpecificRequirementForVolAssignment(tracingService, service, activeVolAssignmentEntity);
                foreach (Entity bsrRequirementEntity in bsrRequirementEntityCollection.Entities)
                {
                    if (bsrRequirementEntity.Attributes.Contains(Constants.BenefitingServiceRoleRequirements.Requirement))
                    {
                        if (RequirementDictionary.ContainsKey(bsrRequirementEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoleRequirements.Requirement).Id))
                            RequirementDictionary.Remove(bsrRequirementEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoleRequirements.Requirement).Id);
                    }
                }
                EntityCollection requirementEntityCollection = RetrieveRoleTypeRequirementForVolAssignment(tracingService, service, activeVolAssignmentEntity);
                foreach (Entity requirementEntity in requirementEntityCollection.Entities)
                {
                        if (RequirementDictionary.ContainsKey(requirementEntity.Id))
                            RequirementDictionary.Remove(requirementEntity.Id);
                }


                if (RequirementDictionary.Count == 0)
                    break;
            }

            if (activeVolAssignmentCollection.Entities.Count == 0)
            {
                tracingService.Trace($"Active Vol Assignment Count is 0. Need to deactivate all local requirement.");

                foreach (Entity localVolRequirementEntity in existingLocalVolunteerRequirementCollection.Entities)
                {
                    Entity tmpEntity = new Entity(localVolRequirementEntity.LogicalName);
                    tmpEntity.Id = localVolRequirementEntity.Id;
                    tmpEntity[Constants.Status.StateCode] = new OptionSetValue(1);
                    tmpEntity[Constants.Status.StatusCode] = new OptionSetValue(2);

                    service.Update(tmpEntity);
                }

            }
            else
            {
                foreach (KeyValuePair<Guid, EntityReference> requimentDic in RequirementDictionary)
                {
                    Entity existingVolunteerRequirementEntity = existingLocalVolunteerRequirementCollection.Entities.Where(vr => vr.Attributes.Contains(Constants.VolunteerRequirements.RequirementID)
&& vr.GetAttributeValue<EntityReference>(Constants.VolunteerRequirements.RequirementID).Id.Equals(requimentDic.Key)).FirstOrDefault();
                    if (existingVolunteerRequirementEntity is Entity)
                    {
                        Entity tmpEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                        tmpEntity.Id = existingVolunteerRequirementEntity.Id;
                        tmpEntity[Constants.Status.StateCode] = new OptionSetValue(1);
                        tmpEntity[Constants.Status.StatusCode] = new OptionSetValue(2);

                        service.Update(tmpEntity);
                    }
                }
            }

        }

        private EntityCollection RetrieveVolunteerRequirementExceptAllVolunteersType(ITracingService tracingService, IOrganizationService service, EntityReference volunteerEntityReference)
        {
            tracingService.Trace($"Calling RetrieveVolunteerRequirement...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerRequirements.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerRequirements.RequirementID, Constants.VolunteerRequirements.PrimaryKey, Constants.VolunteerRequirements.VolunteerID,
                Constants.VolunteerRequirements.RequirementDate, Constants.Status.StateCode),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerRequirements.VolunteerID,
                                    Operator = ConditionOperator.Equal,
                                    Values = { volunteerEntityReference.Id }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 100
            };

            LinkEntity reqLinkEntity = new LinkEntity(Constants.VolunteerRequirements.LogicalName, Constants.Requirements.LogicalName, Constants.VolunteerRequirements.RequirementID, Constants.Requirements.PrimaryKey, JoinOperator.Inner);
            reqLinkEntity.LinkCriteria.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));
            reqLinkEntity.LinkCriteria.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.NotEqual, 100000000));      //All Volunteers
            query.LinkEntities.Add(reqLinkEntity);

            return service.RetrieveMultiple(query);

        }
        private EntityCollection RetrieveActiveVolunteerAssignment(ITracingService tracingService, IOrganizationService service, Entity postImageEntity)
        {
            tracingService.Trace($"Calling RetrieveActiveVolunteerAssignment...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerAssignment.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerAssignment.BenefitingService, Constants.VolunteerAssignment.BenefitingServiceRoles, Constants.VolunteerAssignment.Volunteer, Constants.Status.StateCode, Constants.Status.StatusCode,
                Constants.VolunteerAssignment.RootFacility, Constants.VolunteerAssignment.Facility),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.Volunteer,
                                    Operator = ConditionOperator.Equal,
                                    Values = { postImageEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer).Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerAssignment.PrimaryKey,
                                    Operator = ConditionOperator.NotEqual,
                                    Values = { postImageEntity.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.Status.StateCode,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 0 }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 100
            };

            return service.RetrieveMultiple(query);
        }

        private EntityCollection RetrieveRequirementForCurrentVolunteerAssignment(ITracingService tracingService, IOrganizationService service, Entity volunteerAssignmentEntity)
        {
            EntityCollection requirementEntityCollection = new EntityCollection();

            tracingService.Trace($"Getting RoleType specific requirement");

            EntityReference facilityReference = null;
            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.RootFacility))
            {
                tracingService.Trace($"Root Facility Found : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility).Id}");
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility);
            }
            else
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility);

            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingServiceRoles))
            {
                tracingService.Trace($"Retrieving Role Type for Benefiting Service Role : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id} ");

                Entity benefitingServiceRoleEntity = service.Retrieve(volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).LogicalName, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id,
                    new ColumnSet(Constants.BenefitingServiceRoles.RoleType));
                if (benefitingServiceRoleEntity is Entity && benefitingServiceRoleEntity.Attributes.Contains(Constants.BenefitingServiceRoles.RoleType))
                {
                    QueryExpression queryExpression = new QueryExpression(Constants.Requirements.LogicalName);
                    queryExpression.ColumnSet = new ColumnSet(Constants.Requirements.PrimaryKey, Constants.Requirements.Name);

                    FilterExpression filterExpression = new FilterExpression(LogicalOperator.Or);

                    FilterExpression nationalFilterExpression = new FilterExpression(LogicalOperator.And);
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.RoleType, ConditionOperator.Equal, benefitingServiceRoleEntity.GetAttributeValue<OptionSetValue>(Constants.BenefitingServiceRoles.RoleType).Value));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000001));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000001));

                    filterExpression.AddFilter(nationalFilterExpression);

                    if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.Facility))
                    {
                        FilterExpression localFilterExpression = new FilterExpression(LogicalOperator.And);
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000000));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000001));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.RoleType, ConditionOperator.Equal, benefitingServiceRoleEntity.GetAttributeValue<OptionSetValue>(Constants.BenefitingServiceRoles.RoleType).Value));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Facility, ConditionOperator.Equal, facilityReference.Id));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));

                        filterExpression.AddFilter(localFilterExpression);
                    }

                    queryExpression.Criteria.AddFilter(filterExpression);
                    queryExpression.TopCount = 1000;
                    queryExpression.NoLock = true;

                    requirementEntityCollection = service.RetrieveMultiple(queryExpression);

                }
            }
            tracingService.Trace($"RoleType related requirement Count : {requirementEntityCollection.Entities.Count}");

            tracingService.Trace($"Gathering Role specific requirement");



            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingService) && volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingServiceRoles))
            {
                QueryExpression queryExpression = new QueryExpression(Constants.BenefitingServiceRoleRequirements.LogicalName);
                queryExpression.ColumnSet = new ColumnSet(Constants.BenefitingServiceRoleRequirements.PrimaryKey, Constants.BenefitingServiceRoleRequirements.Requirement);

                FilterExpression filterExpression = new FilterExpression(LogicalOperator.And);
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.BenefitingService, ConditionOperator.Equal, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingService).Id));
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.Role, ConditionOperator.Equal, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id));
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.Facility, ConditionOperator.Equal, facilityReference.Id));



                queryExpression.Criteria.AddFilter(filterExpression);
                queryExpression.TopCount = 1000;
                queryExpression.NoLock = true;

                requirementEntityCollection.Entities.AddRange(service.RetrieveMultiple(queryExpression).Entities);
            }
            tracingService.Trace($"Total Requirement for this  Vol Assignment : {requirementEntityCollection.Entities.Count}");
            return requirementEntityCollection;
        }
        private EntityCollection RetrieveRoleSpecificRequirementForVolAssignment(ITracingService tracingService, IOrganizationService service, Entity volunteerAssignmentEntity)
        {
            tracingService.Trace($"In RetrieveRoleSpecificeRequirementForVolAssignment method");
            tracingService.Trace($"Gathering Role specific requirement");

            EntityReference facilityReference = null;
            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.RootFacility))
            {
                tracingService.Trace($"Root Facility Found : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility).Id}");
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility);
            }
            else
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility);


            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingService) && volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingServiceRoles))
            {
                QueryExpression queryExpression = new QueryExpression(Constants.BenefitingServiceRoleRequirements.LogicalName);
                queryExpression.ColumnSet = new ColumnSet(Constants.BenefitingServiceRoleRequirements.PrimaryKey, Constants.BenefitingServiceRoleRequirements.Requirement);

                FilterExpression filterExpression = new FilterExpression(LogicalOperator.And);
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.BenefitingService, ConditionOperator.Equal, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingService).Id));
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.Role, ConditionOperator.Equal, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id));
                if (facilityReference is EntityReference)
                    filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.Facility, ConditionOperator.Equal, facilityReference.Id));



                queryExpression.Criteria.AddFilter(filterExpression);
                queryExpression.TopCount = 1000;
                queryExpression.NoLock = true;

                return service.RetrieveMultiple(queryExpression);
            }
            return new EntityCollection();
        }

        private EntityCollection RetrieveRoleTypeRequirementForVolAssignment(ITracingService tracingService, IOrganizationService service, Entity volunteerAssignmentEntity)
        {
            tracingService.Trace($"In RetrieveRoleTypeRequirementForVolAssignment method");
            tracingService.Trace($"Getting RoleType specific requirement");

            EntityReference facilityReference = null;
            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.RootFacility))
            {
                tracingService.Trace($"Root Facility Found : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility).Id}");
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility);
            }
            else
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility);

            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingServiceRoles))
            {
                tracingService.Trace($"Retrieving Role Type for Benefiting Service Role : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id} ");

                Entity benefitingServiceRoleEntity = service.Retrieve(volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).LogicalName, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id,
                    new ColumnSet(Constants.BenefitingServiceRoles.RoleType));
                if (benefitingServiceRoleEntity is Entity && benefitingServiceRoleEntity.Attributes.Contains(Constants.BenefitingServiceRoles.RoleType))
                {
                    QueryExpression queryExpression = new QueryExpression(Constants.Requirements.LogicalName);
                    queryExpression.ColumnSet = new ColumnSet(Constants.Requirements.PrimaryKey, Constants.Requirements.Name);

                    FilterExpression filterExpression = new FilterExpression(LogicalOperator.Or);

                    FilterExpression nationalFilterExpression = new FilterExpression(LogicalOperator.And);
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.RoleType, ConditionOperator.Equal, benefitingServiceRoleEntity.GetAttributeValue<OptionSetValue>(Constants.BenefitingServiceRoles.RoleType).Value));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000001));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000001));

                    filterExpression.AddFilter(nationalFilterExpression);

                    if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.Facility))
                    {
                        FilterExpression localFilterExpression = new FilterExpression(LogicalOperator.And);
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000000));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000001));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.RoleType, ConditionOperator.Equal, benefitingServiceRoleEntity.GetAttributeValue<OptionSetValue>(Constants.BenefitingServiceRoles.RoleType).Value));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Facility, ConditionOperator.Equal, facilityReference.Id));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));

                        filterExpression.AddFilter(localFilterExpression);
                    }

                    queryExpression.Criteria.AddFilter(filterExpression);
                    queryExpression.TopCount = 1000;
                    queryExpression.NoLock = true;

                    return service.RetrieveMultiple(queryExpression);

                }
                else
                    return new EntityCollection();
            }
            return new EntityCollection();


        }

        #endregion


        private EntityCollection RetrieveDraftTimeEntriesCollection(ITracingService tracingService, IOrganizationService service, EntityReference volunteerAssignmentEntityReference)
        {
            tracingService.Trace($"Retrieve Draft Time Entries for Volunteer Assignment : {volunteerAssignmentEntityReference.Id}");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.TimeEntries.LogicalName,
                ColumnSet = new ColumnSet(Constants.TimeEntries.PrimaryKey),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.TimeEntries.VolunteerAssignment,
                                    Operator = ConditionOperator.Equal,
                                    Values = { volunteerAssignmentEntityReference.Id }
                                },
                                new ConditionExpression
                                {
                                    AttributeName = Constants.Status.StatusCode,
                                    Operator = ConditionOperator.Equal,
                                    Values = { 1 }
                                }
                            }
                }
,
                NoLock = true
,
                TopCount = 5000
            };
            query.Orders.Add(new OrderExpression() { OrderType = OrderType.Descending, AttributeName = Constants.TimeEntries.Date });

            return service.RetrieveMultiple(query);
        }

        private EntityCollection RetrieveVolunteerRequirement(ITracingService tracingService, IOrganizationService service, EntityReference volunteerEntityReference)
        {
            tracingService.Trace($"Calling RetrieveVolunteerRequirement...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerRequirements.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerRequirements.RequirementID, Constants.VolunteerRequirements.PrimaryKey, Constants.VolunteerRequirements.VolunteerID,
                Constants.VolunteerRequirements.RequirementDate, Constants.Status.StateCode),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.VolunteerRequirements.VolunteerID,
                                    Operator = ConditionOperator.Equal,
                                    Values = { volunteerEntityReference.Id }
                                }
                            }
                }
    ,
                NoLock = true
    ,
                TopCount = 100
            };

            LinkEntity reqLinkEntity = new LinkEntity(Constants.VolunteerRequirements.LogicalName, Constants.Requirements.LogicalName, Constants.VolunteerRequirements.RequirementID, Constants.Requirements.PrimaryKey, JoinOperator.Inner);
            reqLinkEntity.LinkCriteria.AddCondition(new ConditionExpression(Constants.Status.StateCode, ConditionOperator.Equal, 0));
            query.LinkEntities.Add(reqLinkEntity);

            return service.RetrieveMultiple(query);

        }



        private void CreateAllVolunteersRequirements(ITracingService tracingService, IOrganizationService service, Entity volunteerAssignmentEntity, EntityCollection existingLocalVolunteerRequirementCollection)
        {
            tracingService.Trace($"In CreateAllVolunteersRequirements method");
            tracingService.Trace($"Getting All Volunteers Type Local requirement");

            EntityReference facilityReference = null;
            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.RootFacility))
            {
                tracingService.Trace($"Root Facility Found : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility).Id}");
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility);
            }
            else
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility);

            QueryExpression queryExpression = new QueryExpression(Constants.Requirements.LogicalName);
            queryExpression.ColumnSet = new ColumnSet(Constants.Requirements.PrimaryKey, Constants.Requirements.Name);

            FilterExpression localFilterExpression = new FilterExpression(LogicalOperator.And);
            localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000000));
            localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000000));
            localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Facility, ConditionOperator.Equal, facilityReference.Id));
            localFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StatusCode, ConditionOperator.Equal, 1));
            localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.IsNewRequirement, ConditionOperator.NotEqual, true));

            queryExpression.Criteria.AddFilter(localFilterExpression);
            queryExpression.TopCount = 1000;
            queryExpression.NoLock = true;

            EntityCollection requirementEntityCollection = service.RetrieveMultiple(queryExpression);
            tracingService.Trace($"Requirement Count : {requirementEntityCollection.Entities.Count}...");

            foreach (Entity requirementEntity in requirementEntityCollection.Entities)
            {
                Entity existingVolunteerRequirementEntity = existingLocalVolunteerRequirementCollection.Entities.Where(vr => vr.Attributes.Contains(Constants.VolunteerRequirements.RequirementID)
                        && vr.GetAttributeValue<EntityReference>(Constants.VolunteerRequirements.RequirementID).Id.Equals(requirementEntity.Id)).FirstOrDefault();
                if (existingVolunteerRequirementEntity is Entity)
                {
                    tracingService.Trace($"Existing Vol. Requirement found. ");
                    if (requirementEntity.Attributes.Contains(Constants.Requirements.RequirementDateType) && requirementEntity.GetAttributeValue<OptionSetValue>(Constants.Requirements.RequirementDateType).Value == 100000004)
                    {
                        if (existingVolunteerRequirementEntity.Attributes.Contains(Constants.VolunteerRequirements.RequirementDate)
                            && existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate) < DateTime.Now)
                        {
                            tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date : {existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate)} is " +
                                $"is less than Current Date : {DateTime.Now}. Marking Vol requirement as Not Met.");
                            Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                            tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                            tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                            tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(100000002);
                            service.Update(tmpvolreqEntity);
                        }
                        else
                        {
                            tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date not found. Marking Vol requirement as New.");
                            Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                            tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                            tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                            tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                            service.Update(tmpvolreqEntity);
                        }
                    }
                    else
                    {
                        tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} Set status to Active and New.");
                        Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                        tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                        tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                        tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                        service.Update(tmpvolreqEntity);
                    }
                }
                else
                {
                    tracingService.Trace($"Existing Vol. Requirement NOT found. Creating New One...");
                    Entity volunteerRequirementEntity = new Entity(Constants.VolunteerRequirements.LogicalName);
                    volunteerRequirementEntity[Constants.VolunteerRequirements.VolunteerID] = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer);
                    volunteerRequirementEntity[Constants.VolunteerRequirements.RequirementID] = requirementEntity.ToEntityReference();
                    volunteerRequirementEntity[Constants.VolunteerRequirements.Name] = requirementEntity.GetAttributeValue<string>(Constants.Requirements.Name);
                    volunteerRequirementEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                    volunteerRequirementEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                    service.Create(volunteerRequirementEntity);
                }

                //Entity volunteerRequirementEntity = new Entity(Constants.VolunteerRequirements.LogicalName);
                //volunteerRequirementEntity[Constants.VolunteerRequirements.VolunteerID] = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer);
                //volunteerRequirementEntity[Constants.VolunteerRequirements.RequirementID] = requirementEntity.ToEntityReference();
                //volunteerRequirementEntity[Constants.VolunteerRequirements.Name] = requirementEntity.GetAttributeValue<string>(Constants.Requirements.Name);

                //service.Create(volunteerRequirementEntity);
            }
        }

        private void CreateRoleSpecificRequirement(ITracingService tracingService, IOrganizationService service, Entity volunteerAssignmentEntity, EntityCollection existingLocalVolunteerRequirementCollection)
        {
            tracingService.Trace($"In CreateRoleSpecificRequirement method");
            tracingService.Trace($"Getting Role specific requirement");


            EntityReference facilityReference = null;
            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.RootFacility))
            {
                tracingService.Trace($"Root Facility Found : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility).Id}");
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility);
            }
            else
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility);

            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingService) && volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingServiceRoles))
            {

                QueryExpression queryExpression = new QueryExpression(Constants.BenefitingServiceRoleRequirements.LogicalName);
                queryExpression.ColumnSet = new ColumnSet(Constants.BenefitingServiceRoleRequirements.PrimaryKey, Constants.BenefitingServiceRoleRequirements.Requirement);

                FilterExpression filterExpression = new FilterExpression(LogicalOperator.And);
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.BenefitingService, ConditionOperator.Equal, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingService).Id));
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.Role, ConditionOperator.Equal, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id));
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.Facility, ConditionOperator.Equal, facilityReference.Id));
                queryExpression.Criteria.AddFilter(filterExpression);

                LinkEntity requirementLinkEntity = new LinkEntity(Constants.BenefitingServiceRoleRequirements.LogicalName, Constants.Requirements.LogicalName, Constants.BenefitingServiceRoleRequirements.Requirement, Constants.Requirements.PrimaryKey, JoinOperator.Inner);
                requirementLinkEntity.EntityAlias = "R";
                requirementLinkEntity.LinkCriteria.AddCondition(new ConditionExpression(Constants.Status.StatusCode, ConditionOperator.Equal, 1));
                requirementLinkEntity.LinkCriteria.AddCondition(new ConditionExpression(Constants.Requirements.IsNewRequirement, ConditionOperator.NotEqual, true));
                queryExpression.LinkEntities.Add(requirementLinkEntity);

                queryExpression.TopCount = 1000;
                queryExpression.NoLock = true;

                EntityCollection bsrRequirementEntityCollection = service.RetrieveMultiple(queryExpression);
                tracingService.Trace($"BSR Requirement Count : {bsrRequirementEntityCollection.Entities.Count}...");

                Dictionary<Guid, EntityReference> RequirementDictionary = new Dictionary<Guid, EntityReference>();

                foreach (Entity bsrRequirementEntity in bsrRequirementEntityCollection.Entities)
                {
                    if (bsrRequirementEntity.Attributes.Contains(Constants.BenefitingServiceRoleRequirements.Requirement))
                    {
                        if (!RequirementDictionary.ContainsKey(bsrRequirementEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoleRequirements.Requirement).Id))
                            RequirementDictionary.Add(bsrRequirementEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoleRequirements.Requirement).Id, bsrRequirementEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoleRequirements.Requirement));
                    }
                }

                foreach (KeyValuePair<Guid, EntityReference> requirement in RequirementDictionary)
                {

                    Entity existingVolunteerRequirementEntity = existingLocalVolunteerRequirementCollection.Entities.Where(vr => vr.Attributes.Contains(Constants.VolunteerRequirements.RequirementID)
        && vr.GetAttributeValue<EntityReference>(Constants.VolunteerRequirements.RequirementID).Id.Equals(requirement.Key)).FirstOrDefault();
                    if (existingVolunteerRequirementEntity is Entity)
                    {
                        Entity requirementEntity = service.Retrieve(requirement.Value.LogicalName, requirement.Value.Id, new ColumnSet(Constants.Requirements.RequirementDateType));
                        tracingService.Trace($"Existing Vol. Requirement found. ");
                        if (requirementEntity.Attributes.Contains(Constants.Requirements.RequirementDateType) && requirementEntity.GetAttributeValue<OptionSetValue>(Constants.Requirements.RequirementDateType).Value == 100000004)
                        {
                            if (existingVolunteerRequirementEntity.Attributes.Contains(Constants.VolunteerRequirements.RequirementDate)
                                && existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate) < DateTime.Now)
                            {
                                tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date : {existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate)} is " +
                                    $"is less than Current Date : {DateTime.Now}. Marking Vol requirement as Not Met.");
                                Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                                tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                                tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                                tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(100000002);
                                service.Update(tmpvolreqEntity);
                            }
                            else
                            {
                                tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date not found. Marking Vol requirement as New.");
                                Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                                tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                                tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                                tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                                service.Update(tmpvolreqEntity);
                            }
                        }
                        else
                        {
                            tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} Set status to Active and New.");
                            Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                            tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                            tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                            tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                            service.Update(tmpvolreqEntity);
                        }
                    }
                    else
                    {
                        tracingService.Trace($"Existing Vol. Requirement NOT found. Creating New One...");
                        Entity volunteerRequirementEntity = new Entity(Constants.VolunteerRequirements.LogicalName);
                        volunteerRequirementEntity[Constants.VolunteerRequirements.VolunteerID] = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer);
                        volunteerRequirementEntity[Constants.VolunteerRequirements.RequirementID] = requirement.Value;
                        volunteerRequirementEntity[Constants.VolunteerRequirements.Name] = requirement.Value.Name;
                        volunteerRequirementEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                        volunteerRequirementEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                        service.Create(volunteerRequirementEntity);
                    }
                    //Entity volunteerRequirementEntity = new Entity(Constants.VolunteerRequirements.LogicalName);
                    //volunteerRequirementEntity[Constants.VolunteerRequirements.VolunteerID] = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer);
                    //volunteerRequirementEntity[Constants.VolunteerRequirements.RequirementID] = requirement.Value;
                    //volunteerRequirementEntity[Constants.VolunteerRequirements.Name] = requirement.Value.Name;

                    //service.Create(volunteerRequirementEntity);

                }
            }
        }


        private void CreateRoleTypeRequirement(ITracingService tracingService, IOrganizationService service, Entity volunteerAssignmentEntity, EntityCollection existingLocalVolunteerRequirementCollection)
        {
            tracingService.Trace($"In CreateRequirement method");
            tracingService.Trace($"Getting RoleType specific requirement");

            EntityReference facilityReference = null;
            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.RootFacility))
            {
                tracingService.Trace($"Root Facility Found : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility).Id}");
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.RootFacility);
            }
            else
                facilityReference = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility);

            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingServiceRoles))
            {
                tracingService.Trace($"Retrieving Role Type for Benefiting Service Role : {volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id} ");

                Entity benefitingServiceRoleEntity = service.Retrieve(volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).LogicalName, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id,
                    new ColumnSet(Constants.BenefitingServiceRoles.RoleType));
                if (benefitingServiceRoleEntity is Entity && benefitingServiceRoleEntity.Attributes.Contains(Constants.BenefitingServiceRoles.RoleType))
                {
                    QueryExpression queryExpression = new QueryExpression(Constants.Requirements.LogicalName);
                    queryExpression.ColumnSet = new ColumnSet(Constants.Requirements.PrimaryKey, Constants.Requirements.Name);

                    FilterExpression filterExpression = new FilterExpression(LogicalOperator.Or);

                    FilterExpression nationalFilterExpression = new FilterExpression(LogicalOperator.And);
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.RoleType, ConditionOperator.Equal, benefitingServiceRoleEntity.GetAttributeValue<OptionSetValue>(Constants.BenefitingServiceRoles.RoleType).Value));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000001));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StatusCode, ConditionOperator.Equal, 1));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000001));
                    nationalFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.IsNewRequirement, ConditionOperator.NotEqual, true));

                    filterExpression.AddFilter(nationalFilterExpression);

                    if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.Facility))
                    {
                        FilterExpression localFilterExpression = new FilterExpression(LogicalOperator.And);
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000000));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Type, ConditionOperator.Equal, 100000001));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.RoleType, ConditionOperator.Equal, benefitingServiceRoleEntity.GetAttributeValue<OptionSetValue>(Constants.BenefitingServiceRoles.RoleType).Value));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.Facility, ConditionOperator.Equal, facilityReference.Id));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Status.StatusCode, ConditionOperator.Equal, 1));
                        localFilterExpression.AddCondition(new ConditionExpression(Constants.Requirements.IsNewRequirement, ConditionOperator.NotEqual, true));

                        filterExpression.AddFilter(localFilterExpression);
                    }

                    queryExpression.Criteria.AddFilter(filterExpression);
                    queryExpression.TopCount = 1000;
                    queryExpression.NoLock = true;

                    EntityCollection requirementEntityCollection = service.RetrieveMultiple(queryExpression);
                    tracingService.Trace($"Requirement Count : {requirementEntityCollection.Entities.Count}...");
                    foreach (Entity requirementEntity in requirementEntityCollection.Entities)
                    {

                        Entity existingVolunteerRequirementEntity = existingLocalVolunteerRequirementCollection.Entities.Where(vr => vr.Attributes.Contains(Constants.VolunteerRequirements.RequirementID)
        && vr.GetAttributeValue<EntityReference>(Constants.VolunteerRequirements.RequirementID).Id.Equals(requirementEntity.Id)).FirstOrDefault();
                        if (existingVolunteerRequirementEntity is Entity)
                        {
                            tracingService.Trace($"Existing Vol. Requirement found. ");
                            if (requirementEntity.Attributes.Contains(Constants.Requirements.RequirementDateType) && requirementEntity.GetAttributeValue<OptionSetValue>(Constants.Requirements.RequirementDateType).Value == 100000004)
                            {
                                if (existingVolunteerRequirementEntity.Attributes.Contains(Constants.VolunteerRequirements.RequirementDate)
                                    && existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate) < DateTime.Now)
                                {
                                    tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date : {existingVolunteerRequirementEntity.GetAttributeValue<DateTime>(Constants.VolunteerRequirements.RequirementDate)} is " +
                                        $"is less than Current Date : {DateTime.Now}. Marking Vol requirement as Not Met.");
                                    Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                                    tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                                    tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                                    tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(100000002);
                                    service.Update(tmpvolreqEntity);
                                }
                                else
                                {
                                    tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} expiration Date not found. Marking Vol requirement as New.");
                                    Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                                    tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                                    tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                                    tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                                    service.Update(tmpvolreqEntity);
                                }
                            }
                            else
                            {
                                tracingService.Trace($"Existing Vol. Requirement : {existingVolunteerRequirementEntity.Id} Set status to Active and New.");
                                Entity tmpvolreqEntity = new Entity(existingVolunteerRequirementEntity.LogicalName);
                                tmpvolreqEntity.Id = existingVolunteerRequirementEntity.Id;
                                tmpvolreqEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                                tmpvolreqEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                                service.Update(tmpvolreqEntity);
                            }
                        }
                        else
                        {
                            tracingService.Trace($"Existing Vol. Requirement NOT found. Creating New One...");
                            Entity volunteerRequirementEntity = new Entity(Constants.VolunteerRequirements.LogicalName);
                            volunteerRequirementEntity[Constants.VolunteerRequirements.VolunteerID] = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer);
                            volunteerRequirementEntity[Constants.VolunteerRequirements.RequirementID] = requirementEntity.ToEntityReference();
                            volunteerRequirementEntity[Constants.VolunteerRequirements.Name] = requirementEntity.GetAttributeValue<string>(Constants.Requirements.Name);
                            volunteerRequirementEntity[Constants.Status.StatusCode] = new OptionSetValue(1);
                            volunteerRequirementEntity[Constants.Status.StateCode] = new OptionSetValue(0);
                            service.Create(volunteerRequirementEntity);
                        }

                        //Entity volunteerRequirementEntity = new Entity(Constants.VolunteerRequirements.LogicalName);
                        //volunteerRequirementEntity[Constants.VolunteerRequirements.VolunteerID] = volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer);
                        //volunteerRequirementEntity[Constants.VolunteerRequirements.RequirementID] = requirementEntity.ToEntityReference();
                        //volunteerRequirementEntity[Constants.VolunteerRequirements.Name] = requirementEntity.GetAttributeValue<string>(Constants.Requirements.Name);

                        //service.Create(volunteerRequirementEntity);
                    }

                }
            }
        }


    }
}
