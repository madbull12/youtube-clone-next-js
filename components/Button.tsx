import React from "react";

interface IProps {
  text: string;
  handleClick?: () => void;
}
const Button = ({ text, handleClick }: IProps) => {
  return (
    <button
      onClick={handleClick}
      className="text-uppercase whitespace-nowrap font-semibold px-4 text-white bg-transparent py-2 border border-blue-500"
    >
      {text}
    </button>
  );
};

export default Button;
