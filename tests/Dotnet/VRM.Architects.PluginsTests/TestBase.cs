using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Extensions;
using Microsoft.Xrm.Sdk.PluginTelemetry;
using Moq;

namespace VRM.Architects.PluginsTests
{
    public abstract class TestBase
    {
        protected TestBase()
        {
            this.MockServiceProvider
                .Setup(x => x.GetService(typeof(ILogger)))
                .Returns(this.MockLogger.Object);
            this.MockServiceProvider
                .Setup(x => x.GetService(typeof(IPluginExecutionContext)))
                .Returns(this.MockPluginExecutionContext.Object);
            this.MockServiceProvider
                .Setup(x => x.GetService(typeof(IExecutionContext)))
                .Returns(this.MockExecutionContext.Object);
            this.MockServiceProvider
                .Setup(x => x.GetService(typeof(ITracingService)))
                .Returns(this.MockTracingService.Object);
            this.MockServiceProvider
                .Setup(x => x.GetService(typeof(IServiceEndpointNotificationService)))
                .Returns(this.MockNotificationService.Object);
            this.MockServiceProvider
                .Setup(x => x.GetService(typeof(IOrganizationServiceFactory)))
                .Returns(this.MockOrganizationServiceFactory.Object);

            this.MockExecutionContext
                .Setup(x => x.OperationCreatedOn)
                .Returns(this.OperationCreatedOn);

            this.MockOrganizationServiceFactory
                .Setup(x => x.CreateOrganizationService(this.MockPluginExecutionContext.Object.UserId))
                .Returns(this.MockOrganizationServicePluginUser.Object);
            this.MockOrganizationServiceFactory
                .Setup(x => x.CreateOrganizationService(this.MockPluginExecutionContext.Object.InitiatingUserId))
                .Returns(this.MockOrganizationServiceInitiatingUser.Object);

            this.MockPluginExecutionContext
                .Setup(x => x.UserId)
                .Returns(this.UserId);

            this.MockPluginExecutionContext
                .Setup(x => x.InitiatingUserId)
                .Returns(this.InitiatingUserId);
        }

        protected DateTime OperationCreatedOn { get; set; } = DateTime.Now;
        protected Mock<IServiceProvider> MockServiceProvider { get; } = new Mock<IServiceProvider>();
        protected Mock<IPluginExecutionContext> MockPluginExecutionContext { get; } = new Mock<IPluginExecutionContext>();
        protected Mock<IOrganizationServiceFactory> MockOrganizationServiceFactory { get; } = new Mock<IOrganizationServiceFactory>();
        protected Mock<IExecutionContext> MockExecutionContext { get; } = new Mock<IExecutionContext>();
        protected Mock<IOrganizationService> MockOrganizationServiceInitiatingUser { get; } = new Mock<IOrganizationService>();
        protected Mock<IOrganizationService> MockOrganizationServicePluginUser { get; } = new Mock<IOrganizationService>();
        protected Mock<ITracingService> MockTracingService { get; } = new Mock<ITracingService>();
        protected Mock<IServiceEndpointNotificationService> MockNotificationService = new Mock<IServiceEndpointNotificationService>();
        protected Mock<ILogger> MockLogger { get; } = new Mock<ILogger>();

        protected Guid UserId { get; } = Guid.NewGuid();
        protected Guid InitiatingUserId { get; } = Guid.NewGuid();
    }
}
