import Button from "../Button";

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
      </div>

      {imageUrl && (
        <div className="flex flex-col p-1 justify-center items-center">
          <img src={imageUrl} />
        </div>
      )}
    </div>
  );
};

export default Banner;
