"use client";
import ChangePassword from "@/components/ChangePassword";
import { withAuth } from "@/withAuth";

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <ChangePassword />
    </div>
  );
}
export default withAuth(Settings, ["admin"]);
