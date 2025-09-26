import { AlertCircle, AlertTriangle, Calendar, CheckCircle, Layers, Shield, Wrench } from "lucide-react";
import { KPIData, ModalType } from "../utils/types/types";
import { KPICard } from "./KPICard";
import { StatCard } from "./StatCard";
import { complianceByArea, initialInspections, initialMaintenance, monthlyData } from "../utils/data";
import { CalendarWidget } from "./CalendarWidget";

export const ViewResumen: React.FC<{
  kpi: KPIData;
  onOpenDetail: (item: any, type: ModalType) => void;
}> = ({ kpi, onOpenDetail }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <KPICard
        title="Cumplimiento"
        value={`${kpi.inspectionCompliance}%`}
        icon={CheckCircle}
        color="bg-green-500"
        trend={5}
      />
      <KPICard
        title="Mantenimientos"
        value={`${kpi.maintenanceCompleted}/${kpi.maintenanceScheduled}`}
        icon={Wrench}
        color="bg-blue-500"
        subtitle="Realizados/Programados"
      />
      <KPICard
        title="Score Seguridad"
        value={kpi.safetyScore}
        icon={Shield}
        color="bg-purple-500"
        trend={2}
      />
      <KPICard
        title="Total Recursos"
        value={kpi.totalResources}
        icon={Layers}
        color="bg-indigo-500"
      />
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">
            Tendencia de Actividades
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-medium rounded-lg bg-green-100 text-green-700">
              Inspecciones
            </button>
            <button className="px-3 py-1 text-xs font-medium rounded-lg text-gray-600 hover:bg-gray-50">
              Mantenimientos
            </button>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-2">
          {monthlyData.map((data, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 flex-1 group"
            >
              <div className="relative w-full flex justify-center items-end gap-1">
                <div className="relative flex-1 max-w-[18px]">
                  <div
                    className="bg-green-500 rounded-t transition-all duration-300 group-hover:bg-green-600"
                    style={{ height: `${(data.inspections / 20) * 180}px` }}
                  />
                </div>
                <div className="relative flex-1 max-w-[18px]">
                  <div
                    className="bg-blue-500 rounded-t transition-all duration-300 group-hover:bg-blue-600"
                    style={{ height: `${(data.maintenance / 15) * 180}px` }}
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-600">
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <StatCard
          label="Inspecciones"
          value={kpi.monthlyInspections}
          change={12}
          icon={Calendar}
        />
        <StatCard
          label="Mantenimientos"
          value={`${kpi.maintenanceCompleted}/${kpi.maintenanceScheduled}`}
          change={8}
          icon={Wrench}
        />
        <StatCard
          label="Acciones Pendientes"
          value={kpi.pendingActions}
          change={-5}
          icon={AlertTriangle}
        />
        <StatCard
          label="Alertas Activas"
          value={kpi.activeAlerts}
          change={-15}
          icon={AlertCircle}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-6">
          Cumplimiento por Área
        </h3>
        <div className="space-y-4">
          {complianceByArea.map((area, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {area.area}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      area.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : area.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {area.resources}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {area.compliance}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    area.compliance >= 90
                      ? "bg-green-500"
                      : area.compliance >= 80
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${area.compliance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Calendario con aperturas de detalle */}
      <CalendarWidget
        monthDate={new Date()}
        setMonthDate={() => {}}
        inspections={initialInspections}
        maintenance={initialMaintenance}
        onOpenDetail={onOpenDetail}
      />
    </div>
  </div>
);