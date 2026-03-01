import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminCard from '../components/AdminCard';
import UserForm from '../components/UserForm';
import {
  createUser,
  getAdminMeta,
  getUserById,
  updateUser
} from '../../../shared/services/mockApi/adminApi';

const defaultForm = {
  name: '',
  email: '',
  role: '',
  city: '',
  status: 'Active'
};

function UserFormPage() {
  const { userId } = useParams();
  const isEdit = Boolean(userId);
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const meta = await getAdminMeta();
      setRoles(meta.roles);
      setCities(meta.cities);

      if (isEdit) {
        const user = await getUserById(userId);
        if (!user) {
          navigate('/administration');
          return;
        }
        setForm({
          name: user.name,
          email: user.email,
          role: user.role,
          city: user.city,
          status: user.status
        });
      }
      setLoading(false);
    };
    load();
  }, [isEdit, navigate, userId]);

  const title = useMemo(() => (isEdit ? `Edit User ${userId}` : 'Add User'), [isEdit, userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    if (isEdit) {
      await updateUser(userId, form);
    } else {
      await createUser(form);
    }
    setSubmitting(false);
    navigate('/administration');
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading user form…</span>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>{title}</h2>
        </div>
        <Link to="/administration" className="tbl-btn">
          ← Back
        </Link>
      </div>

      <AdminCard title="Add/Edit User Form" subtitle="User identity, role, and city assignment management.">
        <UserForm
          form={form}
          roles={roles}
          cities={cities}
          errors={errors}
          onChange={(field, value) => {
            setForm((prev) => ({ ...prev, [field]: value }));
            setErrors((prev) => ({ ...prev, [field]: '' }));
          }}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </AdminCard>
    </div>
  );
}

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || '')) errors.email = 'Valid email required.';
  if (!values.role) errors.role = 'Role is required.';
  if (!values.city) errors.city = 'City is required.';
  if (!values.status) errors.status = 'Status is required.';
  return errors;
}

export default UserFormPage;
