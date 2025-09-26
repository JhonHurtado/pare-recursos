

export const Th: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <th
    className={`text-left py-3 px-4 font-medium text-gray-600 text-sm ${className}`}
    {...rest}
  >
    {children}
  </th>
);

export const Td: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <td className={`py-3 px-4 ${className}`} {...rest}>
    {children}
  </td>
);

export const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div>
    <label className="text-xs font-medium text-gray-500">{label}</label>
    <p className="mt-1 text-sm font-medium">{value}</p>
  </div>
);

export const InfoBlock: React.FC<{ label: string; text: string }> = ({
  label,
  text,
}) => (
  <div className="sm:col-span-2">
    <label className="text-xs font-medium text-gray-500">{label}</label>
    <p className="mt-2 text-sm text-gray-700">{text}</p>
  </div>
);