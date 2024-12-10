"use client";

import React from "react";

function Page() {
  const handleButtonClick = async () => {
    try {
      const response = await fetch("/api/cron/check-resignations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        return;
      }

      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      console.error("Error executing API:", error);
    }
  };

  return (
    <div>
      <h1>Test API</h1>
      <button onClick={handleButtonClick}>Execute API</button>
    </div>
  );
}

export default Page;
