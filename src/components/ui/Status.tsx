import { STATUS_BADGE, STATUS_TEXT } from "../../utils/functions";
import { ResourceStatus, StatusCommon } from "../../utils/types/types";

export const BadgeStatus: React.FC<{
  status: StatusCommon | ResourceStatus;
}> = ({ status }) => (
  <span
    className={`px-2 py-1 rounded text-xs font-medium border ${
      STATUS_BADGE[status] ?? "bg-gray-100 text-gray-800 border-gray-200"
    }`}
  >
    {STATUS_TEXT[status] ?? status}
  </span>
);

export const DotStatus: React.FC<{ status: ResourceStatus }> = ({ status }) => (
  <span className="inline-flex items-center gap-2">
    <span
      className={`w-3 h-3 rounded-full ${
        status === "good"
          ? "bg-green-500"
          : status === "warning"
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
    />
    <span className="text-sm text-gray-700 capitalize">{status}</span>
  </span>
);

export const EmptyState: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="p-6 text-center border border-dashed border-gray-300 rounded-xl bg-white">
    <h4 className="font-semibold text-gray-900">{title}</h4>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </div>
);
