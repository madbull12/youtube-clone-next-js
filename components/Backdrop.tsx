import React from "react";

const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#00000081] grid min-h-screen place-items-center absolute z-50 top-0 bottom-0 left-0 right-0 ">
      {children}
    </div>
  );
};

export default Backdrop;
