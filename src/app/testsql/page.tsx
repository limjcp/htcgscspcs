// src/app/testsql/page.tsx
import React from "react";
type Student = {
  id: number;
  name: string;
  // Define other fields as per your table structure
};

async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/studentsql`,
    {
      cache: "no-store", // Prevent caching if you want fresh data on every request
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch students");
  }
  return res.json();
}

export default async function StudentsPage() {
  const students = await fetchStudents();

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}
