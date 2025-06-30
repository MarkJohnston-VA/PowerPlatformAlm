using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace CDCEP.D365.PlugIns
{
    /// <summary>
    /// Plugin is used to populate Name and another field from Available Assignment.
    /// Message : Create
    /// Primary Entity : cdcep_volunteerassignment
    /// Secondary Entity : none
    /// Filtering Attributes : none
    /// Run in User's Context : Calling User
    /// Execution Order : 1
    /// Event Pipeline : PreOperation
    /// Execution Mode : Sync
    /// </summary>
    public class VolunteerAssignmentOnCreate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
            IOrganizationService system_service = serviceFactory.CreateOrganizationService(null);

            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace($"Context Depth : {context.Depth}");
            tracingService.Trace($"Context Message : {context.MessageName}");

            Entity targetEntity = null;

            if (!context.InputParameters.Contains(Constants.TARGET)) { return; }

            tracingService.Trace($"Target Logical Name : {(context.InputParameters[Constants.TARGET] as Entity).LogicalName}");

            if (!(context.InputParameters[Constants.TARGET] is Entity) && (context.InputParameters[Constants.TARGET] as Entity).LogicalName != Constants.VolunteerAssignment.LogicalName)
                return;
            else
                targetEntity = context.InputParameters[Constants.TARGET] as Entity;

            if (targetEntity is Entity && context.MessageName == Constants.Messages.Create)
            {
                if (targetEntity.Attributes.Contains(Constants.VolunteerAssignment.AvailableAssignment))
                {
                    tracingService.Trace($"Available assignment : {targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.AvailableAssignment).Id}");
                    Entity assignmentEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.AvailableAssignment).LogicalName,
                        targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.AvailableAssignment).Id,
                        new ColumnSet(true));
                    if (assignmentEntity is Entity)
                    {
                        tracingService.Trace($"Mapping BS");
                        if (assignmentEntity.Attributes.Contains(Constants.AvailableAssignment.BenefitingService))
                            targetEntity[Constants.VolunteerAssignment.BenefitingService] = assignmentEntity.GetAttributeValue<EntityReference>(Constants.AvailableAssignment.BenefitingService);

                        tracingService.Trace($"Mapping BSR");
                        if (assignmentEntity.Attributes.Contains(Constants.AvailableAssignment.BenefitingServiceRoles))
                            targetEntity[Constants.VolunteerAssignment.BenefitingServiceRoles] = assignmentEntity.GetAttributeValue<EntityReference>(Constants.AvailableAssignment.BenefitingServiceRoles);

                        tracingService.Trace($"Mapping Facility");
                        if (assignmentEntity.Attributes.Contains(Constants.AvailableAssignment.Facility))
                            targetEntity[Constants.VolunteerAssignment.Facility] = assignmentEntity.GetAttributeValue<EntityReference>(Constants.AvailableAssignment.Facility);

                        tracingService.Trace($"Mapping Scope");
                        if (assignmentEntity.Attributes.Contains(Constants.AvailableAssignment.Scope))
                            targetEntity[Constants.VolunteerAssignment.Scope] = assignmentEntity.GetAttributeValue<OptionSetValue>(Constants.AvailableAssignment.Scope);

                        tracingService.Trace($"Mapping Start Date");
                        if (assignmentEntity.Attributes.Contains(Constants.AvailableAssignment.StartDate))
                            targetEntity[Constants.VolunteerAssignment.StartDate] = assignmentEntity.GetAttributeValue<DateTime>(Constants.AvailableAssignment.StartDate);

                        tracingService.Trace($"Mapping End Date");
                        if (assignmentEntity.Attributes.Contains(Constants.AvailableAssignment.EndDate))
                            targetEntity[Constants.VolunteerAssignment.EndDate] = assignmentEntity.GetAttributeValue<DateTime>(Constants.AvailableAssignment.EndDate);

                        targetEntity[Constants.Status.StatusCode] = new OptionSetValue(100000000);
                    }
                }
                else
                {
                    targetEntity[Constants.Status.StatusCode] = new OptionSetValue(100000001);
                }
                string Name = string.Empty;
                //if (targetEntity.Attributes.Contains(Constants.VolunteerAssignment.Facility))
                //{
                //    Name = CommonMethods.RetrieveAccountName(tracingService, service, targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility));
                //}

                if (targetEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingServiceRoles))
                {
                    Entity bsrEntity = service.Retrieve(targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).LogicalName,
                        targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id,
                        new ColumnSet(Constants.BenefitingServiceRoles.Name, Constants.BenefitingServiceRoles.Scope, Constants.BenefitingServiceRoles.BenefitingServiceID));
                    if (bsrEntity is Entity)
                    {
                        if (bsrEntity.Attributes.Contains(Constants.BenefitingServiceRoles.Scope))
                        {
                            if (bsrEntity.GetAttributeValue<OptionSetValue>(Constants.BenefitingServiceRoles.Scope).Value == 100000000)
                            {
                                tracingService.Trace($"It's local role.");
                                if (bsrEntity.Attributes.Contains(Constants.BenefitingServiceRoles.BenefitingServiceID) && bsrEntity.Attributes.Contains(Constants.BenefitingServiceRoles.Name))
                                {
                                    tracingService.Trace($"BS Name : {bsrEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoles.BenefitingServiceID).Name}");
                                    tracingService.Trace($"BSR Name : {bsrEntity.GetAttributeValue<string>(Constants.BenefitingServiceRoles.Name)}");
                                    if (!bsrEntity.GetAttributeValue<string>(Constants.BenefitingServiceRoles.Name).ToLower().Contains(bsrEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoles.BenefitingServiceID).Name.ToLower().Trim()))
                                        Name = $"{bsrEntity.GetAttributeValue<EntityReference>(Constants.BenefitingServiceRoles.BenefitingServiceID).Name} - {bsrEntity.GetAttributeValue<string>(Constants.BenefitingServiceRoles.Name)}";
                                    else
                                        Name = bsrEntity.GetAttributeValue<string>(Constants.BenefitingServiceRoles.Name);
                                }
                            }
                            else
                            {
                                tracingService.Trace($"It's National role.");
                                Name = bsrEntity.GetAttributeValue<string>(Constants.BenefitingServiceRoles.Name);
                            }
                        }
                    }

                }
                tracingService.Trace($"Mapping Name : {Name}");
                if (!string.IsNullOrEmpty(Name))
                    targetEntity[Constants.VolunteerAssignment.Name] = Name;

                tracingService.Trace($"Retrieving Existing Requirement...");
                EntityCollection existingLocalVolunteerRequirementCollection = RetrieveVolunteerRequirement(tracingService, service, targetEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Volunteer));

                CreateAllVolunteersRequirements(tracingService, system_service, targetEntity, existingLocalVolunteerRequirementCollection);
                CreateRoleTypeRequirement(tracingService, system_service, targetEntity, existingLocalVolunteerRequirementCollection);
                CreateRoleSpecificRequirement(tracingService, system_service, targetEntity, existingLocalVolunteerRequirementCollection);
            }
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



            if (volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingService) && volunteerAssignmentEntity.Attributes.Contains(Constants.VolunteerAssignment.BenefitingServiceRoles))
            {

                QueryExpression queryExpression = new QueryExpression(Constants.BenefitingServiceRoleRequirements.LogicalName);
                queryExpression.ColumnSet = new ColumnSet(Constants.BenefitingServiceRoleRequirements.PrimaryKey, Constants.BenefitingServiceRoleRequirements.Requirement);

                FilterExpression filterExpression = new FilterExpression(LogicalOperator.And);
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.BenefitingService, ConditionOperator.Equal, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingService).Id));
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.Role, ConditionOperator.Equal, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.BenefitingServiceRoles).Id));
                filterExpression.AddCondition(new ConditionExpression(Constants.BenefitingServiceRoleRequirements.Facility, ConditionOperator.Equal, volunteerAssignmentEntity.GetAttributeValue<EntityReference>(Constants.VolunteerAssignment.Facility).Id));
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

        private EntityCollection RetrieveVolunteerRequirement(ITracingService tracingService, IOrganizationService service, EntityReference volunteerEntityReference)
        {
            tracingService.Trace($"Calling RetrieveVolunteerRequirement...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.VolunteerRequirements.LogicalName,
                ColumnSet = new ColumnSet(Constants.VolunteerRequirements.RequirementID, Constants.VolunteerRequirements.PrimaryKey, Constants.VolunteerRequirements.VolunteerID, Constants.VolunteerRequirements.RequirementDate, Constants.Status.StateCode),
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
            //reqLinkEntity.LinkCriteria.AddCondition(new ConditionExpression(Constants.Requirements.Scope, ConditionOperator.Equal, 100000000));
            query.LinkEntities.Add(reqLinkEntity);

            return service.RetrieveMultiple(query);

        }
    }
}
