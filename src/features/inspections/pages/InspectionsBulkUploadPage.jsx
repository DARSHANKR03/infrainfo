import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import InspectionCard from '../components/InspectionCard';
import { bulkUploadInspections } from '../../../shared/services/mockApi/inspectionsApi';
import { parseInspectionCsv } from '../utils/parseInspectionCsv';

function InspectionsBulkUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [result, setResult] = useState(null);

  const previewRows = useMemo(() => rows.slice(0, 10), [rows]);

  const loadFile = async (file) => {
    if (!file) {
      return;
    }

    const text = await file.text();
    const parsed = parseInspectionCsv(text);
    setHeaders(parsed.headers);
    setRows(parsed.rows);
    setResult(null);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDragActive(false);
    await loadFile(event.dataTransfer.files?.[0]);
  };

  const handleImport = async () => {
    const response = await bulkUploadInspections(rows);
    setResult(response);
  };

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Bulk Inspection Upload</h2>
          <p>Import multiple inspection records in one operation.</p>
        </div>
        <Link to="/inspections" className="tbl-btn">← Back to Inspections</Link>
      </div>

      <InspectionCard title="CSV Dropzone" subtitle="Upload inspection CSV using drag and drop.">
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={[
            'flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors',
            dragActive ? 'upload-drop-active' : 'upload-drop-idle'
          ].join(' ')}
        >
          <p className="text-sm font-semibold text-primary-900">Drop inspection CSV here</p>
          <p className="mt-1 text-xs text-primary-500">or click to browse</p>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(event) => loadFile(event.target.files?.[0])}
          />
        </label>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            disabled={!rows.length}
            onClick={handleImport}
            className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Import Inspections
          </button>
          <span className="text-sm text-primary-500">{rows.length} rows ready</span>
        </div>
        {result ? (
          <p className="mt-2 text-sm text-success">
            Uploaded {result.uploaded} records, {result.failed} failed.
          </p>
        ) : null}
      </InspectionCard>

      <InspectionCard title="CSV Preview" subtitle="First 10 rows from uploaded file.">
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
                    key={`inspection-row-${rowIndex}`}
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
          <p className="text-sm text-primary-500">No file selected.</p>
        )}
      </InspectionCard>
    </div>
  );
}

export default InspectionsBulkUploadPage;

