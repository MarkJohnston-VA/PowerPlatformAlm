const { CDCEP } = require('../../../../power-platform/WebResources/scripts/cdcep_DonationReference_QuickCreate.js');

// Mock the validateQuickCreate function since it's defined in cdcep_CommonValidation.js

describe('CDCEP Donation Reference Quick Create', () => {
  let mockExecutionContext;
  let mockFormContext;
  let validateQuickCreateSpy;

  beforeEach(() => {
    // Mock the global validateQuickCreate function
    validateQuickCreateSpy = jasmine.createSpy('validateQuickCreate');
    global.validateQuickCreate = validateQuickCreateSpy;

    // Mock the form context
    mockFormContext = {
      ui: {
        getFormType: jasmine.createSpy('getFormType'),
        close: jasmine.createSpy('close')
      },
      getAttribute: jasmine.createSpy('getAttribute')
    };

    // Mock the execution context
    mockExecutionContext = {
      getFormContext: jasmine.createSpy('getFormContext').and.returnValue(mockFormContext)
    };
  });

  afterEach(() => {
    // Clean up global mocks
    delete global.validateQuickCreate;
  });

  describe('OnLoad', () => {
    it('should call validateQuickCreate with correct parameters', () => {
      // Arrange
      const expectedRequiredFields = ["cdcep_facilityid"];
      const expectedErrorTitle = "Option not available";
      const expectedErrorMessage = "Option is not available through this menu selection";

      // Act
      CDCEP.DonationReferenceQuickCreate.OnLoad(mockExecutionContext);

      // Assert
      expect(validateQuickCreateSpy).toHaveBeenCalledWith(
        mockExecutionContext,
        expectedRequiredFields,
        expectedErrorTitle,
        expectedErrorMessage
      );
      expect(validateQuickCreateSpy).toHaveBeenCalledTimes(1);
    });

    it('should pass the execution context to validateQuickCreate', () => {
      // Arrange & Act
      CDCEP.DonationReferenceQuickCreate.OnLoad(mockExecutionContext);

      // Assert
      expect(validateQuickCreateSpy).toHaveBeenCalledWith(
        mockExecutionContext,
        jasmine.any(Array),
        jasmine.any(String),
        jasmine.any(String)
      );
    });

    it('should validate that cdcep_facilityid is required', () => {
      // Arrange & Act
      CDCEP.DonationReferenceQuickCreate.OnLoad(mockExecutionContext);

      // Assert
      const calledArgs = validateQuickCreateSpy.calls.argsFor(0);
      expect(calledArgs[1]).toEqual(["cdcep_facilityid"]);
    });

    it('should use the correct error title and message', () => {
      // Arrange & Act
      CDCEP.DonationReferenceQuickCreate.OnLoad(mockExecutionContext);

      // Assert
      const calledArgs = validateQuickCreateSpy.calls.argsFor(0);
      expect(calledArgs[2]).toBe("Option not available");
      expect(calledArgs[3]).toBe("Option is not available through this menu selection");
    });

   
  });

  describe('CDCEP.DonationReferenceQuickCreate namespace', () => {
    it('should exist and be properly structured', () => {
      // Assert
      expect(CDCEP).toBeDefined();
      expect(CDCEP.DonationReferenceQuickCreate).toBeDefined();
      expect(typeof CDCEP.DonationReferenceQuickCreate.OnLoad).toBe('function');
    });

    it('should have OnLoad function with correct signature', () => {
      // Assert
      expect(CDCEP.DonationReferenceQuickCreate.OnLoad.length).toBe(1); // One parameter
    });
  });
});