import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormInput } from './form-input'
import { FormTextarea } from './form-textarea'
import { FormSelect } from './form-select'
import { FormCheckbox } from './form-check-box'
import { FormPasswordInput } from './form-password-component'
import { FormSwitch } from './form-switch'

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    PasswordInput: FormPasswordInput,
    Textarea: FormTextarea,
    Select: FormSelect,
    Checkbox: FormCheckbox,
    Switch: FormSwitch
  },
  formComponents: {},
  fieldContext,
  formContext
})

export { useAppForm, useFieldContext, useFormContext }
