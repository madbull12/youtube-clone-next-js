import React from "react";

const Loader = ({ cols }: { cols: number }) => {

  return (
    <div className={`grid grid-cols-5 gap-4`}>
      {[...Array(100)].map((_, i) => (
        <div className="animate-pulse  flex flex-col gap-y-3">
          <div className=" rounded-xl h-36 bg-gray-500"></div>
          <div className="h-6 w-full rounded-full bg-gray-500"></div>
          <div className="h-4 w-full rounded-full bg-gray-500"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
