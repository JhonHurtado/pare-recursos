import { ModalType } from "../utils/types/types";

export const DetailsViewer: React.FC<{ modalType: ModalType; selected: any }> = ({
  modalType,
  selected,
}) => (
  <div className="space-y-6">
    {modalType === "inspection" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow
          label="Estado"
          value={<BadgeStatus status={selected.status} />}
        />
        <InfoRow label="Tipo" value={selected.type} />
        <InfoRow label="Fecha" value={selected.date} />
        <InfoRow label="Responsable" value={selected.responsible} />
        <InfoRow
          label="Score"
          value={
            <span className="font-bold">{formatPercent(selected.score)}</span>
          }
        />
        <InfoRow label="Hallazgos" value={String(selected.findings)} />
        <InfoBlock
          label="Notas"
          text={
            selected.status === "completed"
              ? "Inspección completada satisfactoriamente. Se encontraron algunos elementos menores a corregir."
              : "Inspección pendiente de realizar."
          }
        />
      </div>
    )}

    {modalType === "maintenance" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow
          label="Estado"
          value={<BadgeStatus status={selected.status} />}
        />
        <InfoRow label="Tipo" value={selected.type} />
        <InfoRow label="Fecha" value={selected.date} />
        <InfoRow label="Técnico" value={selected.technician} />
        <InfoBlock
          label="Descripción"
          text="Mantenimiento programado para garantizar el correcto funcionamiento del equipo."
        />
      </div>
    )}

    {modalType === "resource" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow
          label="Estado"
          value={<DotStatus status={selected.status} />}
        />
        <InfoRow label="Grupo" value={selected.group} />
        <InfoRow label="Ubicación" value={selected.location} />
        <InfoRow label="Condición" value={`${selected.condition}%`} />
        <InfoRow label="Última Inspección" value={selected.lastInspection} />
        <InfoRow
          label="Próximo Mantenimiento"
          value={selected.nextMaintenance}
        />
      </div>
    )}
  </div>
);