/**
 * Abstract base class for Dynamics 365/Dataverse form logic.
 * 
 * Provides common utility methods for form event handling, attribute manipulation,
 * notifications, logging, and UI control management. Intended to be extended by
 * specific form classes to encapsulate shared behaviors and patterns.
 * 
 * This class can be used for forms where the generated Types are not available or
 * desired. When types are available, use the BaseFormTyped class instead.
 * 
 * @remarks
 * - Handles form context extraction, read-only state checks, and GUID normalization.
 * - Offers helpers for setting required fields, toggling control states, and managing notifications.
 * - Includes a logging utility for debugging and diagnostics.
 * - Designed for extensibility and reuse across multiple forms.
 * 
 * @example
 * ```typescript
 * class MyCustomForm extends BaseForm {
 *   // Implement custom logic here
 * }
 * ```
 */
export abstract class BaseForm {

    constructor() {}

    /**
     * Handler for form OnLoad event.
     * 
     * @param eventContext - The event context provided by Dynamics 365 form engine
     * @param gridFieldNames - Optional comma-separated list of field names for grid configuration
     * @returns Promise that resolves when load operations are complete
     */
    protected async OnLoad(eventContext: Xrm.Events.EventContext, gridFieldNames?: string): Promise<void> {
        //Nothing implemented yet, but we may need this for wiring up some things.
        this.log('BaseForm OnLoad', eventContext, gridFieldNames);
    }

    /**
     * Extracts the form context from an event context.
     * 
     * @param eventContext - The event context provided by Dynamics 365
     * @returns The form context object
     */
    getFormContext = (eventContext: Xrm.Events.EventContext): Xrm.FormContext => {
        return eventContext.getFormContext();
    }

    /**
     * Determines if the current form is in read-only mode.
     * 
     * @param eventContext - The event context provided by Dynamics 365
     * @returns True if the form is read-only (statecode is not 0), false otherwise
     */
    isReadOnly = (eventContext: Xrm.Events.EventContext): boolean => {
        return this.getFormContext(eventContext).getAttribute("statecode").getValue() !== 0;
    }

    /**
     * Logs messages with the form class name as a prefix.
     * 
     * @param args - Arguments to log to the console
     * @remarks
     * This method can be enhanced to include severity levels and to integrate with
     * application insights for better monitoring and diagnostics.
     */
    log = (...args: any[]): void => {
        //The method for capturing the Class Name is not perfect, but it works for most cases.
        //We may need to add some exception handling in cases where it doesn't work as expected.
        /* istanbul ignore next */
        const className = (this?.constructor?.toString()?.match(/\w+/g) || ['', 'UnknownForm'])[1];
        console.warn(`Form: ${className}`, args);

        //TODO: Add severity level (INFO, WARNING, ERROR) as parameters
        //TODO: AppInsights
    }

    /**
     * Sets the requirement level for a form attribute.
     * 
     * @param attribute - The attribute to modify
     * @param requirementLevel - The requirement level to set (none, recommended, required)
     */
    toggleRequired = (attribute: Xrm.Attributes.Attribute, requirementLevel: Xrm.Attributes.RequirementLevel): void => {
        if (attribute) attribute.setRequiredLevel(requirementLevel);
    }

    /**
     * Normalizes a GUID by removing braces and converting to lowercase.
     * 
     * @param guid - The GUID string to clean
     * @returns The normalized GUID string
     */
    cleanGuid = (guid: string): string => {
        return guid.replace(/[\{\}]/g, '').toLowerCase();
    }

    /**
     * Displays a notification message on the form.
     * 
     * @param eventContext - The event context provided by Dynamics 365
     * @param message - The message to display
     * @param level - The severity level of the notification (ERROR, WARNING, INFO)
     * @param uniqueId - Optional identifier for the notification (defaults to timestamp)
     * @returns The unique ID of the created notification
     * @throws Error if notification cannot be created
     */
    notifyUser = (eventContext: Xrm.Events.EventContext, message: string, level: "ERROR" | "WARNING" | "INFO" = "INFO", uniqueId: string = new Date().valueOf().toString()): string => {
        if (this.getFormContext(eventContext).ui.setFormNotification(message, level, uniqueId)) return uniqueId;
        throw new Error(`Could not create notification ${message}`);
    }

    /**
     * Clears a specific notification from the form.
     * 
     * @param eventContext - The event context provided by Dynamics 365
     * @param uniqueId - The unique identifier of the notification to clear
     */
    clearNotification = (eventContext: Xrm.Events.EventContext, uniqueId:string): boolean => {
        return this.getFormContext(eventContext).ui.clearFormNotification(uniqueId);
    }

    /**
     * Enables or disables a form control.
     * 
     * @param eventContext - The event context provided by Dynamics 365
     * @param name - The name of the attribute/control
     * @param disabled - True to disable the control, false to enable
     * @returns The control reference (if successful)
     */
    setControlDisabled = (eventContext: Xrm.Events.EventContext, name: string, disabled: boolean): void => {
        const attribute = this.getFormContext(eventContext).getAttribute(name);
        if (attribute) {
            attribute.controls.forEach((c: Xrm.Controls.Control) => {
                if(c.getControlType() === "standard") {
                    try {
                        (<Xrm.Controls.StandardControl>c).setDisabled(disabled)
                    } catch (e) {
                        console.error('Error in setControlDisabled', e);
                    }
                }
            });
        }
    }

    /**
     * Shows or hides a form tab.
     * 
     * @param eventContext - The event context provided by Dynamics 365
     * @param name - The name of the tab
     * @param visible - True to show the tab, false to hide it
     * @returns The tab reference (if successful)
     */
    setTabVisible = (eventContext: Xrm.Events.EventContext, name: string, visible: boolean): void => {
        const tabToShow = this.getFormContext(eventContext).ui.tabs.get(name);
        if(tabToShow) {
            try {
                tabToShow.setVisible(visible);
            } catch(e) {
                console.error(`Error in setTabVisible: ${e}`, e);
            }
        }
    }
}

/* istanbul ignore next */
declare global {
    /** You can replace the object with any desired object/prefix.
     *  Just make sure to update it everywhere in the codebase 
     *  (including in the Webpack config files).
     *  This is useful for namespacing or avoiding global pollution.
     */
    interface Window { CDCEP: any; }
}

/* istanbul ignore next */
window.CDCEP = window.CDCEP || {};
/* istanbul ignore next */
window.CDCEP.Forms = window.CDCEP.Forms || {};