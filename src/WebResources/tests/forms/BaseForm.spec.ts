import { BaseForm } from "../../src/forms/BaseForm";

class TestForm extends BaseForm {
  //Use this form as a concrete testing implementation, since BaseForm is abstract.
}

describe('BaseForm', () => {

  describe('isReadOnly', () => {
    it('returns true when readOnly is true', () => {
      //Arrange
      const form = new TestForm();
      const eventContext = {
        getFormContext: () => ({
          getAttribute: () => ({
            getValue: () => 1 //True
          })
        })
      } as unknown as Xrm.Events.EventContext;

      //Act
      var isReadOnly = form.isReadOnly(eventContext);

      //Assert
      expect(isReadOnly).toBe(true);
    });

    it('returns false when readOnly is false', () => {
      //Arrange
      const form = new TestForm();
      const eventContext = {
        getFormContext: () => ({
          getAttribute: () => ({
            getValue: () => 0 //False
          })
        })
      } as unknown as Xrm.Events.EventContext;

      //Act
      var isReadOnly = form.isReadOnly(eventContext);

      //Assert
      expect(isReadOnly).toBe(false);
    });
  });

  describe('toggleRequired', () => {
    it('does nothing when attribute is undefined', () => {
      //Arrange
      var form = new TestForm();

      //Act/Assert
      form.toggleRequired(undefined as unknown as Xrm.Attributes.Attribute, 'none');
    });

    it('sets attribute required level to "required"', () => {
      //Arrange
      var form = new TestForm();
      const requiredLevel = 'required';
      var attribute = {
        setRequiredLevel: jasmine.createSpy('setRequiredLevel')
      };

      //Act
      form.toggleRequired(attribute as unknown as Xrm.Attributes.Attribute, requiredLevel);

      //Assert
      expect(attribute.setRequiredLevel).toHaveBeenCalledWith(requiredLevel);
    });
  });

  describe('cleanGuid', () => {
    it('returns exected result from a GUID', () => {
      //Arrange
      var form = new TestForm();
      const guid = "{12345678-ABCD-1234-1234-123456789012}";

      //Act
      var cleanedGuid = form.cleanGuid(guid);

      //Assert
      expect(cleanedGuid).toBe("12345678-abcd-1234-1234-123456789012");
    });
  });

  describe('notifyUser', () => {
    it('returns specified uniqueId when notification is created', () => {
      //Arrange
      const uniqueId = "12345";
      const message = "Test Message";
      const level = "INFO";
      const setFormNotificationSpy = jasmine.createSpy('setFormNotification').and.returnValue(true);
      const eventContext = {
        getFormContext: () => ({
          ui: {
            setFormNotification: setFormNotificationSpy,
          }
        })
      } as unknown as Xrm.Events.EventContext;
      var form = new TestForm();

      //Act
      const actual = form.notifyUser(eventContext, message, level, uniqueId);

      //Assert
      expect(eventContext.getFormContext().ui.setFormNotification).toHaveBeenCalledWith(message, level, uniqueId);
      expect(actual).toBe(uniqueId);
    });

    it('returns default uniqueId when notification is created', () => {
      //Arrange
      const message = "Test Message";
      const level = "INFO";
      const setFormNotificationSpy = jasmine.createSpy('setFormNotification').and.returnValue(true);
      const eventContext = {
        getFormContext: () => ({
          ui: {
            setFormNotification: setFormNotificationSpy,
          }
        })
      } as unknown as Xrm.Events.EventContext;
      var form = new TestForm();

      //Act
      const actual = form.notifyUser(eventContext, message, level);

      //Assert
      expect(eventContext.getFormContext().ui.setFormNotification).toHaveBeenCalledWith(message, level, jasmine.any(String));
      expect(new Date(actual)).toEqual(jasmine.any(Date));
    });

    it('throws an error when notification cannot be created', () => {
      //Arrange
      const message = 'Some notification';
      const setFormNotificationSpy = jasmine.createSpy('setFormNotification').and.returnValue(undefined);
      const eventContext = {
        getFormContext: () => ({
          ui: {
            setFormNotification: setFormNotificationSpy,
          }
        })
      } as unknown as Xrm.Events.EventContext;
      var form = new TestForm();

      //Act/Assert
      expect(() => form.notifyUser(eventContext, message)).toThrowError(`Could not create notification ${message}`);
    });
  });

  describe('clearNotification', () => {
    it('calls clearFormNotification with the specified uniqueId', () => {
      //Arrange
      const uniqueId = "12345";
      const clearFormNotificationSpy = jasmine.createSpy('clearFormNotification');
      const eventContext = {
        getFormContext: () => ({
          ui: {
            clearFormNotification: clearFormNotificationSpy,
          }
        })
      } as unknown as Xrm.Events.EventContext;
      var form = new TestForm();

      //Act
      form.clearNotification(eventContext, uniqueId);

      //Assert
      expect(eventContext.getFormContext().ui.clearFormNotification).toHaveBeenCalledWith(uniqueId);
    });
  });

  describe('setControlDisabled', () => {
    it('does nothing when attribute is undefined', () => {
      //Arrange
      var form = new TestForm();
      const getAttributeSpy = jasmine.createSpy('getAttribute').and.returnValue(undefined);
      const eventContext = {
        getFormContext: () => ({
          getAttribute: getAttributeSpy
        })
      } as unknown as Xrm.Events.EventContext;

      //Act
      form.setControlDisabled(eventContext, 'nonExistentAttribute', true);
      
      //Assert
      expect(getAttributeSpy).toHaveBeenCalledWith('nonExistentAttribute');
    });

    it('sets control disabled state', () => {
      //Arrange
      const attributeName = 'testAttribute';
      var form = new TestForm();
      const setDisabledSpy = jasmine.createSpy('setDisabled');
      const standardControl = {
        getControlType: () => "standard",
        setDisabled: setDisabledSpy
      } as unknown as Xrm.Controls.Control;
      const attribute = {
        controls: [standardControl] as unknown as Xrm.Collection.ItemCollection<Xrm.Controls.StandardControl>
      };
      const getAttributeSpy = jasmine.createSpy('getAttribute').and.returnValue(attribute);
      const eventContext = {
        getFormContext: () => ({
          getAttribute: getAttributeSpy
        })
      } as unknown as Xrm.Events.EventContext;

      //Act
      form.setControlDisabled(eventContext, attributeName, true);

      //Assert
      expect(getAttributeSpy).toHaveBeenCalledWith(attributeName);
      expect(setDisabledSpy).toHaveBeenCalledWith(true);
    });

    it('handles exception', () => {
      //Arrange
      const attributeName = 'testAttribute';
      var form = new TestForm();
      const setDisabledSpy = jasmine.createSpy('setDisabled').and.throwError('Test Error');
      const standardControl = {
        getControlType: () => "standard",
        setDisabled: setDisabledSpy
      } as unknown as Xrm.Controls.Control;
      const attribute = {
        controls: [standardControl] as unknown as Xrm.Collection.ItemCollection<Xrm.Controls.StandardControl>
      };
      const getAttributeSpy = jasmine.createSpy('getAttribute').and.returnValue(attribute);
      const eventContext = {
        getFormContext: () => ({
          getAttribute: getAttributeSpy
        })
      } as unknown as Xrm.Events.EventContext;

      //Act
      form.setControlDisabled(eventContext, attributeName, true);

      //Assert
      expect(getAttributeSpy).toHaveBeenCalledWith(attributeName);
      expect(setDisabledSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('setTabVisible', () => {
    it('does nothing when tab is undefined', () => {
      //Arrange
      var form = new TestForm();
      const setVisibleSpy = jasmine.createSpy('setVisible');
      const eventContext = {
        getFormContext: () => ({
          ui: {
            tabs: {
              get: () => undefined
            }
          }
        })
      } as unknown as Xrm.Events.EventContext;

      //Act
      form.setTabVisible(eventContext, 'nonExistentTab', true);

      //Assert
      expect(setVisibleSpy).not.toHaveBeenCalled();
    });

    it('sets tab visibility', () => {
      //Arrange
      var form = new TestForm();
      const setVisibleSpy = jasmine.createSpy('setVisible');
      const tab = {
        setVisible: setVisibleSpy
      } as unknown as Xrm.Controls.Tab;
      const eventContext = {
        getFormContext: () => ({
          ui: {
            tabs: {
              get: () => tab
            }
          }
        })
      } as unknown as Xrm.Events.EventContext;

      //Act
      form.setTabVisible(eventContext, 'testTab', true);

      //Assert
      expect(setVisibleSpy).toHaveBeenCalledWith(true);
    });

    it('handles exception when setting tab visibility', () => {
      //Arrange
      var form = new TestForm();
      const setVisibleSpy = jasmine.createSpy('setVisible').and.throwError('Test Error');
      const tab = {
        setVisible: setVisibleSpy
      } as unknown as Xrm.Controls.Tab;
      const eventContext = {
        getFormContext: () => ({
          ui: {
            tabs: {
              get: () => tab
            }
          }
        })
      } as unknown as Xrm.Events.EventContext;

      //Act
      form.setTabVisible(eventContext, 'testTab', true);

      //Assert
      expect(setVisibleSpy).toHaveBeenCalledWith(true);
    });
  });
});