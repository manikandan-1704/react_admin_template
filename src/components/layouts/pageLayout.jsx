import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PageLayout = ({ title, children }) => {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default PageLayout;
