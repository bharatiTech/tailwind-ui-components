type ToastVariant = "info" | "success" | "warning" | "error";

interface IToastProps {
  title: string;
  variant: ToastVariant;
  closable?: boolean;
  description?: string;
  duration?: number;
}

function ToastIcon(variant: ToastVariant) {
  switch (variant) {
    case "error": {
      return <>!</>;
    }
    case "info": {
      return <>!</>;
    }
    case "success": {
      return <>!</>;
    }
    case "warning": {
      return <>!</>;
    }
    default: {
      return <>def</>;
    }
  }
}

const Toast = ({ title, variant, closable, description }: IToastProps) => {
  return (
    <div className="border-r-4 bg-amber-500 flex flex-row items-center gap-1 rounded">
      {ToastIcon(variant)}

      <div>
        <p>{title}</p>
        {description && <p>{description}</p>}
      </div>

      {closable && <button>x</button>}
    </div>
  );
};

export default Toast;
