import React from "react";

export default function Sperate({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-gray-200 text-opacity-80">
          {children}
        </span>
      </div>
    </div>
  );
}
