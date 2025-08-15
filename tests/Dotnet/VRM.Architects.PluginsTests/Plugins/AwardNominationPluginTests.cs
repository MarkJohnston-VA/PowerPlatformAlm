using Microsoft.Xrm.Sdk;
using VRM.Architects.Plugins;

namespace VRM.Architects.PluginsTests.Plugins;

public class AwardNominationPluginTests : TestBase
{
    public class AwardNominationPluginForTestingConstructor: AwardNominationPlugin
    {
        public AwardNominationPluginForTestingConstructor(string unsecureConfiguration, string secureConfiguration)
            : base(unsecureConfiguration, secureConfiguration)
        {
        }

        public void PublicExecuteDataversePlugin()
        {
            this.ExecuteDataversePlugin(null);
        }
    }

    [Fact]
    public void ExecuteDataversePlugin_Throws_WhenLocalPluginContextIsNull()
    {
        //Arrange
        var instance = new AwardNominationPluginForTestingConstructor(string.Empty, string.Empty);

        //Act / Assert
        Assert.Throws<ArgumentNullException>(() => instance.PublicExecuteDataversePlugin());
    }

    [Fact]
    public void ExecuteDataversePlugin_DoesNothing_WhenTargetIsMissing()
    {
        //Arrange
        ParameterCollection inputParameters = [];
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);
        var instance = new AwardNominationPlugin(string.Empty, string.Empty);

        //Act
        instance.Execute(this.MockServiceProvider.Object);

        //Assert
        Assert.Empty(inputParameters);
    }

    [Fact]
    public void ExecuteDataversePlugin_DoesNothing_WhenTargetIsNotEntity()
    {
        //Arrange
        var inputParameters = new ParameterCollection
        {
            { "Target", "NOT_AN_ENTITY" }
            //{ "Target", new Entity("vrmarch_awardnomination")  }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);
        var instance = new AwardNominationPlugin(string.Empty, string.Empty);

        //Act
        instance.Execute(this.MockServiceProvider.Object);

        //Assert
        Assert.True(true); //If it makes it here without throwing an exception then it passes.
    }

    [Fact]
    public void ExecuteDataversePlugin_DoesNothing_WhenEntityIsNotAwardNomination()
    {
        //Arrange
        var entity = new Entity("some_other_entity");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);
        var preEntityImages = new EntityImageCollection
        {
            { "AwardNomination", null }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.PreEntityImages)
            .Returns(preEntityImages);
        var instance = new AwardNominationPlugin(string.Empty, string.Empty);

        //Act
        instance.Execute(this.MockServiceProvider.Object);

        //Assert
        Assert.True(true); //If it makes it here without throwing an exception then it passes.
    }

    [Fact]
    public void ExecuteDataversePlugin_AssignsNewNameToEntity()
    {
        //Arrange
        var entity = new Entity("vrmarch_awardnomination");
        var inputParameters = new ParameterCollection
        {
            { "Target", entity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.InputParameters)
            .Returns(inputParameters);

        const string AwardTypeName = "1,000 Hours";
        const string NomineeName = "John Doe";
        var preEntity = new Entity("vrmarch_awardnomination")
        {
            Attributes =
            {
                { "vrmarch_awardtype", new EntityReference("vrmarch_awardtype", Guid.NewGuid()) { Name = AwardTypeName } },
                { "vrmarch_nominee", new EntityReference("contact", Guid.NewGuid()) { Name = NomineeName } }
            }
        };
        var preEntityImages = new EntityImageCollection
        {
            { "AwardNomination", preEntity }
        };
        this.MockPluginExecutionContext
            .Setup(x => x.PreEntityImages)
            .Returns(preEntityImages);
        var instance = new AwardNominationPlugin(string.Empty, string.Empty);

        //Act
        instance.Execute(this.MockServiceProvider.Object);

        //Assert
        Assert.Equal($"Award Nomination - {AwardTypeName} for {NomineeName}", entity["vrmarch_name"]);
    }
}