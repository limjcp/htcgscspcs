// /services/officeService.ts
export const getOfficesWithDependencies = async () => {
  const response = await fetch("/api/getOfficesWithDependencies");
  if (!response.ok) {
    throw new Error("Failed to fetch offices");
  }
  return await response.json();
};

export const getOffices = async () => {
  const response = await fetch("/api/getOffices");
  if (!response.ok) {
    throw new Error("Failed to fetch offices");
  }
  return await response.json();
};

export const saveOfficeDependencies = async (
  officeId: string,
  dependencies: string[]
) => {
  const response = await fetch("/api/saveOfficeDependencies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ officeId, dependencies }),
  });

  if (!response.ok) {
    throw new Error("Failed to save dependencies");
  }

  return await response.json();
};
