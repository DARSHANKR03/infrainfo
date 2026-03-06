import { useMemo } from 'react';
import FormField, { getInputClass } from '../../../shared/components/forms/FormField';

function WorkOrderForm({
  form,
  technicians,
  assets = [],
  onChange,
  onSubmit,
  submitting,
  submitLabel,
  errors
}) {
  // Handle asset selection - update both assetId and assetName
  const handleAssetChange = (assetId) => {
    const selectedAsset = assets.find(asset => asset.id === assetId);
    if (selectedAsset) {
      onChange('assetId', selectedAsset.id);
      onChange('assetName', selectedAsset.assetName);
    } else {
      onChange('assetId', '');
      onChange('assetName', '');
    }
  };

  // Calculate total cost from labor, material, and downtime
  const totalCost = useMemo(() => {
    return Number(form.laborCost || 0) + 
           Number(form.materialCost || 0) + 
           Number(form.downtimeCost || 0);
  }, [form.laborCost, form.materialCost, form.downtimeCost]);

  // Cost breakdown data for visualization
  const costBreakdown = useMemo(() => [
    { key: 'Labor', value: Number(form.laborCost || 0), color: 'bg-accent-500' },
    { key: 'Material', value: Number(form.materialCost || 0), color: 'bg-warning' },
    { key: 'Downtime', value: Number(form.downtimeCost || 0), color: 'bg-danger' }
  ], [form.laborCost, form.materialCost, form.downtimeCost]);

  const maxCostValue = Math.max(...costBreakdown.map(item => item.value), 1);
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
          <select
            value={form.assetId}
            onChange={(event) => handleAssetChange(event.target.value)}
            className={getInputClass(errors.assetId)}
          >
            <option value="">Select asset</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.id} - {asset.assetName}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Asset Name" error={errors.assetName}>
          <input
            value={form.assetName}
            readOnly
            placeholder="Auto-filled when asset selected"
            className={getInputClass(errors.assetName)}
            style={{ backgroundColor: '#f8fafc', cursor: 'not-allowed' }}
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
      </div>

      {/* Maintenance Cost Section */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          color: 'var(--primary-900)',
          marginBottom: '1rem'
        }}>
          Maintenance Cost Breakdown
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField label="Labor Cost" error={errors.laborCost}>
            <input
              type="number"
              min="0"
              value={form.laborCost}
              onChange={(event) => onChange('laborCost', event.target.value)}
              className={getInputClass(errors.laborCost)}
              placeholder="0"
            />
          </FormField>
          <FormField label="Material Cost" error={errors.materialCost}>
            <input
              type="number"
              min="0"
              value={form.materialCost}
              onChange={(event) => onChange('materialCost', event.target.value)}
              className={getInputClass(errors.materialCost)}
              placeholder="0"
            />
          </FormField>
          <FormField label="Downtime Cost" error={errors.downtimeCost}>
            <input
              type="number"
              min="0"
              value={form.downtimeCost}
              onChange={(event) => onChange('downtimeCost', event.target.value)}
              className={getInputClass(errors.downtimeCost)}
              placeholder="0"
            />
          </FormField>
        </div>

        {/* Cost Summary */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1.25rem',
          borderRadius: '0.75rem',
          border: '1px solid var(--neutral-border)',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: 'var(--primary-700)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Estimated Cost
            </span>
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: 'var(--accent-500)'
            }}>
              {totalCost.toLocaleString()}
            </span>
          </div>

          {/* Cost Breakdown Bars */}
          <div style={{ marginTop: '1rem' }}>
            {costBreakdown.map((item) => (
              <div key={item.key} style={{ marginBottom: '0.75rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.25rem',
                  fontSize: '12px',
                  color: 'var(--primary-700)'
                }}>
                  <span>{item.key}</span>
                  <span>{item.value.toLocaleString()}</span>
                </div>
                <div style={{
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--neutral-border)',
                  overflow: 'hidden'
                }}>
                  <div
                    className={item.color}
                    style={{
                      height: '100%',
                      width: `${(item.value / maxCostValue) * 100}%`,
                      transition: 'width 0.3s ease',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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

