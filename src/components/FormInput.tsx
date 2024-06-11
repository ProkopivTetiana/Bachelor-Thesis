import { useMemo } from "react";
import FormLabel from "./FormLabel";
import ErrorMessage from "./ErrorMessage";

interface IFormInputProps {
  id: string;
  value: string;
  name: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  wrapperClassName?: string;
  labelClassName?: string;
  label: string;
  rightLabel?: React.ReactNode;
  disabled?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  helpText?: string;
  errorColor?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  isTextarea?: boolean;
}

const FormInput = ({
  id,
  name,
  type = "text",
  placeholder = "",
  maxLength = 10000,
  value,
  label,
  rightLabel,
  onChange,
  onBlur,
  disabled = false,
  isRequired = false,
  errorMessage,
  helpText,
  errorColor = "[#FF524F]",
  wrapperClassName = "",
  labelClassName = "",
  isTextarea = false,
}: IFormInputProps) => {
  const borderColor = useMemo(() => {
    if (errorMessage?.length) {
      return `border-[#FF524F] focus:border-[#FF524F] focus:ring-[#FF524F]`;
    }
    return "border-slate-200";
  }, [errorMessage]);

  const textColor = useMemo(() => {
    if (disabled) {
      return `text-gray-2`;
    }
    return "text-gray-4";
  }, [disabled]);

  return (
    <div className={`flex w-full flex-col gap-1 ${wrapperClassName}`}>
      <FormLabel
        labelClassName={labelClassName}
        isRequired={isRequired}
        id={id}
        isError={Boolean(errorMessage && errorMessage?.length > 0)}
        label={label}
        rightLabel={rightLabel}
        errorColor={errorColor}
      />
      {isTextarea ? (
        <textarea
          className={`placeholder:text-gray-3 focus:ring-0" block resize-none rounded border-2 bg-white p-2 focus:outline-offset-0 ${borderColor} ${textColor}`}
          id={id}
          rows={5}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          onBlur={() => {
            onBlur?.();
          }}
        />
      ) : (
        <input
          className={`placeholder:text-gray-3 focus:ring-0" block rounded border-2 bg-white p-2 focus:outline-offset-0 ${borderColor} ${textColor}`}
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          onBlur={() => onBlur?.()}
        />
      )}
      {Boolean(errorMessage) && <ErrorMessage message={errorMessage ?? ""} />}
      {helpText && (
        <small className="w-full text-neutral-500">{helpText}</small>
      )}
    </div>
  );
};

export default FormInput;
