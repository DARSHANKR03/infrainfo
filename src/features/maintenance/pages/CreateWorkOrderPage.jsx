import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WorkOrderForm from '../components/WorkOrderForm';
import { createWorkOrder, getTechnicians } from '../../../shared/services/mockApi/maintenanceApi';
import { listAssets } from '../../../shared/services/mockApi/assetsApi';

const defaultForm = {
  title: '',
  assetId: '',
  assetName: '',
  priority: '',
  technician: '',
  status: 'Open',
  scheduledDate: '',
  laborCost: '',
  materialCost: '',
  downtimeCost: ''
};

function CreateWorkOrderPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [technicians, setTechnicians] = useState([]);
  const [assets, setAssets] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [techList, assetList] = await Promise.all([
        getTechnicians(),
        listAssets()
      ]);
      setTechnicians(techList);
      setAssets(assetList);
    };
    load();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    // Calculate total cost from breakdown
    const totalCost = Number(form.laborCost || 0) + 
                     Number(form.materialCost || 0) + 
                     Number(form.downtimeCost || 0);

    setSubmitting(true);
    await createWorkOrder({
      ...form,
      estimatedCost: totalCost
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
          assets={assets}
          onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Create Work Order"
          errors={errors}
        />
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
  
  // Validate cost fields
  if (values.laborCost !== '' && Number(values.laborCost) < 0) {
    errors.laborCost = 'Labor cost cannot be negative.';
  }
  if (values.materialCost !== '' && Number(values.materialCost) < 0) {
    errors.materialCost = 'Material cost cannot be negative.';
  }
  if (values.downtimeCost !== '' && Number(values.downtimeCost) < 0) {
    errors.downtimeCost = 'Downtime cost cannot be negative.';
  }
  
  return errors;
}

export default CreateWorkOrderPage;

