import React from "react";
export default function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      {/* <button onClick={() => window.history.back()}>Go back</button> */}
      <button onClick={() => window.location.assign("/")}>Go to home</button>
    </div>
  );
}
