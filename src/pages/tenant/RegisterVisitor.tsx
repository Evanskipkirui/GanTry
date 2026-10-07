import { useReducer, useMemo } from 'react'
import { z } from 'zod'
import PageHeader from '@/components/ui/PageHeader'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { employees } from '@/data/employees'
import { useTenant } from '@/context/TenantContext'

// ─── Schemas ─────────────────────────────────────────────────────────────────

const step1Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Phone must be at least 7 characters'),
  email: z.string().email('Enter a valid email address'),
})

const fullSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Phone must be at least 7 characters'),
  email: z.string().email('Enter a valid email address'),
  host: z.string().min(1, 'Host is required'),
  purpose: z.string().min(3, 'Purpose must be at least 3 characters'),
  expectedTime: z.string().min(1, 'Expected time is required'),
})

// ─── Reducer ─────────────────────────────────────────────────────────────────

type FormValues = {
  name: string
  phone: string
  email: string
  host: string
  purpose: string
  expectedTime: string
}

type FormState = {
  step: 1 | 2
  values: FormValues
  errors: Partial<Record<keyof FormValues, string>>
  submitted: boolean
}

type FormAction =
  | { type: 'SET_VALUE'; field: keyof FormValues; value: string }
  | { type: 'SET_ERRORS'; errors: FormState['errors'] }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SUBMIT' }
  | { type: 'RESET' }

const initialValues: FormValues = {
  name: '', phone: '', email: '', host: '', purpose: '', expectedTime: '',
}

const initialState: FormState = {
  step: 1,
  values: initialValues,
  errors: {},
  submitted: false,
}

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, values: { ...state.values, [action.field]: action.value }, submitted: false }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'NEXT_STEP':
      return { ...state, step: 2, errors: {} }
    case 'PREV_STEP':
      return { ...state, step: 1, errors: {} }
    case 'SUBMIT':
      return { ...state, submitted: true, errors: {} }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function parseErrors<T extends Record<string, unknown>>(
  result: z.ZodSafeParseError<T>,
): Partial<Record<keyof T, string>> {
  const fieldErrors: Partial<Record<keyof T, string>> = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof T
    if (!fieldErrors[field]) fieldErrors[field] = issue.message
  }
  return fieldErrors
}

// ─── Component ───────────────────────────────────────────────────────────────

function RegisterVisitor() {
  const { currentTenant } = useTenant()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { step, values, errors, submitted } = state

  const tenantEmployees = useMemo(
    () => employees.filter((e) => e.tenantId === currentTenant.slug),
    [currentTenant.slug],
  )

  const set = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => dispatch({ type: 'SET_VALUE', field, value: e.target.value })

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    const result = step1Schema.safeParse(values)
    if (!result.success) {
      dispatch({ type: 'SET_ERRORS', errors: parseErrors(result) })
      return
    }
    dispatch({ type: 'NEXT_STEP' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = fullSchema.safeParse(values)
    if (!result.success) {
      dispatch({ type: 'SET_ERRORS', errors: parseErrors(result) })
      return
    }
    dispatch({ type: 'SUBMIT' })
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Register Visitor"
        subtitle="Create a new visitor record"
      />

      {submitted && (
        <div className="mb-6 border border-green bg-green-light px-4 py-3 text-sm text-green rounded-sm">
          Visitor registered successfully.
        </div>
      )}

      <div className="mb-4 flex items-center gap-2">
        <span className={`font-mono text-xs tracking-label uppercase ${step === 1 ? 'text-amber' : 'text-ink-muted'}`}>
          Step 1 — Visitor Details
        </span>
        <span className="text-ink-faint text-xs">→</span>
        <span className={`font-mono text-xs tracking-label uppercase ${step === 2 ? 'text-amber' : 'text-ink-muted'}`}>
          Step 2 — Visit Details
        </span>
      </div>

      <div className="bg-surface border border-border p-6 max-w-xl">
        {step === 1 && (
          <form onSubmit={handleNext} noValidate>
            <div className="grid grid-cols-1 gap-5">
              <Input label="Name" placeholder="Full name" value={values.name} onChange={set('name')} error={errors.name} />
              <Input label="Phone" placeholder="+254 7XX XXX XXX" value={values.phone} onChange={set('phone')} error={errors.phone} />
              <Input label="Email" type="email" placeholder="visitor@example.com" value={values.email} onChange={set('email')} error={errors.email} />
            </div>
            <div className="mt-6 flex gap-3">
              <Button type="submit">Next</Button>
              <Button variant="secondary" type="button" onClick={() => dispatch({ type: 'RESET' })}>
                Clear
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-5">
              <Select label="Host" value={values.host} onChange={set('host')} error={errors.host}>
                <option value="">Select a host…</option>
                {tenantEmployees.map((emp) => (
                  <option key={emp.id} value={emp.name}>
                    {emp.name} — {emp.department}
                  </option>
                ))}
              </Select>
              <Input label="Purpose" placeholder="e.g. Meeting, Interview, Delivery" value={values.purpose} onChange={set('purpose')} error={errors.purpose} />
              <Input label="Expected Time" type="datetime-local" value={values.expectedTime} onChange={set('expectedTime')} error={errors.expectedTime} />
            </div>
            <div className="mt-6 flex gap-3">
              <Button type="submit">Register</Button>
              <Button variant="secondary" type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}>
                Back
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default RegisterVisitor
