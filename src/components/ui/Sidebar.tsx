import { Shield, X } from "lucide-react";
import { SidebarItem, ViewKey } from "../../utils/types/types";

export const Sidebar: React.FC<{
  items: SidebarItem[];
  onChange: (v: ViewKey) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  onResetFilters: () => void;
}> = ({ items, onChange, open, setOpen, onResetFilters }) => (
  <>
    {open && (
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setOpen(false)}
      />
    )}
    <aside
      className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-50 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900">SG-SST</span>
              <p className="text-xs text-gray-500">Safety First</p>
            </div>
          </div>
          <button
            className="lg:hidden"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <nav className="space-y-2">
          {items.map((it) => (
            <a
              key={it.id}
              href={`/${it.id}`}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium $`}
            >
              <it.icon className="h-5 w-5" />
              <span>{it.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  </>
);