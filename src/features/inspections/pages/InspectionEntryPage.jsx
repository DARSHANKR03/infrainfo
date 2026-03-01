import { useEffect, useMemo, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DynamicParameterFields from '../components/DynamicParameterFields';
import InspectionCard from '../components/InspectionCard';
import PhotoUploadPlaceholder from '../components/PhotoUploadPlaceholder';
import {
  getInspectionFormMeta,
  submitInspection
} from '../../../shared/services/mockApi/inspectionsApi';

const initialState = {
  assetId: '',
  assetName: '',
  assetType: '',
  zone: '',
  inspectionDate: '',
  inspectionType: 'Routine',
  inspectorName: '',
  remarks: '',
  parameters: {},
  photos: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'set_field':
      return { ...state, [action.field]: action.value };
    case 'set_parameters':
      return { ...state, parameters: action.value };
    case 'set_parameter':
      return {
        ...state,
        parameters: { ...state.parameters, [action.key]: action.value }
      };
    case 'set_photos':
      return { ...state, photos: action.value };
    case 'reset':
      return { ...initialState, inspectionDate: state.inspectionDate };
    default:
      return state;
  }
}

function InspectionEntryPage() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    inspectionDate: new Date().toISOString().slice(0, 10)
  });
  const [errors, setErrors] = useState({});
  const [meta, setMeta] = useState({ assets: [], parametersByType: {} });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');

  useEffect(() => {
    const loadMeta = async () => {
      const result = await getInspectionFormMeta();
      setMeta(result);
    };

    loadMeta();
  }, []);

  const activeParameters = useMemo(
    () => meta.parametersByType[state.assetType] || [],
    [meta.parametersByType, state.assetType]
  );

  const onAssetChange = (assetId) => {
    const selectedAsset = meta.assets.find((asset) => asset.id === assetId);

    if (!selectedAsset) {
      dispatch({ type: 'set_field', field: 'assetId', value: '' });
      dispatch({ type: 'set_field', field: 'assetName', value: '' });
      dispatch({ type: 'set_field', field: 'assetType', value: '' });
      dispatch({ type: 'set_field', field: 'zone', value: '' });
      dispatch({ type: 'set_parameters', value: {} });
      return;
    }

    dispatch({ type: 'set_field', field: 'assetId', value: selectedAsset.id });
    dispatch({ type: 'set_field', field: 'assetName', value: selectedAsset.name });
    dispatch({ type: 'set_field', field: 'assetType', value: selectedAsset.assetType });
    dispatch({ type: 'set_field', field: 'zone', value: selectedAsset.zone });
    dispatch({ type: 'set_parameters', value: {} });
  };

  const onAssetTypeChange = (assetType) => {
    dispatch({ type: 'set_field', field: 'assetType', value: assetType });
    dispatch({ type: 'set_parameters', value: {} });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(state, activeParameters);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const response = await submitInspection({
      ...state,
      photos: state.photos.map((file) => file.name)
    });

    setIsSubmitting(false);
    setSubmitSuccess(`Inspection ${response.id} saved successfully.`);
    dispatch({ type: 'reset' });
  };

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Manual Inspection Form</h2>
          <p>Record field observations with dynamic technical parameters.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/inspections" className="tbl-btn">← Back</Link>
          <button type="button" onClick={() => navigate('/inspections/bulk-upload')} className="tbl-btn">Bulk Upload</button>
        </div>
      </div>

      <InspectionCard title="Inspection Details">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field label="Asset" error={errors.assetId}>
              <select
                value={state.assetId}
                onChange={(event) => onAssetChange(event.target.value)}
                className={inputClass(errors.assetId)}
              >
                <option value="">Select asset</option>
                {meta.assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.id} - {asset.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Asset Type" error={errors.assetType}>
              <select
                value={state.assetType}
                onChange={(event) => onAssetTypeChange(event.target.value)}
                className={inputClass(errors.assetType)}
              >
                <option value="">Select asset type</option>
                {Object.keys(meta.parametersByType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Zone">
              <input value={state.zone} readOnly className={inputClass()} />
            </Field>

            <Field label="Inspection Date" error={errors.inspectionDate}>
              <input
                type="date"
                value={state.inspectionDate}
                onChange={(event) =>
                  dispatch({
                    type: 'set_field',
                    field: 'inspectionDate',
                    value: event.target.value
                  })
                }
                className={inputClass(errors.inspectionDate)}
              />
            </Field>

            <Field label="Inspection Type">
              <select
                value={state.inspectionType}
                onChange={(event) =>
                  dispatch({
                    type: 'set_field',
                    field: 'inspectionType',
                    value: event.target.value
                  })
                }
                className={inputClass()}
              >
                <option value="Routine">Routine</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
              </select>
            </Field>

            <Field label="Inspector Name" error={errors.inspectorName}>
              <input
                value={state.inspectorName}
                onChange={(event) =>
                  dispatch({
                    type: 'set_field',
                    field: 'inspectorName',
                    value: event.target.value
                  })
                }
                className={inputClass(errors.inspectorName)}
              />
            </Field>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-500">
              Dynamic Parameters
            </h4>
            <DynamicParameterFields
              parameters={activeParameters}
              values={state.parameters}
              errors={errors.parameters || {}}
              onParameterChange={(key, value) =>
                dispatch({ type: 'set_parameter', key, value })
              }
            />
          </div>

          <PhotoUploadPlaceholder
            files={state.photos}
            onChange={(files) => dispatch({ type: 'set_photos', value: files })}
          />

          <Field label="Remarks" error={errors.remarks}>
            <textarea
              value={state.remarks}
              onChange={(event) =>
                dispatch({
                  type: 'set_field',
                  field: 'remarks',
                  value: event.target.value
                })
              }
              rows={4}
              placeholder="Enter field notes, defects observed, and recommendations..."
              className={inputClass(errors.remarks)}
            />
          </Field>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-accent-gradient px-4 py-2 text-sm font-semibold text-white shadow-lg ds-press ds-transition hover:opacity-95 disabled:opacity-60"
            >
              {isSubmitting ? 'Saving...' : 'Submit Inspection'}
            </button>
            {submitSuccess ? <p className="text-sm text-success">{submitSuccess}</p> : null}
          </div>
        </form>
      </InspectionCard>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-primary-700">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-danger">{error}</span> : null}
    </label>
  );
}

function inputClass(hasError) {
  return [
    'w-full rounded-xl border bg-white px-3 py-2 text-sm text-primary-900 outline-none ds-transition hover:shadow-lg',
    hasError
      ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/25'
      : 'border-neutral-border focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30'
  ].join(' ');
}

function validate(formState, parameters) {
  const errors = {};
  if (!formState.assetId) errors.assetId = 'Asset is required.';
  if (!formState.assetType) errors.assetType = 'Asset type is required.';
  if (!formState.inspectionDate) errors.inspectionDate = 'Inspection date is required.';
  if (!formState.inspectorName.trim()) errors.inspectorName = 'Inspector name is required.';
  if (!formState.remarks.trim()) errors.remarks = 'Remarks are required.';

  const parameterErrors = {};
  parameters.forEach((parameter) => {
    const rawValue = formState.parameters[parameter.key];
    if (rawValue === undefined || rawValue === '') {
      parameterErrors[parameter.key] = 'Value is required.';
      return;
    }

    const numericValue = Number(rawValue);
    if (Number.isNaN(numericValue)) {
      parameterErrors[parameter.key] = 'Must be a number.';
      return;
    }

    if (numericValue < parameter.min || numericValue > parameter.max) {
      parameterErrors[parameter.key] = `Range ${parameter.min}-${parameter.max}`;
    }
  });

  if (Object.keys(parameterErrors).length) {
    errors.parameters = parameterErrors;
  }

  return errors;
}

export default InspectionEntryPage;
