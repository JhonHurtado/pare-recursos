
export type StatusCommon = "completed" | "in-progress" | "pending" | "scheduled";

export type ResourceStatus = "good" | "warning" | "critical";

export type Inspection = {
  id: number;
  title: string;
  type: "Mensual" | "Trimestral" | "Semestral" | "Anual";
  status: StatusCommon;
  date: string; // YYYY-MM-DD
  responsible: string;
  score: number | null;
  findings: number;
};

export type Maintenance = {
  id: number;
  title: string;
  type: "Preventivo" | "Correctivo" | "Mejora";
  status: StatusCommon;
  date: string;
  technician: string;
};

export type Resource = {
  id: number;
  name: string;
  group: string;
  status: ResourceStatus;
  nextMaintenance: string;
  location: string;
  lastInspection: string;
  condition: number; // 0-100
};

export type KPIData = {
  inspectionCompliance: number;
  maintenanceCompleted: number;
  maintenanceScheduled: number;
  pendingActions: number;
  completedActions: number;
  expiringResources: number;
  totalResources: number;
  activeAlerts: number;
  monthlyInspections: number;
  safetyScore: number;
  efficiency: number;
};

export type AlertItem = {
  id: number;
  message: string;
  type: "critical" | "warning" | "success" | "info";
  time: string;
};

export type AreaCompliance = {
  area: string;
  compliance: number;
  resources: number;
  priority: "high" | "medium" | "low";
};

export type SidebarItem = {
  id: ViewKey;
  label: string;
  icon: React.ComponentType<any>;
};

export type ViewKey =
  | "resumen"
  | "recursos"
  | "inspecciones"
  | "mantenimientos"
  | "planes";

export type ModalType = "inspection" | "maintenance" | "resource" | null;
