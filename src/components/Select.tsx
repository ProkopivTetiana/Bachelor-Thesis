import React, { type FunctionComponent, useState } from "react";
import { type CategoryType } from "~/types/CategoryType";

//types

//assets

type SelectProps = {
  label?: string;
  name: string;
  value?: number | string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  options?: CategoryType[] | null;
  // register: UseFormRegister<FieldValues>;
  // errors?: FieldErrors | any;
  // backendErrors?: BackEndErrorType;
  row?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  isDepartment?: boolean;
};

const Select: FunctionComponent<SelectProps> = ({
  label,
  name,
  value,
  placeholder,
  className,
  disabled,
  options,
  // register,
  // errors,
  // backendErrors,
  row,
  inputClassName,
  labelClassName,
  isDepartment,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`flex w-full ${
        row ? "flex-col items-center md:flex-row" : "flex-col"
      } ${className}`}
    >
      <label
        className={`mb-0.5 w-full text-slate-900 md:w-56 ${labelClassName}`}
        htmlFor={label}
      >
        {label}
      </label>
      <div className="relative  w-full">
        <select
          onClick={() => setIsSelected(true)}
          id={label}
          disabled={disabled}
          // {...register(name)}
          className={`bg-opacity-2 hover:bg-opacity-6 focus:bg-opacity-2 disabled:bg-opacity-2 w-full appearance-none rounded-xl
          border px-4 
          py-3 text-black
          outline-none disabled:cursor-not-allowed
          ${isSelected ? "text-opacity-100" : "text-opacity-50"} 
          ${" " + inputClassName}
        `}
        >
          <option
            disabled
            selected={!value && true}
            value=""
            className="text-gray-300"
          >
            {placeholder}
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.id} selected={option.id == value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
