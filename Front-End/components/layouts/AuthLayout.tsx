// Front-End/components/layouts/AuthLayout.tsx

import type React from "react";

// Este componente de layout encapsula a estrutura visual comum
// das páginas de autenticação, como o fundo em gradiente e os
// elementos decorativos animados.
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos animados no fundo para um efeito visual agradável. */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gray-600 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gray-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-gray-400 rounded-full animate-pulse delay-2000"></div>
      </div>
      {/* O conteúdo específico de cada página (o Card de formulário) será renderizado aqui. */}
      {children}
    </div>
  );
}