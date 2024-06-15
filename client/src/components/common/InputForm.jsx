/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function InputForm({
  label,
  type,
  name,
  register,
  errors,
  validation,
  placeholder,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}:
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          id={name}
          {...register(name, validation)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full bg-orange-700 text-white px-4 py-2 rounded-md mt-1 placeholder-gray-500"
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <IoEyeOffOutline
                className="h-6 w-6 text-gray-400"
                aria-label="Hide password"
              />
            ) : (
              <IoEyeOutline
                className="h-6 w-6 text-gray-400"
                aria-label="Show password"
              />
            )}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="text-red-600 block mt-1">
          {errors[name].message || "Este campo es requerido"}
        </span>
      )}
    </div>
  );
}

export default InputForm;
