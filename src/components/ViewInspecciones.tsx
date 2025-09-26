import { useMemo } from "react";
import { Inspection, ModalType, StatusCommon } from "../utils/types/types";
import { BadgeStatus, EmptyState } from "./ui/Status";
import { HeaderList } from "./HeaderList";
import { FiltersBar } from "./FiltersBar";
import { Td, Th } from "./Table";

export const ViewInspecciones: React.FC<{
  data: Inspection[];
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  onOpenCreate: () => void;
  onOpenDetail: (item: Inspection, type: ModalType) => void;
}> = ({
  data,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  onOpenCreate,
  onOpenDetail,
}) => {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((i) => {
      const matchesSearch =
        !q ||
        i.title.toLowerCase().includes(q) ||
        i.responsible.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" || i.status === (statusFilter as StatusCommon);
      const matchesType = typeFilter === "all" || i.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [data, search, statusFilter, typeFilter]);

  return (
    <div className="space-y-6">
      <HeaderList
        title="Inspecciones"
        subtitle="Control de calidad y cumplimiento"
        onCreate={onOpenCreate}
        createLabel="Nueva Inspección"
      />

      <FiltersBar
        search={search}
        onSearch={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        statusOptions={[
          { value: "all", label: "Todos" },
          { value: "completed", label: "Completado" },
          { value: "in-progress", label: "En Curso" },
          { value: "pending", label: "Pendiente" },
        ]}
        typeOptions={[
          { value: "all", label: "Todos los tipos" },
          { value: "Mensual", label: "Mensual" },
          { value: "Trimestral", label: "Trimestral" },
          { value: "Semestral", label: "Semestral" },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <Th>Estado</Th>
              <Th>Inspección</Th>
              <Th className="hidden sm:table-cell">Tipo</Th>
              <Th className="hidden lg:table-cell">Responsable</Th>
              <Th>Score</Th>
              <Th className="hidden xl:table-cell">Hallazgos</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((i) => (
              <tr
                key={i.id}
                onClick={() => onOpenDetail(i, "inspection")}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Td>
                  <BadgeStatus status={i.status} />
                </Td>
                <Td>
                  <div className="font-medium text-gray-900 text-sm">
                    {i.title}
                  </div>
                  <div className="text-xs text-gray-500">{i.date}</div>
                </Td>
                <Td className="hidden sm:table-cell">
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
                    {i.type}
                  </span>
                </Td>
                <Td className="text-sm text-gray-600 hidden lg:table-cell">
                  {i.responsible}
                </Td>
                <Td>
                  {typeof i.score === "number" ? (
                    <span
                      className={`font-semibold text-sm ${
                        i.score >= 90
                          ? "text-green-600"
                          : i.score >= 70
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {i.score}%
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </Td>
                <Td className="hidden xl:table-cell">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                    {i.findings}
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <EmptyState
            title="Sin inspecciones"
            subtitle="No se encontraron resultados con los filtros actuales"
          />
        )}
      </div>
    </div>
  );
};