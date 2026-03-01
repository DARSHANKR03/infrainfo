import { useState } from 'react';
import ReportCard from './ReportCard';

function ReportSchedulingForm() {
  const [form, setForm] = useState({
    reportType: 'Monthly Infrastructure Health Report',
    frequency: 'Monthly',
    time: '09:00',
    recipients: 'ops@city.gov, engineering@city.gov'
  });

  return (
    <ReportCard title="Report Scheduling Form" subtitle="Configure periodic report generation and distribution.">
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Report Type">
          <input
            value={form.reportType}
            onChange={(event) => setForm((prev) => ({ ...prev, reportType: event.target.value }))}
            className="w-full rounded-lg border border-neutral-border px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Frequency">
          <select
            value={form.frequency}
            onChange={(event) => setForm((prev) => ({ ...prev, frequency: event.target.value }))}
            className="w-full rounded-lg border border-neutral-border px-3 py-2 text-sm"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </Field>
        <Field label="Schedule Time">
          <input
            type="time"
            value={form.time}
            onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
            className="w-full rounded-lg border border-neutral-border px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Recipients">
          <input
            value={form.recipients}
            onChange={(event) => setForm((prev) => ({ ...prev, recipients: event.target.value }))}
            className="w-full rounded-lg border border-neutral-border px-3 py-2 text-sm"
          />
        </Field>
      </form>

      <button
        type="button"
        className="mt-4 rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-400"
      >
        Save Schedule
      </button>
    </ReportCard>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-primary-700">{label}</span>
      {children}
    </label>
  );
}

export default ReportSchedulingForm;

