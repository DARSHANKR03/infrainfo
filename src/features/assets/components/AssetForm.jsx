import FormField, { getInputClass } from '../../../shared/components/forms/FormField';

const statusOptions = ['Healthy', 'Warning', 'Critical', 'Failed'];

function AssetForm({
  formData,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
  submitLabel
}) {
  const handleTagsChange = (value) => {
    onChange('tags', value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Asset Name" error={errors.assetName}>
          <input
            value={formData.assetName}
            onChange={(e) => onChange('assetName', e.target.value)}
            className={getInputClass(errors.assetName)}
          />
        </FormField>

        <FormField label="Asset Type" error={errors.assetType}>
          <input
            value={formData.assetType}
            onChange={(e) => onChange('assetType', e.target.value)}
            className={getInputClass(errors.assetType)}
          />
        </FormField>

        <FormField label="Category" error={errors.category}>
          <input
            value={formData.category}
            onChange={(e) => onChange('category', e.target.value)}
            className={getInputClass(errors.category)}
          />
        </FormField>

        <FormField label="City" error={errors.city}>
          <input
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            className={getInputClass(errors.city)}
          />
        </FormField>

        <FormField label="Zone" error={errors.zone}>
          <input
            value={formData.zone}
            onChange={(e) => onChange('zone', e.target.value)}
            className={getInputClass(errors.zone)}
          />
        </FormField>

        <FormField label="Ward" error={errors.ward}>
          <input
            value={formData.ward}
            onChange={(e) => onChange('ward', e.target.value)}
            className={getInputClass(errors.ward)}
          />
        </FormField>

        <FormField label="Installation Date" error={errors.installationDate}>
          <input
            type="date"
            value={formData.installationDate}
            onChange={(e) => onChange('installationDate', e.target.value)}
            className={getInputClass(errors.installationDate)}
          />
        </FormField>

        <FormField label="Expected Lifespan (years)" error={errors.expectedLifespan}>
          <input
            type="number"
            min="1"
            value={formData.expectedLifespan}
            onChange={(e) => onChange('expectedLifespan', e.target.value)}
            className={getInputClass(errors.expectedLifespan)}
          />
        </FormField>

        <FormField label="Status" error={errors.status}>
          <select
            value={formData.status}
            onChange={(e) => onChange('status', e.target.value)}
            className={getInputClass(errors.status)}
          >
            <option value="">Select status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Tags (comma separated)" error={errors.tags}>
          <input
            value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
            onChange={(e) => handleTagsChange(e.target.value)}
            className={getInputClass(errors.tags)}
          />
        </FormField>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-gradient-to-r from-accent-500 to-accent-400 px-4 py-2 text-sm font-semibold text-neutral-bg ds-transition ds-press hover:from-accent-400 hover:to-accent-300 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default AssetForm;
