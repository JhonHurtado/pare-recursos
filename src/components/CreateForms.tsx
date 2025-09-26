import { useState } from "react";
import { ModalType } from "../utils/types/types";

export const CreateForms: React.FC<{
  modalType: ModalType;
  onCancel: () => void;
  onSubmit: (payload: any) => void;
}> = ({ modalType, onCancel, onSubmit }) => {
  const [form, setForm] = useState<Record<string, any>>({});
  const update = (k: string, v: any) => setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = () => {
    if (!modalType) return;
    // Validaciones mínimas
    if (!form.title && !form.name)
      return alert("Por favor complete el formulario.");
    onSubmit({ ...form, createdAt: new Date().toISOString() });
  };

  return (
    <div className="space-y-4">
      {modalType === "inspection" && (
        <>
          <TextField
            label="Título"
            placeholder="Nombre de la inspección"
            onChange={(v) => update("title", v)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Tipo"
              options={["Mensual", "Trimestral", "Semestral", "Anual"]}
              onChange={(v) => update("type", v)}
            />
            <DateField label="Fecha" onChange={(v) => update("date", v)} />
          </div>
          <TextField
            label="Responsable"
            placeholder="Nombre del responsable"
            onChange={(v) => update("responsible", v)}
          />
          <TextArea
            label="Descripción"
            placeholder="Descripción de la inspección"
            onChange={(v) => update("description", v)}
          />
        </>
      )}

      {modalType === "maintenance" && (
        <>
          <TextField
            label="Título"
            placeholder="Nombre del mantenimiento"
            onChange={(v) => update("title", v)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Tipo"
              options={["Preventivo", "Correctivo", "Mejora"]}
              onChange={(v) => update("type", v)}
            />
            <DateField label="Fecha" onChange={(v) => update("date", v)} />
          </div>
          <TextField
            label="Técnico"
            placeholder="Nombre del técnico o empresa"
            onChange={(v) => update("technician", v)}
          />
          <TextArea
            label="Descripción"
            placeholder="Descripción del mantenimiento"
            onChange={(v) => update("description", v)}
          />
        </>
      )}

      {modalType === "resource" && (
        <>
          <TextField
            label="Nombre"
            placeholder="Nombre del recurso"
            onChange={(v) => update("name", v)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Grupo"
              options={[
                "Extintores",
                "Primeros Auxilios",
                "Salidas",
                "Detectores",
              ]}
              onChange={(v) => update("group", v)}
            />
            <TextField
              label="Ubicación"
              placeholder="Ubicación"
              onChange={(v) => update("location", v)}
            />
          </div>
          <DateField
            label="Próximo Mantenimiento"
            onChange={(v) => update("nextMaintenance", v)}
          />
        </>
      )}

      <div className="flex gap-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};