import Button from "../Button";
import SuccessIcon from "../../assets/icons/success.svg?react";

interface IBannerProps {
  title: string;
  description: string;
  imageUrl?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const Banner = ({ description, title, actionLabel, imageUrl, onAction }: IBannerProps) => {
  return (
    <div className="w-[350px] bg-[#F7FAFC] rounded-[16px] flex flex-row gap-1 p-[20px]">
      <div className="flex flex-col gap-2 items-start">
        <h4 className="font-normal text-sm">{title}</h4>
        <p className="font-normal text-xs">{description}</p>
        {actionLabel && (
          <Button onClick={() => onAction?.()} size="small">
            {actionLabel}
          </Button>
        )}

        <Button onClick={() => onAction?.()} size="large">
          A Large Button
        </Button>
        <Button onClick={() => onAction?.()} size="medium">
          Medium
        </Button>
        <Button onClick={() => onAction?.()} size="small">
          Small
        </Button>
        <Button
          onClick={() => onAction?.()}
          size="small"
          variant="secondary"
          endIcon={<SuccessIcon style={{ width: "15px", height: "15px" }} />}
        >
          Small
        </Button>
        <Button onClick={() => onAction?.()} size="small" variant="terciary">
          Small
        </Button>
        <Button
          onClick={() => onAction?.()}
          size="medium"
          variant="secondary"
          startIcon={<SuccessIcon style={{ width: "15px", height: "15px" }} />}
        >
          Medium
        </Button>
        <Button onClick={() => onAction?.()} size="medium" variant="terciary">
          Medium
        </Button>
      </div>

      {imageUrl && <div></div>}
    </div>
  );
};

export default Banner;
