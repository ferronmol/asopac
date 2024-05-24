/* eslint-disable react/prop-types */

function InputForm({
  label,
  type = "text",
  name,
  register,
  errors,
  validation,
  placeholder,
  autoComplete,
}) {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}:
      </label>
      <input
        type={type}
        id={name}
        {...register(name, validation)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full bg-orange-700 text-white px-4 py-2 rounded-md mt-1"
      />
      {errors[name] && (
        <span className="text-red-600">
          {errors[name].message || "Este campo es requerido"}
        </span>
      )}
    </div>
  );
}

export default InputForm;
