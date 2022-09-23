import React from "react";

interface IProps {
    text:string;
}
const Button = ({ text }:IProps) => {
  return (
    <button className="text-uppercase font-semibold px-4 text-white bg-transparent py-2 border border-blue-500">
      {text}
    </button>
  );
};

export default Button;
