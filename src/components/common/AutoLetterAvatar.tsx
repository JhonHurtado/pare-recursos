
// Componente simple de avatar que recibe un nombre y automáticamente genera un avatar
const AutoLetterAvatar = ({ name='A', size = 'md', className = '', showName = false }) => {
  // Tamaños predefinidos
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl',
    '2xl': 'w-24 h-24 text-3xl'
  } as any;
  
  // Función para generar un color basado en el nombre
  const getColorFromName = (name:string) => {
    if (!name) return '#3573b9'; // Color por defecto (indigo-500)
    
    // Colores predefinidos - tonos vibrantes pero agradables
    const colors = [
      '#f43f5e', // rose-500
      '#ec4899', // pink-500
      '#3573b9', // fuchsia-500
      '#a855f7', // purple-500
      '#8b5cf6', // violet-500
      '#6366f1', // indigo-500
      '#3b82f6', // blue-500
      '#0ea5e9', // sky-500
      '#06b6d4', // cyan-500
      '#14b8a6', // teal-500
      '#10b981', // emerald-500
      '#22c55e', // green-500
      '#84cc16', // lime-500
      '#eab308', // yellow-500
      '#f59e0b', // amber-500
      '#f97316', // orange-500
      '#ef4444', // red-500
    ];
    
    // Usar el primer carácter del nombre para elegir un color
    let charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };
  
  // Obtener la primera letra y convertirla a mayúscula
  const letter = name ? name.charAt(0).toUpperCase() : '?';
  const color = getColorFromName(name);
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-bold ${className}`}
        style={{ backgroundColor: color }}
      >
        {letter}
      </div>
      {showName && <span className="mt-1 text-sm text-gray-700">{name}</span>}
    </div>
  );
};



// Exportamos ambos componentes
export { AutoLetterAvatar };
