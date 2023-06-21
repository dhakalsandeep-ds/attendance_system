import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <div className="sidebar">sidebar</div>

      <div className="header-main">
        <div className="header">header</div>

        <div className="main">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
