import { BaseForm } from "./BaseForm";

/**
 * Abstract base class for Dynamics 365/Dataverse form logic with typed form context.
 *
 * Extends the BaseForm class but provides strong typing for the form context,
 * enabling better IntelliSense support and type safety when working with
 * generated entity types.
 *
 * @template TFormContext - The specific form context type for the entity
 * @remarks
 * - Use this class when working with generated entity types for improved type safety
 * - Inherits all utility methods from BaseForm with proper type information
 * - Enables safer attribute and control manipulation with compiler-checked types
 *
 * @example
 * ```typescript
 * // With generated contact form types
 * class ContactForm extends BaseFormTyped<Xrm.Veis_automationuserbulkrequest> {
 *   // Type-safe implementation with IntelliSense support
 * }
 * ```
 */
export abstract class BaseFormTyped<TFormContext extends Xrm.FormContext> extends BaseForm {
    /**
     * Creates a new instance of the BaseFormTyped class.
     */
    constructor() {
        super();
    }

    /**
     * Handler for form OnLoad event with typed form context.
     *
     * @param eventContext - The event context provided by Dynamics 365 form engine
     * @param gridFieldNames - Optional comma-separated list of field names for grid configuration
     * @returns Promise that resolves when load operations are complete
     */
    protected async OnLoad(eventContext: Xrm.Events.EventContext, gridFieldNames?: string): Promise<void> {
        //Nothing implemented yet, but we may need this for wiring up some things.
        await super.OnLoad(eventContext, gridFieldNames);
        this.log("BaseFormTyped OnLoad", eventContext, gridFieldNames);
    }

    /**
     * Extracts the typed form context from an event context.
     *
     * Overrides the base implementation to return the strongly-typed form context.
     *
     * @param eventContext - The event context provided by Dynamics 365
     * @returns The strongly-typed form context object
     */
    override getFormContext = (eventContext: Xrm.Events.EventContext): TFormContext => {
        return <TFormContext>eventContext.getFormContext();
    }
}