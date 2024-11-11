// src/components/ClearanceCard.tsx
import React from "react";

const ClearanceCard: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-center font-bold text-lg mb-4">
        This card must be signed by
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span>Sports Development Coordinator</span>
          <span className="text-sm text-gray-500">
            Rafael Leon Rey E. Albano
          </span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span>Student Affairs & Development Office (SADO)</span>
          <span className="text-sm text-gray-500">Signed</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span>College Health Services Office (CHSO)</span>
          <span className="text-sm text-gray-500">Gwenn M. Juanta</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span>Social Orientation & Community Involvement (SOCI)</span>
          <span className="text-sm text-gray-500">Signed</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span>Guidance Counselor</span>
          <span className="text-sm text-gray-500">Gerlie S. Padayao</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span>Librarian</span>
          <span className="text-sm text-gray-500">Signed</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span>Registrar</span>
          <span className="text-sm text-gray-500">Signed</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span>VP for Finance</span>
          <span className="text-sm text-gray-500">Signed</span>
        </div>
      </div>
      <div className="text-center mt-4 text-xs text-gray-400">
        Date: 24 May 2024
      </div>
    </div>
  );
};

export default ClearanceCard;
