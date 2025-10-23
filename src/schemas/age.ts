import { z } from 'zod/v3'

export const ageSchema = z.object({
  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number'
    })
    .min(0, 'Age cannot be negative')
    .max(150, 'Age seems too high')
})

export type AgeFormValues = z.infer<typeof ageSchema>
