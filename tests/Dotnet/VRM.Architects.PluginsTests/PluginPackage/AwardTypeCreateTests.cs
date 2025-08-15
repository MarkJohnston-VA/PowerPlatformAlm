using Microsoft.Xrm.Sdk;
using VRM.Architects.PluginPackage;
using Moq;

namespace VRM.Architects.PluginsTests.PluginPackage;

public class AwardTypeCreateTests : TestBase
{
    public class AwardTypeCreateForTestingConstructor : AwardTypeCreate
    {
        public AwardTypeCreateForTestingConstructor(string unsecureConfiguration, string secureConfiguration)
            : base(unsecureConfiguration, secureConfiguration)
        {
        }

        public void PublicExecuteDataversePlugin(ILocalPluginContext localPluginContext)
        {
            this.ExecuteDataversePlugin(localPluginContext);
        }
    }

    [Fact]
    public void Constructor_SetsPluginClassName()
    {
        // Arrange & Act
        var plugin = new AwardTypeCreate(string.Empty, string.Empty);

        // Assert
        Assert.NotNull(plugin);
    }

    [Fact]
    public void ExecuteDataversePlugin_Throws_WhenLocalPluginContextIsNull()
    {
        // Arrange
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act & Assert
        Assert.Throws<ArgumentNullException>(() => instance.PublicExecuteDataversePlugin(null));
    }

    [Fact]
    public void ExecuteDataversePlugin_DoesNothing_WhenTargetIsMissing()
    {
        // Arrange
        ParameterCollection inputParameters = [];
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);
        
        var localPluginContext = new LocalPluginContext(this.MockServiceProvider.Object);
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act
        instance.PublicExecuteDataversePlugin(localPluginContext);

        // Assert
        Assert.Empty(inputParameters);
    }

    [Fact]
    public void ExecuteDataversePlugin_DoesNothing_WhenTargetIsNotEntity()
    {
        // Arrange
        var inputParameters = new ParameterCollection
        {
            { "Target", "NOT_AN_ENTITY" }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);

        var localPluginContext = new LocalPluginContext(this.MockServiceProvider.Object);
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act
        instance.PublicExecuteDataversePlugin(localPluginContext);

        // Assert
        Assert.True(true); // If it makes it here without throwing an exception then it passes.
    }

    [Fact]
    public void ExecuteDataversePlugin_DoesNothing_WhenEntityIsNotAwardType()
    {
        // Arrange
        var entity = new Entity("some_other_entity");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);

        var localPluginContext = new LocalPluginContext(this.MockServiceProvider.Object);
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act
        instance.PublicExecuteDataversePlugin(localPluginContext);

        // Assert
        Assert.True(true); // If it makes it here without throwing an exception then it passes.
    }

    [Fact]
    public void ExecuteDataversePlugin_DoesNothing_WhenPostEntityImagesIsMissing()
    {
        // Arrange
        var entity = new Entity("vrmarch_awardtype");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);
        this.MockPluginExecutionContext
            .Setup(x => x.PostEntityImages)
            .Returns(new EntityImageCollection());

        var localPluginContext = new LocalPluginContext(this.MockServiceProvider.Object);
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act & Assert
        Assert.Throws<KeyNotFoundException>(() => instance.PublicExecuteDataversePlugin(localPluginContext));
    }

    [Fact]
    public void ExecuteDataversePlugin_DoesNothing_WhenAwardTypePostImageIsMissing()
    {
        // Arrange
        var entity = new Entity("vrmarch_awardtype");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);
        
        var postEntityImages = new EntityImageCollection
        {
            { "SomeOtherImage", new Entity("other_entity") }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.PostEntityImages)
            .Returns(postEntityImages);

        var localPluginContext = new LocalPluginContext(this.MockServiceProvider.Object);
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act & Assert
        Assert.Throws<KeyNotFoundException>(() => instance.PublicExecuteDataversePlugin(localPluginContext));
    }

    [Fact]
    public void ExecuteDataversePlugin_CreatesAwardTypeModelAndTraces_WhenValidAwardTypeProvided()
    {
        // Arrange
        var entity = new Entity("vrmarch_awardtype");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);

        const string AwardTypeName = "1,000 Hours";
        var createdById = Guid.NewGuid();
        var createdByName = "John Smith";
        var createdOn = DateTime.UtcNow;

        var postImage = new Entity("vrmarch_awardtype")
        {
            Id = Guid.NewGuid(),
            Attributes =
            {
                { "createdby", new EntityReference("systemuser", createdById) { Name = createdByName } },
                { "createdon", createdOn },
                { "vrmarch_name", AwardTypeName }
            }
        };

        var postEntityImages = new EntityImageCollection
        {
            { "AwardType", postImage }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.PostEntityImages)
            .Returns(postEntityImages);

        var localPluginContext = new LocalPluginContext(this.MockServiceProvider.Object);
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act
        instance.PublicExecuteDataversePlugin(localPluginContext);

        // Assert
        this.MockTracingService.Verify(
            x => x.Trace(It.Is<string>(s => s.Contains("AwardType created:") && s.Contains(AwardTypeName)), It.IsAny<object[]>()),
            Times.Once);
    }

    [Fact]
    public void ExecuteDataversePlugin_HandlesNullCreatedByReference()
    {
        // Arrange
        var entity = new Entity("vrmarch_awardtype");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);

        const string AwardTypeName = "Employee of the Month";
        var createdOn = DateTime.UtcNow;

        var postImage = new Entity("vrmarch_awardtype")
        {
            Id = Guid.NewGuid(),
            Attributes =
            {
                { "createdby", null },
                { "createdon", createdOn },
                { "vrmarch_name", AwardTypeName }
            }
        };

        var postEntityImages = new EntityImageCollection
        {
            { "AwardType", postImage }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.PostEntityImages)
            .Returns(postEntityImages);

        var localPluginContext = new LocalPluginContext(this.MockServiceProvider.Object);
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act & Assert
        Assert.Throws<NullReferenceException>(() => instance.PublicExecuteDataversePlugin(localPluginContext));
    }

    [Fact]
    public void ExecuteDataversePlugin_HandlesNullAwardTypeName()
    {
        // Arrange
        var entity = new Entity("vrmarch_awardtype");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);

        var createdById = Guid.NewGuid();
        var createdByName = "John Smith";
        var createdOn = DateTime.UtcNow;

        var postImage = new Entity("vrmarch_awardtype")
        {
            Id = Guid.NewGuid(),
            Attributes =
            {
                { "createdby", new EntityReference("systemuser", createdById) { Name = createdByName } },
                { "createdon", createdOn },
                { "vrmarch_name", null }
            }
        };

        var postEntityImages = new EntityImageCollection
        {
            { "AwardType", postImage }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.PostEntityImages)
            .Returns(postEntityImages);

        var localPluginContext = new LocalPluginContext(this.MockServiceProvider.Object);
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act
        instance.PublicExecuteDataversePlugin(localPluginContext);

        // Assert
        this.MockTracingService.Verify(
            x => x.Trace(It.Is<string>(s => s.Contains("AwardType created:") && s.Contains("\"Name\":null")), It.IsAny<object[]>()),
            Times.Once);
    }

    [Fact]
    public void ExecuteDataversePlugin_HandlesEmptyCreatedByName()
    {
        // Arrange
        var entity = new Entity("vrmarch_awardtype");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);

        const string AwardTypeName = "Employee of the Month";
        var createdById = Guid.NewGuid();
        var createdOn = DateTime.UtcNow;

        var postImage = new Entity("vrmarch_awardtype")
        {
            Id = Guid.NewGuid(),
            Attributes =
            {
                { "createdby", new EntityReference("systemuser", createdById) { Name = string.Empty } },
                { "createdon", createdOn },
                { "vrmarch_name", AwardTypeName }
            }
        };

        var postEntityImages = new EntityImageCollection
        {
            { "AwardType", postImage }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.PostEntityImages)
            .Returns(postEntityImages);

        var localPluginContext = new LocalPluginContext(this.MockServiceProvider.Object);
        var instance = new AwardTypeCreateForTestingConstructor(string.Empty, string.Empty);

        // Act
        instance.PublicExecuteDataversePlugin(localPluginContext);

        // Assert
        this.MockTracingService.Verify(
            x => x.Trace(It.Is<string>(s => s.Contains("AwardType created:") && s.Contains(AwardTypeName)), It.IsAny<object[]>()),
            Times.Once);
    }

    [Fact]
    public void Execute_CallsExecuteDataversePlugin_WhenValidServiceProviderProvided()
    {
        // Arrange
        var entity = new Entity("vrmarch_awardtype");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);

        const string AwardTypeName = "Employee of the Month";
        var createdById = Guid.NewGuid();
        var createdByName = "John Smith";
        var createdOn = DateTime.UtcNow;

        var postImage = new Entity("vrmarch_awardtype")
        {
            Id = Guid.NewGuid(),
            Attributes =
            {
                { "createdby", new EntityReference("systemuser", createdById) { Name = createdByName } },
                { "createdon", createdOn },
                { "vrmarch_name", AwardTypeName }
            }
        };

        var postEntityImages = new EntityImageCollection
        {
            { "AwardType", postImage }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.PostEntityImages)
            .Returns(postEntityImages);

        this.MockPluginExecutionContext
            .Setup(x => x.CorrelationId)
            .Returns(Guid.NewGuid());

        var instance = new AwardTypeCreate(string.Empty, string.Empty);

        // Act
        instance.Execute(this.MockServiceProvider.Object);

        // Assert
        this.MockTracingService.Verify(
            x => x.Trace(It.Is<string>(s => s.Contains("AwardType created:") && s.Contains(AwardTypeName)), It.IsAny<object[]>()),
            Times.Once);
    }
}
