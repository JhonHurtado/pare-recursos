export const LabelBase: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {children}
  </label>
);

export const TextField: React.FC<{
  label: string;
  placeholder?: string;
  onChange: (v: string) => void;
}> = ({ label, placeholder, onChange }) => (
  <div>
    <LabelBase>{label}</LabelBase>
    <input
      type="text"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const DateField: React.FC<{ label: string; onChange: (v: string) => void }> = ({
  label,
  onChange,
}) => (
  <div>
    <LabelBase>{label}</LabelBase>
    <input
      type="date"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const TextArea: React.FC<{
  label: string;
  placeholder?: string;
  onChange: (v: string) => void;
}> = ({ label, placeholder, onChange }) => (
  <div>
    <LabelBase>{label}</LabelBase>
    <textarea
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const SelectField: React.FC<{
  label: string;
  options: string[];
  onChange: (v: string) => void;
}> = ({ label, options, onChange }) => (
  <div>
    <LabelBase>{label}</LabelBase>
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Seleccione...</option>
      {options.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
  </div>
);