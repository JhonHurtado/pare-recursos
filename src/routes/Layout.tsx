import { ReactNode } from "react";
import { Sidebar } from "../components/ui/Sidebar";
import { SidebarItem } from "../utils/types/types";
import {
  BarChart3,
  Calendar,
  Shield,
  Wrench,
  FileText,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeView: string;
  onNavigate: (path: string) => void;
  onResetFilters: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarOpen,
  setSidebarOpen,
  activeView,
  onNavigate,
  onResetFilters,
}) => {
  const sidebarItems: SidebarItem[] = [
    { id: "resumen", label: "Dashboard", icon: BarChart3, },
    { id: "recursos", label: "Recursos", icon: Shield,  },
    { id: "inspecciones", label: "Inspecciones", icon: Calendar,  },
    { id: "mantenimientos", label: "Mantenimientos", icon: Wrench,  },
    { id: "planes", label: "Planes de Acción", icon: FileText,  },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        items={sidebarItems}
        active={activeView}
        onNavigate={onNavigate}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onResetFilters={onResetFilters}
      />

      <div className="lg:ml-64">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;