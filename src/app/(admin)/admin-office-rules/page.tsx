import { withAuth } from "@/withAuth";
import React from "react";

const AdminOfficeRulesPage: React.FC = () => {
  return (
    <div>
      <h1>wala pa</h1>
    </div>
  );
};

export default withAuth(AdminOfficeRulesPage, ["admin"]);
