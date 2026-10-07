import { z } from 'zod'
import { useMemo } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { employees } from '@/data/employees'
import { useTenant } from '@/context/TenantContext'
import useForm from '@/hooks/useForm'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Phone must be at least 7 characters'),
  host: z.string().min(1, 'Host is required'),
  purpose: z.string().min(3, 'Purpose must be at least 3 characters'),
})

type StaffForm = z.infer<typeof schema>

const empty: StaffForm = { name: '', phone: '', host: '', purpose: '' }

function RegisterVisitor() {
  const { currentTenant } = useTenant()

  const tenantEmployees = useMemo(
    () => employees.filter((e) => e.tenantId === currentTenant.slug),
    [currentTenant.slug],
  )

  const { values, errors, submitted, setValue, handleSubmit, reset } = useForm<StaffForm>({
    initialValues: empty,
    schema,
    onSubmit: () => { /* UI only */ },
  })

  const set = (field: keyof StaffForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setValue(field, e.target.value)

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader title="Register Visitor" subtitle="Record a visitor arriving at reception" />

      {submitted && (
        <div className="mb-6 border border-green bg-green-light px-4 py-3 text-sm text-green rounded-sm">
          Visitor registered successfully.
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} noValidate className="bg-surface border border-border p-6 max-w-xl">
        <div className="grid grid-cols-1 gap-5">
          <Input label="Visitor Name" placeholder="Full name" value={values.name} onChange={set('name')} error={errors.name} />
          <Input label="Phone" placeholder="+254 7XX XXX XXX" value={values.phone} onChange={set('phone')} error={errors.phone} />
          <Select label="Host" value={values.host} onChange={set('host')} error={errors.host}>
            <option value="">Select a host…</option>
            {tenantEmployees.map((emp) => (
              <option key={emp.id} value={emp.name}>
                {emp.name} — {emp.department}
              </option>
            ))}
          </Select>
          <Input label="Purpose" placeholder="e.g. Meeting, Delivery, Maintenance" value={values.purpose} onChange={set('purpose')} error={errors.purpose} />
        </div>
        <div className="mt-6 flex gap-3">
          <Button type="submit">Register Visitor</Button>
          <Button variant="secondary" type="button" onClick={reset}>Clear</Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterVisitor
