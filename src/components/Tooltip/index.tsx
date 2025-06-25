import { useEffect, useRef, useState, type ReactNode } from "react";

type Position = "bottom" | "left" | "right" | "top";

interface ITooltopProps {
  children: ReactNode;
  placement?: Position;
  title?: string;
}

const Tooltip = ({ children, placement, title }: ITooltopProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<[number, number]>([0, 0]);

  const anchorElemRef = useRef<HTMLDivElement>(null);

  function getArrowPlacement(position?: Position) {
    switch (position) {
      case "bottom": {
        return "before:border-b-white before:left-[-16px] before:top-1/2 before:translate-y-1/2";
      }
      case "left": {
        return "before:border-l-white before:left-[-16px] before:top-1/2 before:translate-y-1/2";
      }
      case "right": {
        return `before:border-r-white before:left-[-16px] before:top-1/2 before:-translate-y-1/2`;
      }
      case "top": {
        return "before:border-t-white before:left-[-16px] before:top-1/2 before:translate-y-1/2";
      }
      default: {
        return "";
      }
    }
  }

  function getTooltipVisibility(visible: boolean) {
    if (visible) return "opacity-100 scale-100";
    return "opacity-0 scale-[0.95]";
  }

  function getTooltipPosition({ height, width, x, y }: { height: number; width: number; x: number; y: number }) {
    switch (placement) {
      case "bottom":
        {
        }
        break;
      case "left":
        {
        }
        break;
      case "right":
        {
          const left = x + width;
          const top = y + height - 140;
          setTooltipPosition([left, top]);
        }
        break;
      case "top":
        {
        }
        break;
      default:
        {
        }
        break;
    }
  }

  useEffect(() => {
    if (!anchorElemRef.current || !showTooltip) return;
    const { x, y, width, height } = anchorElemRef.current.getBoundingClientRect();
    getTooltipPosition({ height, width, x, y });
  }, [showTooltip]);

  return (
    <>
      <div onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} ref={anchorElemRef}>
        {children}
      </div>

      {title?.trim() !== "" && (
        <div
          id="tooltip"
          className={`absolute z-50 bg-[#fff] w-[500px] border rounded-[5px] p-2 border-gray-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] ${getTooltipVisibility(
            showTooltip
          )} pointer-events-none max-w-[250px] before:content-[''] before:absolute before:w-0 before:h-0 before:border-8 before:border-solid before:border-transparent ${getArrowPlacement(
            placement
          )}`}
          style={{ top: tooltipPosition[1], left: tooltipPosition[0] }}
        >
          <p>{title}</p>
        </div>
      )}
    </>
  );
};

export default Tooltip;
