import { useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/close.svg?react";
import ErrorIcon from "../../assets/icons/error.svg?react";
import InfoIcon from "../../assets/icons/info.svg?react";
import SuccessIcon from "../../assets/icons/success.svg?react";
import WarningIcon from "../../assets/icons/warning.svg?react";
import IconButton from "../IconButton";
import Tooltip from "../Tooltip";

type ToastVariant = "info" | "success" | "warning" | "error";
type ToastDirection = "left" | "right";

interface IToastProps {
  title: string;
  variant: ToastVariant;
  autoClose?: boolean;
  closable?: boolean;
  description?: string;
  duration?: number;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  transitionDirection?: ToastDirection;
}

const getToastBgColor = (variant: ToastVariant): string => {
  const colorMap = {
    error: "bg-[#FFE2E5]",
    info: "bg-[#F7FAFC]",
    success: "bg-[#E7F4E8]",
    warning: "bg-[#FFF4E4]",
  };
  return colorMap[variant];
};

function ToastIcon(variant: ToastVariant) {
  switch (variant) {
    case "error": {
      return <ErrorIcon />;
    }
    case "info": {
      return <InfoIcon />;
    }
    case "success": {
      return <SuccessIcon />;
    }
    case "warning": {
      return <WarningIcon />;
    }
    default: {
      return <></>;
    }
  }
}

const Toast = ({
  title,
  variant,
  autoClose,
  closable,
  description,
  duration = 5000,
  onClose,
  transitionDirection,
}: IToastProps) => {
  const [showToast, setShowToast] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (!autoClose) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  function handleClose(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsAnimating(false);

    setTimeout(() => {
      setShowToast(false);
      if (e) onClose?.(e);
    }, 500);
  }

  function getTransitionDirection(direction?: ToastDirection) {
    switch (direction) {
      case "left": {
        return isAnimating ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0";
      }
      case "right": {
        return isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0";
      }
      default: {
        return isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0";
      }
    }
  }

  if (!showToast) return null;

  return (
    <div
      className={`flex flex-row items-center gap-3 rounded p-3 h-[45px] w-3xs transition-all duration-500 ease-in-out ${getToastBgColor(
        variant
      )} transform ${getTransitionDirection(transitionDirection)}`}
      id="toast"
    >
      {ToastIcon(variant)}

      <div className="flex flex-col">
        <Tooltip title={title.length > 20 ? title : ""} placement="right">
          <p className="text-xs font-bold font-inter truncate max-w-[20ch]">{title}</p>
        </Tooltip>

        {description && (
          <Tooltip title={description.length > 20 ? description : ""} placement="left">
            <p className="text-xs font-normal truncate max-w-[20ch]">{description}</p>
          </Tooltip>
        )}
      </div>

      {closable && (
        <IconButton onClick={handleClose} className="ml-auto">
          <CloseIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Toast;
