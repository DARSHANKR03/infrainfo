import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AssetForm from '../components/AssetForm';
import SectionCard from '../components/SectionCard';
import {
  createAsset,
  getAssetById,
  updateAsset
} from '../../../shared/services/mockApi/assetsApi';

const defaultForm = {
  assetName: '',
  assetType: '',
  category: '',
  city: '',
  zone: '',
  ward: '',
  installationDate: '',
  expectedLifespan: '',
  status: '',
  tags: ''
};

function AssetFormPage() {
  const { assetId } = useParams();
  const isEditMode = Boolean(assetId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const loadAsset = async () => {
      const asset = await getAssetById(assetId);
      if (!asset) {
        navigate('/assets');
        return;
      }

      setFormData({
        ...asset,
        expectedLifespan: String(asset.expectedLifespan),
        tags: asset.tags.join(', ')
      });
      setIsLoading(false);
    };

    loadAsset();
  }, [assetId, isEditMode, navigate]);

  const pageTitle = useMemo(
    () => (isEditMode ? `Edit Asset ${assetId}` : 'Add New Asset'),
    [assetId, isEditMode]
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      expectedLifespan: Number(formData.expectedLifespan),
      tags: String(formData.tags)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    };

    if (isEditMode) {
      await updateAsset(assetId, payload);
    } else {
      await createAsset(payload);
    }

    setIsSubmitting(false);
    navigate('/assets');
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading asset details…</span>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>{pageTitle}</h2>
        </div>
        <Link to="/assets" className="tbl-btn">
          ← Back to Assets
        </Link>
      </div>

      <SectionCard
        title="Asset Details"
        subtitle="Capture infrastructure metadata for inventory and lifecycle management."
        className="shadow-lg"
      >
        <AssetForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel={isEditMode ? 'Update Asset' : 'Create Asset'}
        />
      </SectionCard>
    </div>
  );
}

function validate(data) {
  const errors = {};

  if (!data.assetName.trim()) errors.assetName = 'Asset name is required.';
  if (!data.assetType.trim()) errors.assetType = 'Asset type is required.';
  if (!data.category.trim()) errors.category = 'Category is required.';
  if (!data.city.trim()) errors.city = 'City is required.';
  if (!data.zone.trim()) errors.zone = 'Zone is required.';
  if (!data.ward.trim()) errors.ward = 'Ward is required.';
  if (!data.installationDate)
    errors.installationDate = 'Installation date is required.';
  if (!data.expectedLifespan || Number(data.expectedLifespan) <= 0) {
    errors.expectedLifespan = 'Expected lifespan must be greater than 0.';
  }
  if (!data.status) errors.status = 'Status is required.';

  return errors;
}

export default AssetFormPage;

