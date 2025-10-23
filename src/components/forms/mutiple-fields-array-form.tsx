'use client'

import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import { XIcon } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'

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
  FieldSet
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import { Input } from '../ui/input'
import { useAppForm } from '../form-components/hooks'

const registerSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.email('Please enter a valid email address!'),
    // age: z.number().int(),

    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, {
      message: 'Passwords do not match'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],

    // run if password & confirmPassword are valid
    when(payload) {
      return registerSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success
    }
  })

export function MutipleFieldsArrayForm() {
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validators: {
      onBlur: registerSchema
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
      <CardHeader className='border-b'>
        <CardTitle>Contact Emails</CardTitle>
        <CardDescription>Manage your contact email addresses.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id='mutiple-fields-array-form'
          onSubmit={e => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            {/* <form.Field
              name='name'
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
            /> */}
            <form.AppField name='name'>
              {field => <field.Input label='Name' />}
            </form.AppField>
            <form.AppField name='email'>
              {field => <field.Input label='Email' />}
            </form.AppField>
            <form.AppField name='password'>
              {field => <field.PasswordInput label='Password' />}
            </form.AppField>
            <form.AppField name='confirmPassword'>
              {field => <field.PasswordInput label='Confirm Password' />}
            </form.AppField>
          </FieldGroup>{' '}
        </form>
      </CardContent>
      <CardFooter className='border-t'>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type='submit' form='mutiple-fields-array-form'>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
