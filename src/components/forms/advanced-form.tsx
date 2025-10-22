'use client'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from '@/components/ui/field'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { SelectItem } from '@/components/ui/select'

import { XIcon } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { useAppForm } from '../form-components/hooks'
import { PROJECT_STATUSES, projectSchema } from '@/schemas/project'
import { createProject } from '@/actions/project'

type FormData = z.infer<typeof projectSchema>

export default function AdvancedForm() {
  const form = useAppForm({
    defaultValues: {
      name: '',
      description: '',
      users: [{ email: '' }],
      status: 'draft',
      notifications: {
        email: false,
        sms: false,
        push: false
      }
    } satisfies FormData as FormData,
    validators: {
      onSubmit: projectSchema
    },
    onSubmit: async ({ value }) => {
      const res = await createProject(value)

      if (res.success) {
        form.reset()
        toast.success('Project created successfully!', {
          description: JSON.stringify(value, null, 2),
          className: 'whitespace-pre-wrap font-mono'
        })
      } else {
        toast.error('Failed to create project.')
      }
    }
  })

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>Advanced Form Report</CardTitle>
        <CardDescription>
          Help us improve by reporting form errors you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.AppField name='name'>
              {field => <field.Input label='Name' />}
            </form.AppField>

            <form.AppField name='status'>
              {field => (
                <field.Select label='Status'>
                  {PROJECT_STATUSES.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </field.Select>
              )}
            </form.AppField>

            <form.AppField name='description'>
              {field => (
                <field.Textarea
                  label='Description'
                  description='Be as detailed as possible'
                />
              )}
            </form.AppField>

            <FieldSet>
              <FieldContent>
                <FieldLegend>Notifications</FieldLegend>
                <FieldDescription>
                  Select how you would like to receive notifications.
                </FieldDescription>
              </FieldContent>
              <FieldGroup data-slot='checkbox-group'>
                <form.AppField name='notifications.email'>
                  {field => <field.Checkbox label='Email' />}
                </form.AppField>
                <form.AppField name='notifications.sms'>
                  {field => <field.Checkbox label='Text' />}
                </form.AppField>
                <form.AppField name='notifications.push'>
                  {field => <field.Checkbox label='In App' />}
                </form.AppField>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <form.Field name='users' mode='array'>
              {field => {
                return (
                  <FieldSet>
                    <div className='flex items-center justify-between gap-2'>
                      <FieldContent>
                        <FieldLegend variant='label' className='mb-0'>
                          User Email Addresses
                        </FieldLegend>
                        <FieldDescription>
                          Add up to 5 users to this project (including
                          yourself).
                        </FieldDescription>
                        {field.state.meta.errors && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </FieldContent>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => field.pushValue({ email: '' })}
                      >
                        Add User
                      </Button>
                    </div>
                    <FieldGroup>
                      {field.state.value.map((_, index) => (
                        <form.Field key={index} name={`users[${index}].email`}>
                          {innerField => {
                            const isInvalid =
                              innerField.state.meta.isTouched &&
                              !innerField.state.meta.isValid
                            return (
                              <Field
                                orientation='horizontal'
                                data-invalid={isInvalid}
                              >
                                <FieldContent>
                                  <InputGroup>
                                    <InputGroupInput
                                      id={innerField.name}
                                      aria-invalid={isInvalid}
                                      aria-label={`User ${index + 1} email`}
                                      type='email'
                                      onBlur={innerField.handleBlur}
                                      onChange={e =>
                                        innerField.handleChange(e.target.value)
                                      }
                                      value={innerField.state.value}
                                    />
                                    {field.state.value.length > 1 && (
                                      <InputGroupAddon align='inline-end'>
                                        <InputGroupButton
                                          type='button'
                                          variant='ghost'
                                          size='icon-xs'
                                          onClick={() =>
                                            field.removeValue(index)
                                          }
                                          aria-label={`Remove User ${index + 1}`}
                                        >
                                          <XIcon />
                                        </InputGroupButton>
                                      </InputGroupAddon>
                                    )}
                                  </InputGroup>
                                  {isInvalid && (
                                    <FieldError
                                      errors={innerField.state.meta.errors}
                                    />
                                  )}
                                </FieldContent>
                              </Field>
                            )
                          }}
                        </form.Field>
                      ))}
                    </FieldGroup>
                  </FieldSet>
                )
              }}
            </form.Field>

            <Button type='submit'>Create</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
