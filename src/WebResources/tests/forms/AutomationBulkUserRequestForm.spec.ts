import { AutomationBulkUserRequestForm } from '../../src/forms/AutomationBulkUserRequestForm';

describe('AutomationBulkUserRequestForm', () => {
  describe('OnLoad', () => {
    it('should call the base OnLoad method', async () => {
      //Arrange
      const eventContext = {} as Xrm.Events.EventContext;
      const setFormNotificationSpy = jasmine.createSpy('setFormNotification').and.callFake(() => 'test123');
      const setDisabledSpy = jasmine.createSpy('setDisabled');
      const addOnChangeSpy = jasmine.createSpy('addOnChange');
      const getAttributeSpy = jasmine.createSpy('getAttribute').and.returnValue({
        controls: [
          {
            getControlType: () => 'standard',
            setDisabled: setDisabledSpy
          } as unknown as Xrm.Controls.Control,
        ],
        addOnChange: addOnChangeSpy
      });
      eventContext.getFormContext = () => {
        return {
          data: {} as any,
          ui: {
            setFormNotification: setFormNotificationSpy,
          } as any,
          getAttribute: getAttributeSpy,
          getControl: () => undefined
        } as unknown as Xrm.FormContext;
      };

      var instance = new AutomationBulkUserRequestForm();

      //Act
      await instance.OnLoad(eventContext);

      //Assert
      expect(setFormNotificationSpy).toHaveBeenCalledWith('Test1 - OnLoad handler has fired - disabling Return Reason', 'WARNING', 'OnLoadHandler');
      expect(setDisabledSpy).toHaveBeenCalledWith(true);
      expect(addOnChangeSpy).toHaveBeenCalledWith(instance.VrmName_OnChange);
    });
  });

  describe('VrmName_OnChange', () => {
    it('should clear notification and log new value', () => {
      // Arrange
      const eventContext = {} as Xrm.Events.EventContext;
      const getAttributeSpy = jasmine.createSpy('getAttribute').and.returnValue({
        getValue: () => 'New Value'
      });
      const clearNotificationSpy = jasmine.createSpy('clearNotification');
      const setFormNotificationSpy = jasmine.createSpy('setFormNotification').and.returnValue('VrmName_OnChange');
      eventContext.getFormContext = () => ({
        getAttribute: getAttributeSpy,
        log: () => {},
        ui: {
          clearFormNotification: (eventContext: Xrm.Events.EventContext, uniqueId: string) => clearNotificationSpy(eventContext, uniqueId),
          setFormNotification: (message: string, level: string, uniqueId: string) => setFormNotificationSpy(message, level, uniqueId),
        }
      } as unknown as Xrm.FormContext);

      var instance = new AutomationBulkUserRequestForm();

      // Act
      instance.VrmName_OnChange(eventContext);

      // Assert
      expect(clearNotificationSpy).toHaveBeenCalledTimes(1);
      expect(clearNotificationSpy).toHaveBeenCalledWith('OnLoadHandler', undefined);
      expect(setFormNotificationSpy).toHaveBeenCalledWith('VrmName_OnChange has fired. New Value: New Value', 'INFO', 'VrmName_OnChange');
    });
  });
});