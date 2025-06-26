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
    primary: "bg-[#1A365D] hover:bg-[#162e4f]",
    secondary: "bg-[#ffffff] hover:bg-[#1a365d0c]",
    terciary: "bg-[#ffffff] hover:bg-[#1a365d0c]",
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
      ${getButtonBgColor(variant)} ${getButtonTextColor(variant)} flex flex-row gap-1.5 items-center cursor-pointer 
      relative overflow-hidden rounded-lg transition-all duration-500 transform before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:bg-[#adc7e33f] before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-500 before:ease-out active:before:w-80 active:before:h-80`}
      onClick={(e) => onClick?.(e)}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};

export default Button;

// <button className="relative overflow-hidden bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:bg-[#adc7e397] before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-500 before:ease-out active:before:w-80 active:before:h-80">
//   Click for Ripple Effect
// </button>
// <button className="relative overflow-hidden bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:bg-[#ccc] before:bg-opacity-30 before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-500 before:ease-out active:before:w-80 active:before:h-80">
//   Click for Ripple Effect
// </button>
