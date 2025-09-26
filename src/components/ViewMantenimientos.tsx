import { useMemo } from "react";
import { Maintenance, ModalType, StatusCommon } from "../utils/types/types";
import { BadgeStatus, EmptyState } from "./ui/Status";
import { HeaderList } from "./HeaderList";
import { FiltersBar } from "./FiltersBar";
import { Td, Th } from "./Table";

export const ViewMantenimientos: React.FC<{
  data: Maintenance[];
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  onOpenCreate: () => void;
  onOpenDetail: (item: Maintenance, type: ModalType) => void;
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
    return data.filter((m) => {
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.technician.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" || m.status === (statusFilter as StatusCommon);
      const matchesType = typeFilter === "all" || m.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [data, search, statusFilter, typeFilter]);

  return (
    <div className="space-y-6">
      <HeaderList
        title="Mantenimientos"
        subtitle="Programación y seguimiento"
        onCreate={onOpenCreate}
        createLabel="Programar Mantenimiento"
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
          { value: "scheduled", label: "Programado" },
        ]}
        typeOptions={[
          { value: "all", label: "Todos los tipos" },
          { value: "Preventivo", label: "Preventivo" },
          { value: "Correctivo", label: "Correctivo" },
          { value: "Mejora", label: "Mejora" },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <Th>Estado</Th>
              <Th>Actividad</Th>
              <Th className="hidden sm:table-cell">Tipo</Th>
              <Th className="hidden lg:table-cell">Técnico</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((m) => (
              <tr
                key={m.id}
                onClick={() => onOpenDetail(m, "maintenance")}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Td>
                  <BadgeStatus status={m.status} />
                </Td>
                <Td>
                  <div className="font-medium text-gray-900 text-sm">
                    {m.title}
                  </div>
                  <div className="text-xs text-gray-500">{m.date}</div>
                </Td>
                <Td className="hidden sm:table-cell">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      m.type === "Preventivo"
                        ? "bg-green-100 text-green-700"
                        : m.type === "Correctivo"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {m.type}
                  </span>
                </Td>
                <Td className="text-sm text-gray-600 hidden lg:table-cell">
                  {m.technician}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <EmptyState
            title="Sin mantenimientos"
            subtitle="No se encontraron resultados con los filtros actuales"
          />
        )}
      </div>
    </div>
  );
};