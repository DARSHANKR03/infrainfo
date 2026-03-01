import { useState } from 'react';

function PhotoUploadPlaceholder({ files, onChange }) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(event.dataTransfer.files || []);
    if (droppedFiles.length) {
      onChange(droppedFiles);
    }
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={onDrop}
      className={[
        'rounded-2xl border-2 border-dashed p-4 ds-transition',
        dragActive
          ? 'border-accent-300 bg-accent-300/20 shadow-lg shadow-accent-400/20'
          : 'border-neutral-border bg-neutral-bg hover:border-accent-300 hover:bg-accent-300/10'
      ].join(' ')}
    >
      <p className="text-sm font-semibold text-primary-900">Photo Upload Placeholder</p>
      <p className="mt-1 text-xs text-primary-500">
        Attach images from site inspection for visual documentation.
      </p>

      <label className="mt-3 inline-block cursor-pointer rounded-xl border border-neutral-border bg-white px-3 py-2 text-sm text-primary-700 hover:bg-accent-300/20 ds-transition">
        Choose Files
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(event) => onChange(Array.from(event.target.files || []))}
        />
      </label>

      {files.length ? (
        <ul className="mt-3 space-y-1">
          {files.map((file) => (
            <li key={file.name} className="text-xs text-primary-700">
              {file.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs text-primary-500">No photos selected yet.</p>
      )}
    </div>
  );
}

export default PhotoUploadPlaceholder;
