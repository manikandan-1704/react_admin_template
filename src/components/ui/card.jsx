import React from "react";

export const Card = ({ className, children }) => (
  <div className={`rounded-xl shadow-md bg-white p-4 ${className || ""}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b pb-2 mb-4">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div>{children}</div>
);
