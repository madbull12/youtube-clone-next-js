import React from "react";

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-neutral-900 pt-28 px-2 md:px-4 lg:px-6 overflow-x-hidden">
      {children}
    </main>
  );
};

export default Body;
