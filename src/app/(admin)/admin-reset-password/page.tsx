"use client";
import { withAuth } from "@/withAuth";
import UserList from "./UserList";

const AdminPage: React.FC = () => {
  return (
    <div>
      <UserList />
    </div>
  );
};

export default withAuth(AdminPage, ["admin"]);
