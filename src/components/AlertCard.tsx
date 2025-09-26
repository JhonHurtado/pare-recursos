import { AlertItem } from "../utils/types/types";

export const AlertCard: React.FC<{ alert: AlertItem }> = ({ alert }) => {
  const style =
    alert.type === "critical"
      ? "bg-red-50 border-red-200 text-red-900"
      : alert.type === "warning"
      ? "bg-yellow-50 border-yellow-200 text-yellow-900"
      : alert.type === "success"
      ? "bg-green-50 border-green-200 text-green-900"
      : "bg-blue-50 border-blue-200 text-blue-900";
  const Icon =
    alert.type === "critical"
      ? AlertTriangle
      : alert.type === "warning"
      ? Clock
      : alert.type === "success"
      ? CheckCircle
      : AlertCircle;
  return (
    <div className={`p-3 rounded-lg border ${style}`}>
      <div className="flex items-start gap-2">
        <Icon className="h-4 w-4" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{alert.message}</p>
          <p className="text-xs opacity-70 mt-1">hace {alert.time}</p>
        </div>
      </div>
    </div>
  );
};