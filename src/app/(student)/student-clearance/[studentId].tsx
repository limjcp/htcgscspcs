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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSWR from "swr";
import React from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const OFFICE_ORDER = [
  "SPORTS DEVELOPMENT DIRECTOR/COORDINATOR",
  "STUDENT AFFAIRS & DEVELOPMENT OFFICE(SADO)",
  "COLLEGE HEALTH SERVICES OFFICE(CHSO)",
  "SOCIAL ORIENTAION & COMMNUITY INVOLVEMENT(SOCI)",
  "GUIDANCE COUNSELOR",
  "PROGRAM DEAN/HEAD",
  "LIBRARIAN",
  "REGISTRAR",
  "VP FOR ACADEMICS",
  "VP FOR FINANCE",
];

const sortStepsByOfficeOrder = (steps) => {
  return steps.sort((a, b) => {
    const aName = a.office?.name || a.department?.name || "";
    const bName = b.office?.name || b.department?.name || "";
    return OFFICE_ORDER.indexOf(aName) - OFFICE_ORDER.indexOf(bName);
  });
};

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();
  const [studentId, setStudentId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  const [selectedStepKey, setSelectedStepKey] = useState<number | null>(null);

  const [requirementsMap, setRequirementsMap] = useState<{
    [key: number]: any[];
  }>({});

  const [isLoading, setIsLoading] = useState(true);

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

  const {
    data: years,
    error: yearsError,
    isLoading: yearsLoading,
  } = useSWR("/api/years", fetcher, {
    onSuccess: () => setIsLoading(false),
    onError: () => setIsLoading(false),
  });

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

  const fetchRequirements = async (step) => {
    const officeId = step.office?.id;
    const departmentId = step.department?.id;
    const stepId = step.id;

    if (!stepId || (!officeId && !departmentId)) {
      console.log("Missing required IDs");
      return;
    }

    const queryParams = new URLSearchParams({
      year: selectedYear || "",
      semesterId: selectedSemester || "",
    });

    if (officeId) queryParams.append("officeId", officeId);
    if (departmentId) queryParams.append("departmentId", departmentId);

    try {
      const res = await fetch(`/api/student/stutreqs?${queryParams}`);
      if (!res.ok) {
        throw new Error("Failed to fetch requirements");
      }
      const data = await res.json();
      console.log("Received requirements:", data);

      setRequirementsMap((prev) => ({
        ...prev,
        [stepId]: data,
      }));
    } catch (error) {
      console.error("Error fetching requirements:", error);
    }
  };

  const renderClearanceStep = (step) => {
    const stepId = step.id;
    console.log("Rendering step:", {
      stepId,
      hasRequirements: !!requirementsMap[stepId],
      requirements: requirementsMap[stepId],
    });

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="space-y-2 cursor-pointer"
            onClick={() => {
              setSelectedStepKey(stepId);
              fetchRequirements(step);
            }}
          >
            <div className="text-teal-600 font-medium">
              {step.office
                ? step.office.name
                : step.department?.name || "Unknown"}
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
                <div className="text-sm text-gray-600 italic">
                  {step.comments}
                </div>
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <div className="space-y-2">
            <h3 className="font-medium text-teal-600">Requirements:</h3>
            <ul className="list-disc pl-5">
              {requirementsMap[stepId]?.length > 0 ? (
                requirementsMap[stepId].map((req) => (
                  <li key={req.id} className="text-sm text-gray-600">
                    {req.name} - {req.description}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-600">
                  No requirements available
                </li>
              )}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  if (yearsLoading || isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (yearsError) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-destructive">
          Failed to load academic years
        </div>
      </div>
    );
  }

  if (!years || years.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-muted-foreground">
          No academic years available
        </div>
      </div>
    );
  }

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
                {years?.map((year) => (
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
                    {sortStepsByOfficeOrder(clearanceData[0].steps)
                      .slice(0, 4)
                      .map((step) => (
                        <React.Fragment key={step.id}>
                          {renderClearanceStep(step)}
                          <Separator className="my-4" />
                        </React.Fragment>
                      ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sortStepsByOfficeOrder(clearanceData[0].steps)
                      .slice(4)
                      .map((step) => (
                        <div key={step.id} className="border p-4 rounded-lg">
                          {renderClearanceStep(step)}
                        </div>
                      ))}
                  </div>
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
