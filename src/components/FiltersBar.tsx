import { Search } from "lucide-react";

export const FiltersBar: React.FC<{
  search: string;
  onSearch: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  typeFilter?: string;
  onTypeChange?: (v: string) => void;
  statusOptions: { value: string; label: string }[];
  typeOptions?: { value: string; label: string }[];
}> = ({
  search,
  onSearch,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  statusOptions,
  typeOptions,
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="p-6 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {typeOptions && onTypeChange && (
          <select
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  </div>
);