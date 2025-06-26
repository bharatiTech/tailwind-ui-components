import { useState } from "react";
import StarFilledIcon from "../../assets/icons/starFilled.svg?react";
import StarOutlinedIcon from "../../assets/icons/starOutlined.svg?react";
import IconButton from "../IconButton";

interface IRatingProps {
  onSubmit?: (value: number) => void;
}

const Rating = ({ onSubmit }: IRatingProps) => {
  const [rating, setRating] = useState(0);

  function updateRating(value: number) {
    setRating(value);
    onSubmit?.(value);
  }

  return (
    <div className="flex flex-row gap-0.5 items-center">
      {new Array(5).fill("").map((_, i) => (
        <IconButton key={i} clickEvent={() => updateRating(i + 1)}>
          {i <= rating - 1 ? <StarFilledIcon /> : <StarOutlinedIcon />}
        </IconButton>
      ))}
    </div>
  );
};

export default Rating;
