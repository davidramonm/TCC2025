// Front-End/components/ui/password-strength.tsx
"use client";

import { getPasswordStrength } from "@/lib/constants";
import { CheckCircle, AlertCircle } from "lucide-react";

interface PasswordStrengthProps {
  password?: string;
}

export function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  if (!password) {
    return null;
  }

  const strength = getPasswordStrength(password);
  const strengthColorClass =
    strength >= 80
      ? "bg-gray-600"
      : strength >= 60
      ? "bg-yellow-500"
      : strength >= 40
      ? "bg-orange-500"
      : "bg-red-500";

  const criteria = [
    { label: "8+ caracteres", valid: password.length >= 8 },
    { label: "Letra maiúscula", valid: /[A-Z]/.test(password) },
    { label: "Número", valid: /[0-9]/.test(password) },
    { label: "Símbolo especial", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="space-y-2">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strengthColorClass}`}
          style={{ width: `${strength}%` }}
        ></div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {criteria.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-1 ${
              item.valid ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {item.valid ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <AlertCircle className="w-3 h-3" />
            )}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}