'use client'
import { useState } from 'react'
import { Input } from '../ui/input'
import { FormBase, FormControlProps } from './form-base'

import { useFieldContext } from './hooks'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '../ui/button'

export function FormPasswordInput(props: FormControlProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const [showPassword, setShowPassword] = useState(false)
  const Icon = showPassword ? EyeOffIcon : EyeIcon

  return (
    <FormBase {...props}>
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className='pr-9'
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
        />
        <Button
          variant='ghost'
          size='icon'
          type='button'
          className='absolute inset-y-1/2 right-1 size-7 -translate-y-1/2'
          onClick={() => setShowPassword(p => !p)}
        >
          <Icon className='size-5' />
          <span className='sr-only'>
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      </div>
    </FormBase>
  )
}
