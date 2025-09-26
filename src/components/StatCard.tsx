export const StatCard: React.FC<{
  label: string;
  value: string | number;
  change?: number;
  icon: any;
}> = ({ label, value, change, icon: Icon }) => (
  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-all">
    <div className="p-2 bg-gray-50 rounded-lg">
      <Icon className="h-4 w-4 text-gray-600" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-base font-bold text-gray-900">{value}</p>
    </div>
    {typeof change === "number" && (
      <div
        className={`text-xs font-bold ${
          change > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {change > 0 ? "+" : ""}
        {change}%
      </div>
    )}
  </div>
);
