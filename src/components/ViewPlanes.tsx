import { Plus } from "lucide-react";

export const ViewPlanes: React.FC = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
          Planes de Acción
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Seguimiento y gestión de planes
        </p>
      </div>
      <button className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm">
        <Plus className="h-4 w-4" />
        Nuevo Plan
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {["Pendiente", "En Curso", "Completado"].map((status, idx) => (
        <div
          key={status}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-base">{status}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                idx === 0
                  ? "bg-yellow-100 text-yellow-700"
                  : idx === 1
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {idx === 0 ? "4" : idx === 1 ? "3" : "5"}
            </span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100"
              >
                <h4 className="font-medium text-gray-900 text-sm mb-2">
                  Plan de Acción {item}
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  Descripción del plan de acción
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Prioridad: Alta</span>
                  <span className="text-gray-500">15 Ene 2025</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);