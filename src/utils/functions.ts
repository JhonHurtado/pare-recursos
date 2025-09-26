
export const STATUS_BADGE: Record<string, string> = {
  completed: "bg-green-100 text-green-800 border-green-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  scheduled: "bg-purple-100 text-purple-800 border-purple-200",
  good: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  critical: "bg-red-100 text-red-800 border-red-200",
};

export const STATUS_TEXT: Record<string, string> = {
  completed: "Completado",
  "in-progress": "En Curso",
  pending: "Pendiente",
  scheduled: "Programado",
};

export const formatPercent = (n: number | null | undefined) =>
  typeof n === "number" && !Number.isNaN(n) ? `${n}%` : "-";

export const exportCSV = (rows: Record<string, any>[], filename: string) => {
  if (!rows?.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      headers.map((h) => JSON.stringify(r[h] ?? "")).join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};