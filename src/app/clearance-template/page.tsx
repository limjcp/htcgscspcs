import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

interface SignatureFieldProps {
  title: string;
  name?: string;
  subtitle?: string;
  licenseNumber?: string;
  date?: string;
}

function SignatureField({
  title,
  name,
  subtitle,
  licenseNumber,
  date,
}: SignatureFieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="min-h-[40px] border-b border-dashed border-muted-foreground">
        {name && (
          <div className="flex items-baseline gap-2">
            <span className="font-semibold">{name}</span>
            {date && (
              <span className="text-xs text-muted-foreground">{date}</span>
            )}
          </div>
        )}
      </div>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      {licenseNumber && (
        <p className="text-xs text-muted-foreground">
          License No. {licenseNumber}
        </p>
      )}
    </div>
  );
}

export default function Component() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center space-y-4">
        <CardTitle className="text-primary font-medium">
          This card must be signed by:
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Valid until: May 24, 2024
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <SignatureField
          title="Sports Development Coordinator"
          name="RAFAEL LEON REY E. ALBANO"
          subtitle="Sports Development Coordinator"
          date="MAY 21 2024"
        />

        <SignatureField
          title="Sports Development Director/Coordinator"
          subtitle="Sports Development Director/Coordinator"
        />

        <SignatureField title="Student Affairs & Development Office (SADO)" />

        <SignatureField
          title="College Health Services Office (CHSO)"
          name="LORIE ANN E. CABILI, RN"
          licenseNumber="0914022"
        />

        <SignatureField
          title="SOCI Coordinator"
          name="Gwenn M. Juanatas"
          subtitle="Social Orientation & Community Involvement (SOCI)"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SignatureField
            title="Guidance Counselor"
            name="SHEENA MAE G. ALBARAN, RPm"
            licenseNumber="0018617"
          />

          <SignatureField
            title="Program Dean/Head"
            name="Charisse S. Ronquillo, MIT"
            subtitle="CETE Dean"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SignatureField
            title="Librarian"
            name="GERLIE S. PADAYAO, MAEd, RL"
            subtitle="Chief Librarian"
          />

          <SignatureField title="Registrar" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SignatureField
            title="VP for Academic Affairs"
            name="DR. MARILOU E. ALBA"
            subtitle="VP for Academics"
          />

          <SignatureField title="VP for Finance" />
        </div>
      </CardContent>
    </Card>
  );
}
