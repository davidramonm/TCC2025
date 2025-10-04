// Front-End/components/layouts/AuthHeader.tsx
"use client";

import type React from "react";

interface AuthHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children?: React.ReactNode; // Para os indicadores de passo
}

export default function AuthHeader({
  icon,
  title,
  subtitle,
  children,
}: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        {icon}
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-gray-600 mt-2">{subtitle}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}