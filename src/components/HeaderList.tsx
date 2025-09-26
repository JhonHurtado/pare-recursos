import { Plus } from "lucide-react";

export const HeaderList: React.FC<{
  title: string;
  subtitle?: string;
  onCreate: () => void;
  createLabel: string;
}> = ({ title, subtitle, onCreate, createLabel }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    <button
      onClick={onCreate}
      className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
    >
      <Plus className="h-4 w-4" />
      {createLabel}
    </button>
  </div>
);