import { useMemo } from "react";
import { ModalType, Resource } from "../utils/types/types";
import { EmptyState } from "./ui/Status";
import { HeaderList } from "./HeaderList";
import { FiltersBar } from "./FiltersBar";
import { Td, Th } from "./Table";

export const ViewRecursos: React.FC<{
  data: Resource[];
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  onOpenCreate: () => void;
  onOpenDetail: (item: Resource, type: ModalType) => void;
}> = ({
  data,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onOpenCreate,
  onOpenDetail,
}) => {
  const filtered = useMemo(() => {
    return data.filter((r) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.group.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  return (
    <div className="space-y-6">
      <HeaderList
        title="Recursos de Seguridad"
        subtitle="Gestión y monitoreo de recursos"
        onCreate={onOpenCreate}
        createLabel="Nuevo Recurso"
      />

      <FiltersBar
        search={search}
        onSearch={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        statusOptions={[
          { value: "all", label: "Todos los estados" },
          { value: "good", label: "Buen estado" },
          { value: "warning", label: "Advertencia" },
          { value: "critical", label: "Crítico" },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <Th>Estado</Th>
              <Th>Recurso</Th>
              <Th className="hidden sm:table-cell">Grupo</Th>
              <Th>Ubicación</Th>
              <Th className="hidden lg:table-cell">Condición</Th>
              <Th className="hidden xl:table-cell">Próximo Mant.</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((r) => (
              <tr
                key={r.id}
                onClick={() => onOpenDetail(r, "resource")}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Td>
                  <span
                    className={`w-3 h-3 rounded-full inline-block ${
                      r.status === "good"
                        ? "bg-green-500"
                        : r.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                </Td>
                <Td>
                  <div className="font-medium text-gray-900 text-sm">
                    {r.name}
                  </div>
                </Td>
                <Td className="hidden sm:table-cell">
                  <span className="px-2 py-1 text-gray-600 rounded text-xs font-medium">
                    {r.group}
                  </span>
                </Td>
                <Td className="text-sm text-gray-600">{r.location}</Td>
                <Td className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                      <div
                        className={`${
                          r.condition >= 90
                            ? "bg-green-500"
                            : r.condition >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        } h-2 rounded-full`}
                        style={{ width: `${r.condition}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {r.condition}%
                    </span>
                  </div>
                </Td>
                <Td className="text-sm text-gray-600 hidden xl:table-cell">
                  {r.nextMaintenance}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <EmptyState
            title="Sin resultados"
            subtitle="Ajuste los filtros o el término de búsqueda"
          />
        )}
      </div>
    </div>
  );
};