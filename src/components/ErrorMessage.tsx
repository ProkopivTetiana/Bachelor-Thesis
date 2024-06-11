import WarningIcon from "./../assets/WarningIcon";

type ErrorMessageProps = {
  message: string;
  className?: string;
  textClassName?: string;
};

export default function ErrorMessage({
  message,
  className,
  textClassName,
}: ErrorMessageProps) {
  return (
    <div
      className={`flex w-full items-center gap-1 ${className ? className : ""}`}
    >
      <WarningIcon width="1rem" height="1rem" />
      <div
        className={`text-xs text-[#FF524F] ${
          textClassName ? textClassName : ""
        }`}
      >
        {message}
      </div>
    </div>
  );
}
