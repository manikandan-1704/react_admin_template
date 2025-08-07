import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PageLayout = ({ title, children, headerActions }) => {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
            {headerActions && <div>{headerActions}</div>}
          </div>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default PageLayout;
