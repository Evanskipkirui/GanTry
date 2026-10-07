import { z } from 'zod'
import PageHeader from '@/components/ui/PageHeader'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { useTenant } from '@/context/TenantContext'
import useForm from '@/hooks/useForm'

const settingsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Must be a valid email'),
  timezone: z.string().min(1, 'Select a timezone'),
  autoCheckout: z.string().min(1, 'Select a duration'),
})

type SettingsForm = z.infer<typeof settingsSchema>

function Settings() {
  const { currentTenant } = useTenant()

  const { values, errors, submitted, setValue, handleSubmit } = useForm<SettingsForm>({
    initialValues: {
      name: currentTenant.name,
      email: `admin@${currentTenant.slug}.co.ke`,
      timezone: 'Africa/Nairobi',
      autoCheckout: '8 hours',
    },
    schema: settingsSchema,
    onSubmit: () => { /* UI only */ },
  })

  const set = (field: keyof SettingsForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setValue(field, e.target.value)

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader title="Settings" subtitle={`Organization settings for ${currentTenant.name}`} />

      {submitted && (
        <div className="mb-6 border border-green bg-green-light px-4 py-3 text-sm text-green rounded-sm">
          Settings saved.
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} noValidate className="bg-surface border border-border p-6 max-w-xl">
        <div className="grid grid-cols-1 gap-5">
          <Input label="Organization Name" value={values.name} onChange={set('name')} error={errors.name} />
          <Input label="Contact Email" type="email" value={values.email} onChange={set('email')} error={errors.email} />
          <Select label="Timezone" value={values.timezone} onChange={set('timezone')} error={errors.timezone}>
            <option value="Africa/Nairobi">Africa/Nairobi</option>
            <option value="UTC">UTC</option>
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
          </Select>
          <Select label="Visitor Auto Checkout" value={values.autoCheckout} onChange={set('autoCheckout')} error={errors.autoCheckout}>
            <option value="4 hours">4 hours</option>
            <option value="8 hours">8 hours</option>
            <option value="12 hours">12 hours</option>
          </Select>
        </div>
        <div className="mt-6">
          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  )
}

export default Settings
