import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  clickEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  mouseOverEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  mouseLeaveEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const IconButton = ({ children, className, clickEvent, mouseOverEvent, mouseLeaveEvent }: IProps) => {
  return (
    <button
      className={`${className} p-1 relative overflow-hidden rounded transition-all duration-200 active:scale-95 before:absolute before:inset-0 before:bg-white before:opacity-0 before:scale-0 before:rounded-full before:transition-all before:duration-300 hover:before:scale-100 hover:before:opacity-20 cursor-pointer`}
      onClick={(e) => clickEvent?.(e)}
      onMouseOver={(e) => mouseOverEvent?.(e)}
      onMouseLeave={(e) => mouseLeaveEvent?.(e)}
    >
      {children}
    </button>
  );
};

export default IconButton;
