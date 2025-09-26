/**
 * Un componente funcional de React que renderiza dinámicamente un ícono de la librería `lucide-react`
 * basado en la propiedad `name` proporcionada. Si el ícono especificado no se encuentra, renderiza un `<span>` vacío.
 *
 * @componente
 * @param {AutoIconProps} props - Las propiedades del componente AutoIcon.
 * @param {string} props.name - El nombre del ícono a renderizar. Debe coincidir con el nombre de un ícono
 * de la librería `lucide-react`.
 * @param {number} [props.size=20] - El tamaño del ícono en píxeles. Por defecto es 20 si no se proporciona.
 * @param {string} [props.className=""] - Clases CSS adicionales para aplicar al ícono o al `<span>` de respaldo.
 *
 * @returns {JSX.Element} El componente del ícono renderizado o un `<span>` vacío si no se encuentra el ícono.
 *
 * @ejemplo
 * // Renderiza un ícono "Home" con un tamaño de 24 píxeles
 * <AutoIcon name="Home" size={24} className="custom-class" />

 */
// Versión con memo para evitar re-renders
import React, { memo } from 'react';
import * as Icons from 'lucide-react';

interface AutoIconProps {
  name: string;
  size?: number;
  className?: string;
}

const AutoIcon: React.FC<AutoIconProps> = memo(({ name, size = 20, className = "" }) => {
  const IconComponent = (Icons as any)[name];
  
  if (!IconComponent) {
    return <span className={className}></span>;
  }
  
  return <IconComponent size={size} className={className} />;
});

AutoIcon.displayName = 'AutoIcon';
export default AutoIcon;