import { useMemo } from "react";
import { classNames } from "~/utils/style-utils";

interface IFormLabelProps {
  isError?: boolean;
  id: string;
  label: string;
  isRequired?: boolean;
  errorColor?: string;
  labelClassName?: string;
  rightLabel?: React.ReactNode;
}

const FormLabel = ({
  label,
  id,
  isRequired,
  isError,
  errorColor = "[#FF524F]",
  labelClassName = "",
  rightLabel,
}: IFormLabelProps) => {
  const labelTextColor = useMemo(() => {
    if (isError) {
      return `text-${errorColor}`;
    }
    return "text-[#53517F]";
  }, [errorColor, isError]);

  return (
    <div className="flex justify-between">
      <label
        htmlFor={id}
        className={classNames(
          "pointer-events-none flex items-center justify-between text-base font-medium",
          labelTextColor,
          labelClassName,
        )}
      >
        <span>
          {isRequired ? <span className="text-[#FF524F]">*</span> : null}
          {label}
        </span>
      </label>
      {rightLabel && <span>{rightLabel}</span>}
    </div>
  );
};

export default FormLabel;
