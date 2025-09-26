import { Inspection, Maintenance, ModalType } from "../utils/types/types";

export const CalendarWidget: React.FC<{
  monthDate: Date;
  setMonthDate: (d: Date) => void;
  inspections: Inspection[];
  maintenance: Maintenance[];
  onOpenDetail: (item: any, type: ModalType) => void;
}> = ({ monthDate, setMonthDate, inspections, maintenance, onOpenDetail }) => {
  const daysInMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0
  ).getDate();
  const firstDay = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth(),
    1
  ).getDay(); // 0=Dom

  const getEventsForDay = (day: number) => {
    const dateStr = `${monthDate.getFullYear()}-${String(
      monthDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const events: any[] = [];
    inspections.forEach(
      (i) =>
        i.date === dateStr &&
        events.push({ ...i, eventType: "inspection" as const })
    );
    maintenance.forEach(
      (m) =>
        m.date === dateStr &&
        events.push({ ...m, eventType: "maintenance" as const })
    );
    return events;
  };

  const cells: React.ReactNode[] = [];
  for (let i = 0; i < firstDay; i++)
    cells.push(<div key={`empty-${i}`} className="h-20" />);
  for (let d = 1; d <= daysInMonth; d++) {
    const events = getEventsForDay(d);
    cells.push(
      <div
        key={d}
        className="h-20 border border-gray-100 p-1 hover:bg-gray-50 transition-colors"
      >
        <div className="text-xs font-medium text-gray-700 mb-1">{d}</div>
        <div className="space-y-0.5">
          {events.slice(0, 2).map((ev, idx) => (
            <div
              key={idx}
              className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer ${
                ev.eventType === "inspection"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-orange-100 text-orange-700"
              }`}
              onClick={() => onOpenDetail(ev, ev.eventType)}
            >
              {ev.title}
            </div>
          ))}
          {events.length > 2 && (
            <div className="text-xs text-gray-500">+{events.length - 2}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {monthDate.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setMonthDate(
                new Date(monthDate.getFullYear(), monthDate.getMonth() - 1)
              )
            }
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Mes anterior"
          >
            ←
          </button>
          <button
            onClick={() =>
              setMonthDate(
                new Date(monthDate.getFullYear(), monthDate.getMonth() + 1)
              )
            }
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Mes siguiente"
          >
            →
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <div
            key={d}
            className="text-xs font-semibold text-gray-600 text-center py-2"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
    </div>
  );
};