import { AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';

// Componente Alert con tu lógica pero mi diseño
type AlertProps = {
  titulo: string;
  contenido: string;
  show: boolean;
  onHide: (value: boolean) => void;
  tipo: "success" | "warning" | "confirm" | "error" | "";
  evento?: ((value?: boolean) => void) | null;
  eventCombination?: boolean;
  statusCloseModal?: boolean;
};

 const Alert: React.FC<AlertProps> = ({
  titulo,
  contenido,
  show,
  onHide,
  tipo,
  evento = null,
  eventCombination = false,
  statusCloseModal = true
}) => {

  const handleBoton = () => {
    if (evento !== null) {
      evento();
      onHide(false);
    } else {
      onHide(false);
    }
  };

  const getIcon = () => {
    switch (tipo) {
      case "success":
        return <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />;
      case "warning":
      case "confirm":
        return <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />;
      case "error":
        return <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      default:
        return null;
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-white/30  dark:bg-white/5 transition-opacity ${statusCloseModal ? 'bg-opacity-50' : 'bg-opacity-70'
          }`}
        onClick={statusCloseModal ? () => onHide(false) : undefined}
      />

      {/* Modal Content - Manteniendo mi diseño bonito */}
      <div className="relative  bg-white  dark:bg-gray-900  border dark:border-0  rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all scale-100">
        {/* Close Button - Solo si statusCloseModal es true */}
        {statusCloseModal && (
          <button
            onClick={() => onHide(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Modal Body */}
        <div className="p-8 text-center">
          {/* Icon */}
          {getIcon()}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {titulo}
          </h3>

          {/* Content */}
          <p className="text-gray-600 dark:text-gray-500 mb-8">
            {contenido}
          </p>

          {/* Buttons - Tu lógica exacta */}
          <div className="flex space-x-3">
            {tipo === "success" || tipo === "error" || tipo === "warning" || tipo === "" ? (
              <button
                onClick={handleBoton}
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                OK
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onHide(false);
                    if (eventCombination) {
                      if (evento) {
                        evento(true);
                      }


                    }
                  }}
                  className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  No
                </button>
                <button
                  onClick={handleBoton}
                  className="flex-1 py-3 px-4 bg-gray-900 border border-white hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Sí
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;

