type Column = {
  name: string;
  description: string;
};

export default function ComparePanel({
  columns,
  note,
}: {
  columns: [Column, Column];
  note: string;
}) {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2">
        {columns.map((column) => (
          <div
            key={column.name}
            className="rounded-2xl border border-border-soft bg-white p-8"
          >
            <h3 className="text-xl font-semibold text-navy">{column.name}</h3>
            <p className="mt-3 text-sm leading-6 text-navy/70">
              {column.description}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm leading-6 text-navy/60">{note}</p>
    </div>
  );
}
