import React, { Children, useState } from "react";
import {
  BarChart3,
  Calendar,
  Shield,
  Wrench,
  FileText,
} from "lucide-react";
import {
  Inspection,
  KPIData,
  Maintenance,
  ModalType,
  Resource,
  SidebarItem,
  ViewKey,
} from "../utils/types/types";
import {
  initialInspections,
  initialKpi,
  initialMaintenance,
  initialResources,
} from "../utils/data";
import { exportCSV } from "../utils/functions";
import { ViewResumen } from "./ViewResumen";
import { ViewRecursos } from "./ViewRecursos";
import { ViewInspecciones } from "./ViewInspecciones";
import { ViewMantenimientos } from "./ViewMantenimientos";
import { ViewPlanes } from "./ViewPlanes";
import { DetailModal } from "./DetailModal";
import { Sidebar } from "./ui/Sidebar";

const Dashboard: React.FC = () => {
  // Estado de datos (simula un store local)
  const [kpiData] = useState<KPIData>(initialKpi);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [inspections, setInspections] =
    useState<Inspection[]>(initialInspections);
  const [maintenance, setMaintenance] =
    useState<Maintenance[]>(initialMaintenance);

  // Navegación & filtros
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewKey>("resumen");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Modal
  const [selectedDetail, setSelectedDetail] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const sidebarItems: SidebarItem[] = [
    { id: "resumen", label: "Dashboard", icon: BarChart3 },
    { id: "recursos", label: "Recursos", icon: Shield },
    { id: "inspecciones", label: "Inspecciones", icon: Calendar },
    { id: "mantenimientos", label: "Mantenimientos", icon: Wrench },
    { id: "planes", label: "Planes de Acción", icon: FileText },
  ];

  const onResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
  };

  const openDetail = (item: any, type: ModalType) => {
    setSelectedDetail(item);
    setModalType(type);
    setShowModal(true);
  };

  const openCreateModal = (type: ModalType) => {
    setSelectedDetail(null);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDetail(null);
    setModalType(null);
  };

  const handleCreate = (payload: any) => {
    if (modalType === "inspection") {
      const newItem: Inspection = {
        id: inspections.length + 1,
        title: payload.title,
        type: payload.type,
        status: "scheduled",
        date: payload.date,
        responsible: payload.responsible ?? "Por asignar",
        score: null,
        findings: 0,
      };
      setInspections((s) => [newItem, ...s]);
    } else if (modalType === "maintenance") {
      const newItem: Maintenance = {
        id: maintenance.length + 1,
        title: payload.title,
        type: payload.type,
        status: "pending",
        date: payload.date,
        technician: payload.technician ?? "Por asignar",
      };
      setMaintenance((s) => [newItem, ...s]);
    } else if (modalType === "resource") {
      const newItem: Resource = {
        id: resources.length + 1,
        name: payload.name,
        group: payload.group,
        status: "good",
        nextMaintenance: payload.nextMaintenance,
        location: payload.location,
        lastInspection: new Date().toISOString().slice(0, 10),
        condition: 100,
      };
      setResources((s) => [newItem, ...s]);
    }
    closeModal();
  };

  const handleExport = () => {
    switch (activeView) {
      case "recursos":
        return exportCSV(resources as any, "recursos");
      case "inspecciones":
        return exportCSV(inspections as any, "inspecciones");
      case "mantenimientos":
        return exportCSV(maintenance as any, "mantenimientos");
      default:
        return exportCSV(
          [
            { kpi: "Cumplimiento", valor: kpiData.inspectionCompliance },
            {
              kpi: "Mantenimientos (R/P)",
              valor: `${kpiData.maintenanceCompleted}/${kpiData.maintenanceScheduled}`,
            },
            { kpi: "Score Seguridad", valor: kpiData.safetyScore },
            { kpi: "Total Recursos", valor: kpiData.totalResources },
          ],
          "resumen"
        );
    }
  };

  const renderView = () => {
    if (activeView === "resumen") {
      return <ViewResumen kpi={kpiData} onOpenDetail={openDetail} />;
    }
    if (activeView === "recursos") {
      return (
        <ViewRecursos
          data={resources}
          search={searchTerm}
          setSearch={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onOpenCreate={() => openCreateModal("resource")}
          onOpenDetail={(item) => openDetail(item, "resource")}
        />
      );
    }
    if (activeView === "inspecciones") {
      return (
        <ViewInspecciones
          data={inspections}
          search={searchTerm}
          setSearch={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          onOpenCreate={() => openCreateModal("inspection")}
          onOpenDetail={(item) => openDetail(item, "inspection")}
        />
      );
    }
    if (activeView === "mantenimientos") {
      return (
        <ViewMantenimientos
          data={maintenance}
          search={searchTerm}
          setSearch={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          onOpenCreate={() => openCreateModal("maintenance")}
          onOpenDetail={(item) => openDetail(item, "maintenance")}
        />
      );
    }
    return <ViewPlanes />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        items={sidebarItems}
        active={activeView}
        onChange={setActiveView}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onResetFilters={onResetFilters}
      />

      <div className="lg:ml-64">
       
        {Children}
      </div>

      <DetailModal
        open={showModal}
        onClose={closeModal}
        modalType={modalType}
        selected={selectedDetail}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Dashboard;
