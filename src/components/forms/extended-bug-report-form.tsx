'use client'

import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { plans, spokenLanguages, tasks } from '@/lib/constants'

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Bug title must be at least 5 characters.')
    .max(32, 'Bug title must be at most 32 characters.'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters.')
    .max(100, 'Description must be at most 100 characters.'),
  language: z
    .string()
    .min(1, 'Please select your spoken language.')
    .refine(val => val !== 'auto', {
      message:
        'Auto-detection is not allowed. Please select a specific language.'
    }),
  responses: z.boolean(),
  tasks: z
    .array(z.string())
    .min(1, 'Please select at least one task status.')
    .refine(value => value.every(task => tasks.some(t => t.id === task)), {
      message: 'Invalid notification type selected.'
    }),
  plan: z.string().min(1, 'You must select a subscription plan to continue.'),
  // if two factor must be true to continue with form submission
  // twoFactor: z.boolean().refine(val => val === true, {
  //   message: 'It is highly recommended to enable two-factor authentication.'
  // })
  // If twofactor is optional
  twoFactor: z.boolean()
})

export function ExtendedBugReportForm() {
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      language: '',
      responses: true,
      tasks: [] as string[],
      plan: '',
      twoFactor: false
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      toast('You submitted the following values:', {
        description: (
          <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: 'bottom-right',
        classNames: {
          content: 'flex flex-col gap-2'
        },
        style: {
          '--border-radius': 'calc(var(--radius)  + 4px)'
        } as React.CSSProperties
      })
    }
  })

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>Extended Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting EVERY type bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id='extended-bug-report-form'
          onSubmit={e => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name='title'
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className='text-primary'>
                      Bug Title
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='e.g. Login button not working on mobile'
                      autoComplete='off'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name='description'
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className='text-primary'>
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                        placeholder="e.g. I'm having an issue with the login button on mobile."
                        rows={6}
                        className='min-h-24 resize-none'
                        aria-invalid={isInvalid}
                      />
                      <InputGroupAddon align='block-end'>
                        <InputGroupText className='tabular-nums'>
                          {field.state.value.length}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Include steps to reproduce, expected behavior, and what
                      actually happened.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name='language'
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation='responsive' data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor='form-tanstack-select-language'>
                        Spoken Language
                      </FieldLabel>
                      <FieldDescription>
                        For best results, select the language you speak.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id='form-tanstack-select-language'
                        aria-invalid={isInvalid}
                        className='min-w-[120px]'
                      >
                        <SelectValue placeholder='Select' />
                      </SelectTrigger>
                      <SelectContent position='item-aligned'>
                        <SelectItem value='auto'>Auto</SelectItem>
                        <SelectSeparator />
                        {spokenLanguages.map(language => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )
              }}
            />
            <form.Field
              name='responses'
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend variant='label'>Responses</FieldLegend>
                    <FieldDescription>
                      Get notified for requests that take time.
                    </FieldDescription>
                    <FieldGroup data-slot='checkbox-group'>
                      <Field orientation='horizontal' data-invalid={isInvalid}>
                        <Checkbox
                          id='form-tanstack-checkbox-responses'
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={checked =>
                            field.handleChange(checked === true)
                          }
                          // disabled
                        />
                        <FieldLabel
                          htmlFor='form-tanstack-checkbox-responses'
                          className='font-normal'
                        >
                          Work status
                        </FieldLabel>
                      </Field>
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                )
              }}
            />
            <FieldSeparator />
            <form.Field
              name='tasks'
              mode='array'
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend variant='label'>Tasks</FieldLegend>
                    <FieldDescription>
                      Get notified when tasks you&apos;ve created have updates.
                    </FieldDescription>
                    <FieldGroup data-slot='checkbox-group'>
                      {tasks.map(task => (
                        <Field
                          key={task.id}
                          orientation='horizontal'
                          data-invalid={isInvalid}
                        >
                          <Checkbox
                            id={`form-tanstack-checkbox-${task.id}`}
                            name={field.name}
                            aria-invalid={isInvalid}
                            checked={field.state.value.includes(task.id)}
                            onCheckedChange={checked => {
                              if (checked) {
                                field.pushValue(task.id)
                              } else {
                                const index = field.state.value.indexOf(task.id)
                                if (index > -1) {
                                  field.removeValue(index)
                                }
                              }
                            }}
                          />
                          <FieldLabel
                            htmlFor={`form-tanstack-checkbox-${task.id}`}
                            className='font-normal'
                          >
                            {task.label}
                          </FieldLabel>
                        </Field>
                      ))}
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                )
              }}
            />
            <form.Field
              name='plan'
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend>Plan</FieldLegend>
                    <FieldDescription>
                      You can upgrade or downgrade your plan at any time.
                    </FieldDescription>
                    <RadioGroup
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      {plans.map(plan => (
                        <FieldLabel
                          key={plan.id}
                          htmlFor={`form-tanstack-radiogroup-${plan.id}`}
                        >
                          <Field
                            orientation='horizontal'
                            data-invalid={isInvalid}
                          >
                            <FieldContent>
                              <FieldTitle>{plan.title}</FieldTitle>
                              <FieldDescription>
                                {plan.description}
                              </FieldDescription>
                            </FieldContent>
                            <RadioGroupItem
                              value={plan.id}
                              id={`form-tanstack-radiogroup-${plan.id}`}
                              aria-invalid={isInvalid}
                            />
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                )
              }}
            />
            <form.Field
              name='twoFactor'
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation='horizontal' data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor='form-tanstack-switch-twoFactor'>
                        Multi-factor authentication
                      </FieldLabel>
                      <FieldDescription>
                        Enable multi-factor authentication to secure your
                        account.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Switch
                      id='form-tanstack-switch-twoFactor'
                      name={field.name}
                      checked={field.state.value}
                      onCheckedChange={field.handleChange}
                      aria-invalid={isInvalid}
                    />
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type='submit' form='extended-bug-report-form'>
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
