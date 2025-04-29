export const Label = ({ children }) => (
  <label className="block text-sm font-semibold">{children}</label>
);
export const Input = ({ type = "text", placeholder }) => (
  <input
    type={type}
    placeholder={placeholder}
    class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
  />
);

export const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
  />
);

export const Button = ({ children, size, className }) => (
  <button
    className={`py-3 text-white bg-blue-500 rounded-md ${
      size === "sm" ? "text-sm" : ""
    } ${className}`}
  >
    {children}
  </button>
);
