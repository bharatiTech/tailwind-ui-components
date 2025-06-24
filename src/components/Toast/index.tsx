import { useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/close.svg?react";
import ErrorIcon from "../../assets/icons/error.svg?react";
import InfoIcon from "../../assets/icons/info.svg?react";
import SuccessIcon from "../../assets/icons/success.svg?react";
import WarningIcon from "../../assets/icons/warning.svg?react";
import IconButton from "../IconButton";

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

const getToastColor = (variant: ToastVariant): string => {
  const colorMap = {
    error: "#FFE2E5",
    info: "#F7FAFC",
    success: "#E7F4E8",
    warning: "#FFF4E4",
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
        return isAnimating
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0";
      }
      case "right": {
        return isAnimating
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0";
      }
      default: {
        return isAnimating
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0";
      }
    }
  }

  if (!showToast) return null;

  return (
    <div
      className={`flex flex-row items-center gap-3 rounded p-3 h-[45px] w-3xs transition-all duration-500 ease-in-out transform ${
        getTransitionDirection(transitionDirection)
        // isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      style={{ backgroundColor: getToastColor(variant) }}
      id="toast"
    >
      {ToastIcon(variant)}
      <div className="flex flex-col">
        <p className="text-xs font-bold font-inter truncate max-w-[10ch]">
          {title}
        </p>
        {description && (
          <p className="text-xs font-normal truncate max-w-[20ch]">
            {description}
          </p>
        )}
      </div>
      {closable && (
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Toast;
