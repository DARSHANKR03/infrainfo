import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import { bulkUploadAssets } from '../../../shared/services/mockApi/assetsApi';
import { parseCsvText } from '../utils/parseCsvText';

function AssetsBulkUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [result, setResult] = useState(null);

  const previewRows = useMemo(() => rows.slice(0, 10), [rows]);

  const handleFile = async (file) => {
    if (!file) {
      return;
    }

    const text = await file.text();
    const parsed = parseCsvText(text);

    setHeaders(parsed.headers);
    setRows(parsed.rows);
    setResult(null);
  };

  const onDrop = async (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    await handleFile(file);
  };

  const onUpload = async () => {
    if (!rows.length) {
      return;
    }

    const response = await bulkUploadAssets(rows);
    setResult(response);
  };

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Bulk Upload Assets</h2>
          <p>Import asset records using CSV and validate before ingestion.</p>
        </div>
        <Link to="/assets" className="tbl-btn">← Back to Assets</Link>
      </div>

      <SectionCard title="CSV Upload">
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          className={[
            'flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 text-center ds-transition',
            dragActive
              ? 'upload-drop-active'
              : 'upload-drop-idle'
          ].join(' ')}
        >
          <p className="text-sm font-semibold text-primary-900">Drag and drop CSV file here</p>
          <p className="mt-1 text-xs text-primary-500">or click to choose a file</p>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </label>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onUpload}
            disabled={!rows.length}
            className="ui-btn ui-btn-primary"
          >
            Import Records
          </button>
          <span className="text-sm text-primary-700">{rows.length} rows ready</span>
        </div>

        {result ? (
          <p className="mt-3 text-sm text-success">
            Upload complete. {result.uploaded} records imported, {result.failed} failed.
          </p>
        ) : null}
      </SectionCard>

      <SectionCard title="CSV Preview" subtitle="Showing first 10 records from uploaded file.">
        {previewRows.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-neutral-border">
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row, rowIndex) => (
                  <tr
                    key={`row-${rowIndex}`}
                    className="border-b border-neutral-border text-sm text-primary-700"
                  >
                    {headers.map((header) => (
                      <td key={`${rowIndex}-${header}`} className="px-3 py-2">
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-primary-500">No CSV loaded yet.</p>
        )}
      </SectionCard>
    </div>
  );
}

export default AssetsBulkUploadPage;

