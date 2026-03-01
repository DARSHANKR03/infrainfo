import FormField, { getInputClass } from '../../../shared/components/forms/FormField';

function UserForm({ form, roles, cities, errors, onChange, onSubmit, submitting }) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField label="Name" error={errors.name}>
          <input
            value={form.name}
            onChange={(event) => onChange('name', event.target.value)}
            className={getInputClass(errors.name)}
          />
        </FormField>
        <FormField label="Email" error={errors.email}>
          <input
            value={form.email}
            onChange={(event) => onChange('email', event.target.value)}
            className={getInputClass(errors.email)}
          />
        </FormField>
        <FormField label="Role" error={errors.role}>
          <select
            value={form.role}
            onChange={(event) => onChange('role', event.target.value)}
            className={getInputClass(errors.role)}
          >
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="City" error={errors.city}>
          <select
            value={form.city}
            onChange={(event) => onChange('city', event.target.value)}
            className={getInputClass(errors.city)}
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Status" error={errors.status}>
          <select
            value={form.status}
            onChange={(event) => onChange('status', event.target.value)}
            className={getInputClass(errors.status)}
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </FormField>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-accent-gradient px-4 py-2 text-sm font-semibold text-white shadow-lg ds-transition hover:scale-[1.02] disabled:opacity-60"
      >
        {submitting ? 'Saving...' : 'Save User'}
      </button>
    </form>
  );
}

export default UserForm;
