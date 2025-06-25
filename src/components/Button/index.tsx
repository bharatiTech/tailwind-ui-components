import type { ReactNode } from "react";

type ButtonSize = "small" | "medium" | "large";
type Variant = "primary" | "secondary" | "terciary";

interface IButtonProps {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  variant?: Variant;
}

function getButtonBgColor(variant: Variant) {
  const colorMap: Record<Variant, string> = {
    primary: "bg-[#1A365D]",
    secondary: "bg-[#ffffff]",
    terciary: "bg-[#ffffff]",
  };

  return colorMap[variant];
}

function getButtonTextColor(variant: Variant) {
  const colorMap: Record<Variant, string> = {
    primary: "text-[#ffffff]",
    secondary: "text-[#1A365D]",
    terciary: "text-[#1A365D]",
  };

  return colorMap[variant];
}

function getSpaceAndSize(size: ButtonSize) {
  const spaceSizeMap: Record<ButtonSize, string> = {
    large: "rounded-[12px] px-[16px] py-[12px] text-base",
    medium: "rounded-[8px] px-[14px] py-[8px] text-sm",
    small: "rounded-[10px] px-[12px] py-[6px] text-xs",
  };

  return spaceSizeMap[size];
}

const Button = ({ children, onClick, endIcon, startIcon, size = "medium", variant = "primary" }: IButtonProps) => {
  const buttonBorder =
    variant === "secondary" ? "border border-[#1A365D]" : variant === "terciary" ? "border-0" : "border-1";

  return (
    <button
      className={`font-semibold ${buttonBorder} ${getSpaceAndSize(size)} 
      ${getButtonBgColor(variant)} ${getButtonTextColor(variant)} flex flex-row gap-1.5 items-center `}
      onClick={(e) => onClick?.(e)}
    >
      {startIcon && <span className="">{startIcon}</span>}
      {children}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};

export default Button;
