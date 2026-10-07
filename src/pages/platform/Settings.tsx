import { z } from 'zod'
import PageHeader from '@/components/ui/PageHeader'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import useForm from '@/hooks/useForm'

const platformSettingsSchema = z.object({
  platformName: z.string().min(2, 'Name must be at least 2 characters'),
  supportEmail: z.string().email('Must be a valid email'),
  defaultTimezone: z.string().min(1, 'Select a timezone'),
  sessionTimeout: z.string().min(1, 'Select a timeout'),
})

type PlatformSettingsForm = z.infer<typeof platformSettingsSchema>

const initial: PlatformSettingsForm = {
  platformName: 'Gantry',
  supportEmail: 'support@gantry.io',
  defaultTimezone: 'Africa/Nairobi',
  sessionTimeout: '30 minutes',
}

function PlatformSettings() {
  const { values, errors, submitted, setValue, handleSubmit } = useForm<PlatformSettingsForm>({
    initialValues: initial,
    schema: platformSettingsSchema,
    onSubmit: () => { /* UI only */ },
  })

  const set = (field: keyof PlatformSettingsForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setValue(field, e.target.value)

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader title="Platform Settings" subtitle="Gantry platform configuration" />

      {submitted && (
        <div className="mb-6 border border-green bg-green-light px-4 py-3 text-sm text-green rounded-sm">
          Platform settings saved.
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} noValidate className="bg-surface border border-border p-6 max-w-xl">
        <div className="grid grid-cols-1 gap-5">
          <Input label="Platform Name" value={values.platformName} onChange={set('platformName')} error={errors.platformName} />
          <Input label="Support Email" type="email" value={values.supportEmail} onChange={set('supportEmail')} error={errors.supportEmail} />
          <Select label="Default Timezone" value={values.defaultTimezone} onChange={set('defaultTimezone')} error={errors.defaultTimezone}>
            <option value="Africa/Nairobi">Africa/Nairobi</option>
            <option value="UTC">UTC</option>
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
          </Select>
          <Select label="Session Timeout" value={values.sessionTimeout} onChange={set('sessionTimeout')} error={errors.sessionTimeout}>
            <option value="15 minutes">15 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="4 hours">4 hours</option>
          </Select>
        </div>
        <div className="mt-6">
          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  )
}

export default PlatformSettings
