import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import ReportCard from './ReportCard';

function MonthlyReportPreview({ data }) {
  return (
    <ReportCard
      title="Monthly Report Preview"
      subtitle={`Preview for ${data.month}`}
    >
      <article className="mx-auto max-w-5xl rounded-2xl border border-neutral-border bg-white p-6 print:max-w-none print:rounded-none print:border-0 print:p-8">
        <header className="border-b border-neutral-border pb-4">
          <h4 className="text-lg font-semibold text-primary-900">Municipal Infrastructure Monthly Report</h4>
          <p className="mt-1 text-sm text-primary-500">{data.month}</p>
        </header>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.summary.map((item) => (
            <article key={item.label} className="rounded-xl border border-neutral-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-primary-900">{item.value}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-xl border border-neutral-border bg-neutral-bg p-4">
          <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-500">
            Weekly Trend Snapshot
          </h5>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend}>
                <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#334155" />
                <YAxis yAxisId="left" stroke="#334155" />
                <YAxis yAxisId="right" orientation="right" stroke="#334155" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="health"
                  stroke="#3B82F6"
                  strokeWidth={3}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="alerts"
                  stroke="#EF4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <footer className="mt-6 border-t border-neutral-border pt-4">
          <p className="text-xs text-primary-500">
            Generated for internal municipal operations review.
          </p>
        </footer>
      </article>
      <div className="h-0 print:h-2">
      </div>
    </ReportCard>
  );
}

export default MonthlyReportPreview;

