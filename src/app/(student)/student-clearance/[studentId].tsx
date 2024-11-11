"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useSWR from "swr";
import React from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();
  const [studentId, setStudentId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.studentId) {
      setStudentId(session.user.studentId);
      router.push(`/student-clearance?studentId=${session.user.studentId}`);
    }
  }, [session, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlStudentId = urlParams.get("studentId");
      if (urlStudentId) {
        setStudentId(urlStudentId);
      }
    }
  }, []);

  const { data: years, error: yearsError } = useSWR("/api/years", fetcher);
  const { data: semesters, error: semestersError } = useSWR(
    selectedYear ? `/api/studentsemesters?year=${selectedYear}` : null,
    fetcher
  );
  const { data: clearanceData, error: clearanceError } = useSWR(
    studentId && selectedYear && selectedSemester
      ? `/api/clearance/${studentId}?year=${selectedYear}&semesterId=${selectedSemester}`
      : null,
    fetcher
  );

  if (!studentId)
    return (
      <div className="p-4 text-center text-muted-foreground">
        Missing student ID
      </div>
    );
  if (yearsError)
    return (
      <div className="p-4 text-center text-destructive">
        Failed to load years
      </div>
    );
  if (!years)
    return (
      <div className="p-4 text-center text-muted-foreground">
        Loading years...
      </div>
    );

  const renderClearanceStep = (step, index) => (
    <div key={index} className="space-y-2">
      <div className="text-teal-600 font-medium">
        {step.office ? step.office.name : step.department?.name || "Unknown"}
      </div>
      <div className="pl-4 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{step.signedBy}</div>
            {step.position && (
              <div className="text-sm text-gray-600">{step.position}</div>
            )}
            {step.licenseNo && (
              <div className="text-sm text-gray-500">
                License No. {step.licenseNo}
              </div>
            )}
          </div>
          {step.status && (
            <div
              className={`px-2 py-1 text-sm rounded ${
                step.status === "FAILING"
                  ? "text-red-600 bg-red-50"
                  : step.status === "SIGNED"
                  ? "text-green-600 bg-green-50"
                  : "text-gray-600 bg-gray-50"
              }`}
            >
              {step.status}
            </div>
          )}
        </div>
        {step.signedAt && (
          <div className="text-sm text-gray-500">
            {new Date(step.signedAt).toLocaleDateString()}
          </div>
        )}
        {step.comments && (
          <div className="text-sm text-gray-600 italic">{step.comments}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="year">Academic Year</Label>
            <Select value={selectedYear || ""} onValueChange={setSelectedYear}>
              <SelectTrigger id="year">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.id} value={year.id}>
                    {year.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedYear && (
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={selectedSemester || ""}
                onValueChange={setSelectedSemester}
              >
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters?.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {!selectedYear || !selectedSemester ? (
        <div className="text-center text-muted-foreground">
          Please select a year and semester to view clearance data.
        </div>
      ) : clearanceError ? (
        <div className="text-center text-destructive">
          Failed to load clearance data
        </div>
      ) : !clearanceData ? (
        <div className="text-center text-muted-foreground">
          Loading clearance data...
        </div>
      ) : (
        <Card className="p-6 bg-white">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-teal-600">
              This card must be signed by:
            </h2>

            <div className="space-y-8">
              {Array.isArray(clearanceData) && clearanceData.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {clearanceData[0].steps.slice(0, 4).map((step, index) => (
                      <React.Fragment key={index}>
                        {renderClearanceStep(step, index)}
                        {index < 3 && <Separator className="my-4" />}
                      </React.Fragment>
                    ))}
                  </div>
                  {clearanceData[0].steps.length > 4 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {clearanceData[0].steps.slice(4).map((step, index) => (
                        <div key={index + 4} className="border p-4 rounded-lg">
                          {renderClearanceStep(step, index + 4)}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div>No clearance data available</div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
