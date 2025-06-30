using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CDCEP.D365.PlugIns
{
    public class CommonMethods
    {

        public static int? RetrieveCurrentUsersTimeZoneSettings(IOrganizationService service)

        {

            var currentUserSettings = service.RetrieveMultiple(

            new QueryExpression("usersettings")

            {

                ColumnSet = new ColumnSet("localeid", "timezonecode"),

                Criteria = new FilterExpression

                {

                    Conditions =

               {

            new ConditionExpression("systemuserid", ConditionOperator.EqualUserId)

               }

                }

            }).Entities[0];

            return (int?)currentUserSettings.Attributes["timezonecode"];

        }

        public static DateTime? RetrieveLocalTimeFromUTCTime(IOrganizationService _serviceProxy, DateTime utcTime, int? _timeZoneCode)

        {

            if (!_timeZoneCode.HasValue)

                return utcTime;



            var request = new LocalTimeFromUtcTimeRequest

            {

                TimeZoneCode = _timeZoneCode.Value,

                UtcTime = utcTime.ToUniversalTime()

            };



            var response = (LocalTimeFromUtcTimeResponse)_serviceProxy.Execute(request);

            return response.LocalTime;

        }

        public static string RetrieveFacilityStationNumber(ITracingService tracingService, IOrganizationService service, EntityReference facilityEntityReference)
        {
            tracingService.Trace($"Retrieving StationNumber for Facility : {facilityEntityReference.Id}");

            Entity facilityEntity = service.Retrieve(facilityEntityReference.LogicalName, facilityEntityReference.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet(Constants.Account.Name, Constants.Account.Accountnumber));
            if(facilityEntity is Entity)
            {
                if (facilityEntity.Attributes.Contains(Constants.Account.Accountnumber))
                {
                    tracingService.Trace($"Station Number Found : {facilityEntity.GetAttributeValue<string>(Constants.Account.Accountnumber)}");
                    return facilityEntity.GetAttributeValue<string>(Constants.Account.Accountnumber);
                }
                else
                {
                    tracingService.Trace($"Station Number Not Found...");
                    return string.Empty;
                }
            }
            else
            {
                tracingService.Trace($"Facility Not Found...");
                return string.Empty;
            }
        }

        public static string RetrieveAccountName(ITracingService tracingService, IOrganizationService service, EntityReference accountEntityReference)
        {
            tracingService.Trace($"Retrieving Name for Account : {accountEntityReference.Id}");

            Entity accountEntity = service.Retrieve(accountEntityReference.LogicalName, accountEntityReference.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet(Constants.Account.Name));
            if (accountEntity is Entity)
            {
                if (accountEntity.Attributes.Contains(Constants.Account.Name))
                {
                    tracingService.Trace($"Account Found : {accountEntity.GetAttributeValue<string>(Constants.Account.Name)}");
                    return accountEntity.GetAttributeValue<string>(Constants.Account.Name);
                }
                else
                {
                    tracingService.Trace($"Account Not Found...");
                    return string.Empty;
                }
            }
            else
            {
                tracingService.Trace($"Account Not Found...");
                return string.Empty;
            }
        }


        public static string RetrieveBenefitingServiceRoleName(ITracingService tracingService, IOrganizationService service, EntityReference benefitingServiceRoleEntityReference)
        {
            tracingService.Trace($"Retrieving BSR Name for BSR : {benefitingServiceRoleEntityReference.Id}");

            Entity bsrEntity = service.Retrieve(benefitingServiceRoleEntityReference.LogicalName, benefitingServiceRoleEntityReference.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet(Constants.BenefitingServiceRoles.Name));
            if (bsrEntity is Entity)
            {
                if (bsrEntity.Attributes.Contains(Constants.BenefitingServiceRoles.Name))
                {
                    tracingService.Trace($"BSR Found : {bsrEntity.GetAttributeValue<string>(Constants.BenefitingServiceRoles.Name)}");
                    return bsrEntity.GetAttributeValue<string>(Constants.BenefitingServiceRoles.Name);
                }
                else
                {
                    tracingService.Trace($"BSR Not Found...");
                    return string.Empty;
                }
            }
            else
            {
                tracingService.Trace($"BSR Not Found...");
                return string.Empty;
            }
        }

        /// <summary>
        /// Retrieve Facility Name and Station Number in Facility (StationNumber)
        /// </summary>
        /// <param name="tracingService"></param>
        /// <param name="service"></param>
        /// <param name="facilityEntityReference"></param>
        /// <returns></returns>
        public static string RetrieveFacilityWithNameAndStationNumber(ITracingService tracingService, IOrganizationService service, EntityReference facilityEntityReference)
        {
            tracingService.Trace($"Retrieving StationNumber for Facility : {facilityEntityReference.Id}");

            Entity facilityEntity = service.Retrieve(facilityEntityReference.LogicalName, facilityEntityReference.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet(Constants.Account.Name, Constants.Account.Accountnumber));
            if (facilityEntity is Entity)
            {
                if (facilityEntity.Attributes.Contains(Constants.Account.Name) && facilityEntity.Attributes.Contains(Constants.Account.Accountnumber))
                {
                    tracingService.Trace($"Station Number Found : {facilityEntity.GetAttributeValue<string>(Constants.Account.Name)} ({facilityEntity.GetAttributeValue<string>(Constants.Account.Accountnumber)})");
                    return $"{facilityEntity.GetAttributeValue<string>(Constants.Account.Name)} ({facilityEntity.GetAttributeValue<string>(Constants.Account.Accountnumber)})";
                }
                else
                {
                    tracingService.Trace($"Station Number Not Found...");
                    return string.Empty;
                }
            }
            else
            {
                tracingService.Trace($"Facility Not Found...");
                return string.Empty;
            }
        }

        public static Entity RetrieveWorkerbyContact(ITracingService tracingService, IOrganizationService service, EntityReference contactEntityReference)
        {
            tracingService.Trace($"Calling RetrieveWorkerbyContact...");
            QueryExpression query = new QueryExpression
            {
                EntityName = Constants.Workers.LogicalName,
                ColumnSet = new ColumnSet(true),
                Criteria = new FilterExpression
                {
                    Conditions =
                            {

                                new ConditionExpression
                                {
                                    AttributeName = Constants.Workers.Contact,
                                    Operator = ConditionOperator.Equal,
                                    Values = { contactEntityReference.Id }
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
                TopCount = 1
            };

            EntityCollection workerEntityCollection = service.RetrieveMultiple(query);
            if (workerEntityCollection.Entities.Count > 0)
                return workerEntityCollection.Entities[0];
            else
                return null;
        }

        public static string GetoptionsetText(IOrganizationService service, string entityName, string attributeName, int optionSetValue)
        {
            RetrieveAttributeRequest retrieveAttributeRequest = new
                RetrieveAttributeRequest
            {
                EntityLogicalName = entityName,
                LogicalName = attributeName,
                RetrieveAsIfPublished = true
            };
            // Execute the request.
            RetrieveAttributeResponse retrieveAttributeResponse = (RetrieveAttributeResponse)service.Execute(retrieveAttributeRequest);
            // Access the retrieved attribute.
            Microsoft.Xrm.Sdk.Metadata.PicklistAttributeMetadata retrievedPicklistAttributeMetadata = (Microsoft.Xrm.Sdk.Metadata.PicklistAttributeMetadata)
            retrieveAttributeResponse.AttributeMetadata;// Get the current options list for the retrieved attribute.

            IList<OptionMetadata> OptionsList = (from o in retrievedPicklistAttributeMetadata.OptionSet.Options
                                                 where o.Value.Value == optionSetValue
                                                 select o).ToList();
            return (OptionsList.First()).Label.UserLocalizedLabel.Label;
        }

        /// <summary>
        /// Share Record to Team Or User
        /// </summary>
        /// <param name="trace">Object of ITracingService</param>
        /// <param name="service">Object of IOrganizationService</param>
        /// <param name="teamoruserEntityReference">Team/User EntityReference</param>
        /// <param name="entity">object of Entity</param>
        /// <param name="accessRight">AccessRight</param>
        /// <returns>returns true if successfully assign or else false.</returns>
        public static bool ShareRecordToTeamOrUser(ITracingService trace, IOrganizationService service, EntityReference teamoruserEntityReference, EntityReference targetEntityReference, AccessRights accessRight)
        {
            //Retrieve Team Record from Team Name...
            if (targetEntityReference is EntityReference)
            {
                GrantAccessRequest grantAccessRequest = new GrantAccessRequest()
                {
                    PrincipalAccess = new PrincipalAccess()
                    {
                        Principal = new EntityReference() { LogicalName = teamoruserEntityReference.LogicalName, Id = teamoruserEntityReference.Id },
                        AccessMask = accessRight
                    },
                    Target = targetEntityReference
                };
                try
                {
                    service.Execute(grantAccessRequest);
                    return true;
                }
                catch (InvalidPluginExecutionException ex)
                {
                    trace.Trace("ShareRecordToTeam : " + ex.Message);
                    return false;
                }
                catch (Exception ex)
                {
                    trace.Trace("ShareRecordToTeam : " + ex.Message);
                    return false;
                }
            }
            return false;
        }


        /// <summary>
        /// Revoke Access of Sharing record to a Team/User
        /// </summary>
        /// <param name="trace">Object of ITracingService</param>
        /// <param name="service">Object of IOrganizationService</param>
        /// <param name="teamoruserEntityReference">Team/User EntityReference</param>
        /// <param name="entity">Entity</param>
        /// <returns>Return true if successfully revoked</returns>
        public static bool RevokeRecordToTeamOrUser(ITracingService trace, IOrganizationService service, EntityReference teamoruserEntityReference, EntityReference targetEntityReference)
        {
            //Retrieve Team Record from Team Name...
            if (targetEntityReference is EntityReference)
            {
                RevokeAccessRequest revokeAccessRight = new RevokeAccessRequest()
                {
                    Revokee = new EntityReference() { LogicalName = teamoruserEntityReference.LogicalName, Id = teamoruserEntityReference.Id },
                    Target = targetEntityReference
                };
                try
                {
                    RevokeAccessResponse res = (RevokeAccessResponse)service.Execute(revokeAccessRight);
                    return true;
                }
                catch (InvalidPluginExecutionException ex)
                {
                    trace.Trace("RevokeRecordToTeam : " + ex.Message);
                }
                catch (Exception ex)
                {
                    trace.Trace("RevokeRecordToTeam : " + ex.Message);
                }
            }
            return false;
        }

    }
}
