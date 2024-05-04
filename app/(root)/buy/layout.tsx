import React from "react";

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="flex justify-center">
        {children}
    </div>
  );
};

export default Layout;
