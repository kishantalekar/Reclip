const FormField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  as = "input",
  options = [],
}: FormFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {as === "textarea" ? (
        <textarea
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : as === "select" ? (
        <select name={id} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />
      )}
    </div>
  );
};

export default FormField;
