import { useState, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Popover, IconButton, Tooltip } from '@mui/material';
import { MoreVertical, Search } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslate } from '../../../context/TranslationContext';

// Definición de tipos
interface Action<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  color?: string;
  separator?: boolean;
}

interface HeaderButton {
  label?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  tooltip?: string;
  className?: string;
  color?: string;
}

interface TableConfig {
  enableActions: boolean;
  enableRowDoubleClick: boolean;
  enableSearch: boolean;
  enableTopToolbar: boolean;
  initialPageSize: number;
  showSearchIcon: boolean;
}

interface CustomTableProps<T extends Record<string, any>> {
  // Propiedades básicas
  columns: any;
  data: T[];
  isLoading?: boolean;
  // Propiedades para acciones
  actions?: Action<T>[];

  // Botones de cabecera
  headerButtons?: HeaderButton[];

  // Eventos
  onRowDoubleClick?: (row: T) => void;

  // Configuraciones
  config?: Partial<TableConfig>;

  // Textos personalizados
  localization?: Record<string, string>;
}

/**
 * Componente de tabla reutilizable usando MaterialReactTable
 */
function CustomTable<T extends Record<string, any>>({
  // Propiedades básicas
  columns = [],
  data = [],
  isLoading = false,

  // Propiedades para acciones
  actions = [],

  // Botones de cabecera
  headerButtons = [],
  // Eventos
  onRowDoubleClick = () => { },

  // Configuraciones
  config = {
    enableActions: true,
    enableRowDoubleClick: true,
    enableSearch: true,
    enableTopToolbar: true,
    initialPageSize: 5,
    showSearchIcon: false
  },

  // Textos personalizados

}: CustomTableProps<T>) {
  // Estados para el popover de acciones
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const { i18n } = useTranslate()
  const localizationData = (i18n.store.data[i18n.language]?.translation as any)?.table?.localization;

  // Obtener el tema actual
  const { theme } = useTheme();


  // Funciones para manejar el popover
  const handleActionsClick = (event: React.MouseEvent<HTMLElement>, row: any): void => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleActionClick = (actionHandler: ((row: T) => void) | undefined): void => {
    if (selectedRow && actionHandler) {
      actionHandler(selectedRow.original);
    }
    handleClose();
  };
  // Agregar esta función helper
  const processColumns = (columns: any[]) => {
    return columns.map(column => {
      // Manejo de fechas
      if (column.dataType === 'date' && column.dateFormat) {
        return {
          ...column,
          Cell: ({ cell }: { cell: any }) => {
            const value = cell.getValue();
            if (!value) return null;

            const formattedDate = new Date(value).toLocaleDateString(
              column.dateFormat.locale || 'es-ES',
              column.dateFormat.options || {}
            );

            return <div>{formattedDate}</div>;
          }
        };
      }

      // Manejo de texto truncado
      if (column.truncate?.enabled) {
        return {
          ...column,
          Cell: ({ cell }: { cell: any }) => {
            const value = cell.getValue();
            if (!value) return null;

            return (
              <Tooltip
                title={value}
                placement={column.truncate.tooltipPlacement || "top"}
                arrow
              >
                <div style={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: column.truncate.maxLines || 3,
                  lineHeight: `${column.truncate.lineHeight || 1.2}em`,
                  maxHeight: `${(column.truncate.maxLines || 3) * (column.truncate.lineHeight || 1.2)}em`
                }}>
                  {value}
                </div>
              </Tooltip>
            );
          }
        };
      }

      return column;
    });
  };



  const open = Boolean(anchorEl);
  const popoverId = open ? 'actions-popover' : undefined;

  // Traducciones por defecto en español
  const defaultLocalization: Record<string, string> = {
    actions: 'Acciones',
    and: 'y',
    cancel: 'Cancelar',
    changeFilterMode: 'Cambiar modo de filtro',
    changeSearchMode: 'Cambiar modo de búsqueda',
    search: 'Buscar',
    resetOrder: 'Restablecer orden',
    rowActions: 'Acciones',
    rowNumber: '#',
    rowNumbers: 'Números de fila',
    rowsPerPage: 'Filas por página',
    clearFilter: 'Limpiar filtro',
    clearSearch: 'Limpiar búsqueda',
    goToFirstPage: 'Ir a la primera página',
    goToLastPage: 'Ir a la última página',
    goToNextPage: 'Ir a la página siguiente',
    goToPreviousPage: 'Ir a la página anterior',
    showHideColumns: 'Mostrar/Ocultar columnas',
    showHideFilters: 'Mostrar/Ocultar filtros',
    showHideSearch: 'Mostrar/Ocultar búsqueda',
    sortByColumnAsc: 'Ordenar por {column} ascendente',
    sortByColumnDesc: 'Ordenar por {column} descendente',
    hideAll: 'Ocultar todo',
    hideColumn: 'Ocultar columna {column}',
    select: 'Seleccionar',
    showAllColumns: 'Mostrar todas las columnas',
    showAll: 'Mostrar todo',
    noRecordsToDisplay: 'No hay datos disponibles',
    noResultsFound: 'La búsqueda no obtuvo resultados',
    of: 'de',
    or: 'o',
    clearSort: 'Limpiar orden',
  };
  const localizations = localizationData ? localizationData : defaultLocalization

  // Mezclar traducciones por defecto con las personalizadas
  const mergedLocalization = { ...defaultLocalization, ...localizations };

  // Tema Material UI basado en el modo actual (dark/light)
  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      background: {
        default: theme === 'dark' ? '#1F2937' : '#ffffff',
        paper: theme === 'dark' ? '#1F2937' : '#ffffff',
      },
      text: {
        primary: theme === 'dark' ? '#F9FAFB' : '#111827',
        secondary: theme === 'dark' ? '#9CA3AF' : '#6B7280',
      },
      divider: theme === 'dark' ? '#374151' : '#f0f0f0',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: theme === 'dark' ? '#1F2937' : '#ffffff',
            borderColor: theme === 'dark' ? '#374151' : '#f0f0f0',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottomColor: theme === 'dark' ? '#374151' : '#f0f0f0',
          }
        }
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            color: theme === 'dark' ? '#F9FAFB' : '#111827',
          },
          selectIcon: {
            color: theme === 'dark' ? '#F9FAFB' : '#6B7280',
          },
        }
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: theme === 'dark' ? '1px solid #4B5563' : '1px solid #E5E7EB',
          }
        }
      },
    }
  }), [theme]);

  // Tipos para opciones de la tabla
  type TableOptionsType = {
    columns: any[];
    data: T[];
    state: { isLoading: boolean };
    enableRowActions: boolean;
    positionActionsColumn: "last" | "first" | undefined;
    enableDensityToggle: boolean;
    enableFullScreenToggle: boolean;
    enableColumnFilters: boolean;
    enableColumnOrdering: boolean;
    enableGlobalFilter: boolean;
    enableTopToolbar: boolean;
    localization: Record<string, string>;
    initialState: {
      pagination: {
        pageSize: number;
        pageIndex: number; // Added this property
      };
    };
    muiTablePaperProps: {
      sx: Record<string, unknown>;
    };
    muiTableBodyCellProps: {
      sx: Record<string, unknown>;
    };
    muiTableHeadCellProps: {
      sx: Record<string, unknown>;
    };
    muiSearchTextFieldProps: {
      sx: Record<string, unknown>;
    };
    renderRowActions?: (props: { row: any }) => React.ReactNode;
    muiTableBodyRowProps?: ((props: { row: any }) => {
      onDoubleClick: () => void;
      sx: Record<string, unknown>;
    }) | {
      sx: Record<string, unknown>;
    };
    renderTopToolbarCustomActions?: () => React.ReactNode;
  };

  // Configuración de la tabla basada en el tema
  const tableOptions = useMemo<TableOptionsType>(() => {
    // Configuración base
    const options: TableOptionsType = {
      columns: Array.isArray(columns) ? processColumns(columns) : [],
      data: Array.isArray(data) ? data : [],
      state: isLoading != null ? { isLoading } : { isLoading: false },
      enableRowActions: (config.enableActions ?? true) && actions.length > 0,
      positionActionsColumn: "last",
      enableDensityToggle: false,
      enableFullScreenToggle: false,
      enableColumnFilters: false,
      enableColumnOrdering: false,
      enableGlobalFilter: config.enableSearch === undefined ? true : config.enableSearch,
      enableTopToolbar: config.enableTopToolbar === undefined ? true : config.enableTopToolbar,
      localization: mergedLocalization,
      initialState: {
        pagination: {
          pageSize: config.initialPageSize || 5,
          pageIndex: 0 // Added the missing pageIndex property
        },
      },
      muiTablePaperProps: {
        sx: {
          borderRadius: '12px',
          padding: '8px',
          boxShadow: 'none',
          border: theme === 'dark' ? '1px solid #374151' : '1px solid #f0f0f0',
          backgroundColor: theme === 'dark' ? '#1F2937' : '#ffffff',
        },
      },
      muiTableBodyCellProps: {
        sx: {
          borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #f0f0f0',
          color: theme === 'dark' ? '#F9FAFB' : '#111827',
        },
      },
      muiTableHeadCellProps: {
        sx: {
          borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #f0f0f0',
          backgroundColor: theme === 'dark' ? '#1F2937' : '#ffffff',
          color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
          fontWeight: 500,
        },
      },
      muiSearchTextFieldProps: {
        sx: {
          '& .MuiInputBase-root': {
            backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
            borderRadius: '8px',
          },
        },
      },
    };

    // Acciones de fila
    if (config.enableActions && actions.length > 0) {
      options.renderRowActions = ({ row }) => (
        <IconButton
          aria-describedby={popoverId}
          onClick={(e) => handleActionsClick(e, row)}
          className={`rounded-full p-1 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-100'}`}
          size="small"
        >
          <MoreVertical size={18} />
        </IconButton>
      );
    }

    // Doble clic en filas
    if (config.enableRowDoubleClick && onRowDoubleClick) {
      options.muiTableBodyRowProps = ({ row }) => ({
        onDoubleClick: () => onRowDoubleClick(row.original),
        sx: {
          cursor: 'pointer',
          backgroundColor: theme === 'dark' ? '#1F2937' : '#ffffff',
          '&:hover': {
            backgroundColor: theme === 'dark' ? '#374151' : '#f5f5f5',
          },
        },
      });
    } else {
      options.muiTableBodyRowProps = {
        sx: {
          backgroundColor: theme === 'dark' ? '#1F2937' : '#ffffff',
          '&:hover': {
            backgroundColor: theme === 'dark' ? '#374151' : '#f5f5f5',
          },
        },
      };
    }

    // Icono de búsqueda personalizado y botones de cabecera
    if ((config.showSearchIcon && config.enableSearch) || headerButtons.length > 0) {
      options.renderTopToolbarCustomActions = () => (
        <div className="flex items-center gap-2">
          {/* Botones de cabecera */}
          {headerButtons.length > 0 && (
            <div className="flex items-center gap-1">
              {headerButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md 
                    ${theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'}
                    ${button.className || ''}`}
                  title={button.tooltip || button.label}
                >
                  {button.icon && (
                    <span className={button.color || ''}>
                      {button.icon}
                    </span>
                  )}
                  {button.label && <span>{button.label}</span>}
                </button>
              ))}
            </div>
          )}

          {/* Icono de búsqueda */}
          {config.showSearchIcon && config.enableSearch && (
            <div className={`flex items-center mx-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
              <Search size={18} />
            </div>
          )}
        </div>
      );
    }

    return options;
  }, [
    columns,
    data,
    isLoading,
    theme,
    config,
    actions,
    mergedLocalization,
    onRowDoubleClick,
    popoverId
  ]);

  return (
    <ThemeProvider theme={muiTheme} >
      <MaterialReactTable {...tableOptions} />

      {/* Popover de acciones */}
      {config.enableActions && actions.length > 0 && (
        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className={`p-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
            {actions.map((action, index) => (
              <div key={index}>
                {/* Separador opcional */}
                {action.separator && index > 0 && (
                  <hr className={`my-1 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`} />
                )}

                {/* Acción */}
                <div
                  className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer ${theme === 'dark'
                    ? 'text-gray-200 hover:bg-gray-600'
                    : 'text-gray-700 hover:bg-gray-100'
                    } rounded-md`}
                  onClick={() => handleActionClick(action.onClick)}
                >
                  {action.icon && (
                    <span className={action.color || (theme === 'dark' ? 'text-blue-400' : 'text-blue-500')}>
                      {action.icon}
                    </span>
                  )}
                  <span>{action.label}</span>
                </div>
              </div>
            ))}
          </div>
        </Popover>
      )}
    </ThemeProvider>
  );
}

export default CustomTable;