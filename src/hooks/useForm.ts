import { useState } from 'react'
import type { ZodType } from 'zod'

type UseFormOptions<T extends Record<string, unknown>> = {
  initialValues: T
  schema: ZodType<T>
  onSubmit: (values: T) => void
}

type UseFormResult<T extends Record<string, unknown>> = {
  values: T
  errors: Partial<Record<keyof T, string>>
  submitted: boolean
  setValue: (field: keyof T, value: T[keyof T]) => void
  handleSubmit: () => void
  reset: () => void
}

function useForm<T extends Record<string, unknown>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormOptions<T>): UseFormResult<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const setValue = (field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    setSubmitted(false)
    const result = schema.safeParse(values)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof T, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof T
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
    onSubmit(result.data)
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setSubmitted(false)
  }

  return { values, errors, submitted, setValue, handleSubmit, reset }
}

export default useForm
