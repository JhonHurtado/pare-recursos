import { ModalType } from "../utils/types/types";

export const DetailModal: React.FC<{
  open: boolean;
  onClose: () => void;
  modalType: ModalType;
  selected: any;
  onCreate: (payload: any) => void;
}> = ({ open, onClose, modalType, selected, onCreate }) => {
  if (!open) return null;
  const isCreating = !selected;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-gray-900">
            {isCreating
              ? `Nueva ${
                  modalType === "inspection"
                    ? "Inspección"
                    : modalType === "maintenance"
                    ? "Mantenimiento"
                    : "Recurso"
                }`
              : "Detalles"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {isCreating ? (
            <CreateForms
              modalType={modalType}
              onCancel={onClose}
              onSubmit={onCreate}
            />
          ) : (
            <DetailsViewer modalType={modalType} selected={selected} />
          )}
        </div>
      </div>
    </div>
  );
};