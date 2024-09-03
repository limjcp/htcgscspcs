"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import React from "react";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ClearancePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    console.log("Session data:", session);
    if (session && session.user && session.user.studentId) {
      setStudentId(session.user.studentId);
      router.push(`/student-clearance?studentId=${session.user.studentId}`);
    }
  }, [session, router]);

  useEffect(() => {
    console.log("Router is ready:", router.isReady);
    console.log("Router query:", router.query);
    if (router.isReady && router.query.studentId) {
      setStudentId(router.query.studentId as string);
    }
  }, [router.isReady, router.query]);

  const { data, error } = useSWR(
    studentId ? `/api/clearance/${studentId}` : null,
    fetcher,
  );

  if (!studentId) return <div>Missing student ID</div>;
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen ">
      <h2 className="text-2xl font-bold mb-6">Clearance Status</h2>
      <div className="relative border-l border-gray-200">
        {data.map((clearance) =>
          clearance.steps.map((step, index) => (
            <div key={index} className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white">
                <svg
                  className="w-3 h-3 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.office.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {step.name} - {step.description}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    step.status === "CLEARED"
                      ? "bg-green-200 text-green-800"
                      : step.status === "PENDING"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                  }`}
                >
                  {step.status}
                </span>
              </div>
              <time className="block mt-2 text-sm font-normal leading-none text-gray-400">
                {new Date(step.signedAt).toLocaleString()}
              </time>
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default ClearancePage;
