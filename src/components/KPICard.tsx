import { TrendingDown, TrendingUp } from "lucide-react";

export const KPICard: React.FC<{
  title: string;
  value: string | number;
  icon: any;
  color: string;
  subtitle?: string;
  trend?: number;
}> = ({ title, value, icon: Icon, color, subtitle, trend }) => (
  <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1">
          {title}
        </p>
        <p className="text-xl lg:text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        {typeof trend === "number" && (
          <div
            className={`flex items-center gap-1 mt-2 ${
              trend > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend > 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span className="text-xs font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
      </div>
    </div>
  </div>
);
