import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import {
  initialInspections,
  initialKpi,
  initialMaintenance,
  initialResources,
} from '../utils/data'
import DashboardLayout from './Layout';
import { ViewResumen } from '../components/ViewResumen';
import { ViewRecursos } from '../components/ViewRecursos';
import { ViewInspecciones } from '../components/ViewInspecciones';
import { ViewMantenimientos } from '../components/ViewMantenimientos';
import { ViewPlanes } from '../components/ViewPlanes';
import { DetailModal } from '../components/DetailModal';
import { Inspection, StatusCommon } from '../utils/types/types';

const DashboardWrapper = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Todo tu estado aquí
    const [kpiData] = useState(initialKpi);
    const [resources, setResources] = useState(initialResources);
    const [inspections, setInspections] = useState(initialInspections);
    const [maintenance, setMaintenance] = useState(initialMaintenance);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const [selectedDetail, setSelectedDetail] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<any>(null);

    // Determinar vista activa
    const getActiveView = () => {
        const path = location.pathname;
        if (path.includes('recursos')) return 'recursos';
        if (path.includes('inspecciones')) return 'inspecciones';
        if (path.includes('mantenimientos')) return 'mantenimientos';
        if (path.includes('planes')) return 'planes';
        return 'resumen';
    };

    const activeView = getActiveView();

    const onResetFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setTypeFilter("all");
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        onResetFilters();
    };

    const openDetail = (item: any, type: any) => {
        setSelectedDetail(item);
        setModalType(type);
        setShowModal(true);
    };

    const openCreateModal = (type: any) => {
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
                status: "scheduled" as StatusCommon,
                date: payload.date,
                responsible: payload.responsible ?? "Por asignar",
                score: null,
                findings: 0,
            };
            setInspections((s) => [newItem, ...s]);
        } else if (modalType === "maintenance") {
            const newItem = {
                id: maintenance.length + 1,
                title: payload.title,
                type: payload.type,
                status: "pending" as StatusCommon,
                date: payload.date,
                technician: payload.technician ?? "Por asignar",
            };
            setMaintenance((s) => [newItem, ...s]);
        } else if (modalType === "resource") {
            const newItem = {
                id: resources.length + 1,
                name: payload.name,
                group: payload.group,
                status: "good" as const,
                nextMaintenance: payload.nextMaintenance,
                location: payload.location,
                lastInspection: new Date().toISOString().slice(0, 10),
                condition: 100,
            };
            setResources((s) => [newItem, ...s]);
        }
        closeModal();
    };

    return (
        <>
            <DashboardLayout
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeView={activeView}
                onNavigate={handleNavigate}
                onResetFilters={onResetFilters}
            >
                <Routes>
                    <Route index element={
                        <ViewResumen 
                            kpi={kpiData} 
                            onOpenDetail={openDetail} 
                        />
                    } />
                    <Route path="/resumen" element={
                        <ViewResumen 
                            kpi={kpiData} 
                            onOpenDetail={openDetail} 
                        />
                    } />
                    <Route path="/recursos" element={
                        <ViewRecursos
                            data={resources}
                            search={searchTerm}
                            setSearch={setSearchTerm}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            onOpenCreate={() => openCreateModal("resource")}
                            onOpenDetail={(item) => openDetail(item, "resource")}
                        />
                    } />
                    <Route path="/inspecciones" element={
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
                    } />
                    <Route path="/mantenimientos" element={
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
                    } />
                    <Route path="/planes" element={<ViewPlanes />} />
                </Routes>
            </DashboardLayout>

            <DetailModal
                open={showModal}
                onClose={closeModal}
                modalType={modalType}
                selected={selectedDetail}
                onCreate={handleCreate}
            />
        </>
    )
}

export default DashboardWrapper;