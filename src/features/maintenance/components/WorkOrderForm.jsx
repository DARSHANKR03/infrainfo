import FormField, { getInputClass } from '../../../shared/components/forms/FormField';

function WorkOrderForm({
  form,
  technicians,
  onChange,
  onSubmit,
  submitting,
  submitLabel,
  errors
}) {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Work Order Title" error={errors.title}>
          <input
            value={form.title}
            onChange={(event) => onChange('title', event.target.value)}
            className={getInputClass(errors.title)}
          />
        </FormField>
        <FormField label="Asset ID" error={errors.assetId}>
          <input
            value={form.assetId}
            onChange={(event) => onChange('assetId', event.target.value)}
            className={getInputClass(errors.assetId)}
          />
        </FormField>
        <FormField label="Asset Name" error={errors.assetName}>
          <input
            value={form.assetName}
            onChange={(event) => onChange('assetName', event.target.value)}
            className={getInputClass(errors.assetName)}
          />
        </FormField>
        <FormField label="Priority" error={errors.priority}>
          <select
            value={form.priority}
            onChange={(event) => onChange('priority', event.target.value)}
            className={getInputClass(errors.priority)}
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Emergency">Emergency</option>
          </select>
        </FormField>
        <FormField label="Assign Technician" error={errors.technician}>
          <select
            value={form.technician}
            onChange={(event) => onChange('technician', event.target.value)}
            className={getInputClass(errors.technician)}
          >
            <option value="">Select technician</option>
            {technicians.map((person) => (
              <option key={person} value={person}>
                {person}
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
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </FormField>
        <FormField label="Scheduled Date" error={errors.scheduledDate}>
          <input
            type="date"
            value={form.scheduledDate}
            onChange={(event) => onChange('scheduledDate', event.target.value)}
            className={getInputClass(errors.scheduledDate)}
          />
        </FormField>
        <FormField label="Estimated Cost" error={errors.estimatedCost}>
          <input
            type="number"
            min="0"
            value={form.estimatedCost}
            onChange={(event) => onChange('estimatedCost', event.target.value)}
            className={getInputClass(errors.estimatedCost)}
          />
        </FormField>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-400 disabled:opacity-60"
      >
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

export default WorkOrderForm;

