import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MaintenanceCostForm from '../components/MaintenanceCostForm';
import RepairReplaceSuggestion from '../components/RepairReplaceSuggestion';
import WorkOrderForm from '../components/WorkOrderForm';
import { createWorkOrder, getTechnicians } from '../../../shared/services/mockApi/maintenanceApi';

const defaultForm = {
  title: '',
  assetId: '',
  assetName: '',
  priority: '',
  technician: '',
  status: 'Open',
  scheduledDate: '',
  estimatedCost: ''
};

const defaultCost = {
  laborCost: '',
  materialCost: '',
  downtimeCost: '',
  replacementCost: ''
};

function CreateWorkOrderPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [cost, setCost] = useState(defaultCost);
  const [technicians, setTechnicians] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const list = await getTechnicians();
      setTechnicians(list);
    };
    load();
  }, []);

  const repairCost = useMemo(
    () =>
      Number(cost.laborCost || 0) +
      Number(cost.materialCost || 0) +
      Number(cost.downtimeCost || 0),
    [cost]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    await createWorkOrder({
      ...form,
      estimatedCost: Number(form.estimatedCost || repairCost || 0)
    });
    setSubmitting(false);
    navigate('/maintenance-work-orders');
  };

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Create Work Order</h2>
          <p>Register maintenance scope, assign ownership, and estimate cost.</p>
        </div>
        <Link to="/maintenance-work-orders" className="tbl-btn">← Back to List</Link>
      </div>

      <div className="ui-card">
        <WorkOrderForm
          form={form}
          technicians={technicians}
          onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Create Work Order"
          errors={errors}
        />
      </div>

      <div className="grid-2-3">
        <div><MaintenanceCostForm
            cost={cost}
            onCostChange={(field, value) => setCost((prev) => ({ ...prev, [field]: value }))}
          />
        </div>
        <div><RepairReplaceSuggestion
            assetAge={12}
            expectedLifespan={20}
            repairCost={repairCost}
            replacementCost={Number(cost.replacementCost || 0)}
            criticality={form.priority === 'Emergency' || form.priority === 'High' ? 'High' : 'Medium'}
          />
        </div>
      </div>
    </div>
  );
}

function validate(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Title is required.';
  if (!values.assetId.trim()) errors.assetId = 'Asset ID is required.';
  if (!values.assetName.trim()) errors.assetName = 'Asset name is required.';
  if (!values.priority) errors.priority = 'Priority is required.';
  if (!values.technician) errors.technician = 'Technician is required.';
  if (!values.status) errors.status = 'Status is required.';
  if (!values.scheduledDate) errors.scheduledDate = 'Scheduled date is required.';
  if (values.estimatedCost !== '' && Number(values.estimatedCost) < 0) {
    errors.estimatedCost = 'Estimated cost cannot be negative.';
  }
  return errors;
}

export default CreateWorkOrderPage;

