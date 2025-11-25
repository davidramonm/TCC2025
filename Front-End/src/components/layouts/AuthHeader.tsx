// Front-End/src/components/layouts/AuthHeader.tsx
"use client";

import type React from "react";

interface AuthHeaderProps {
  /** Ícone principal ilustrativo da ação (ex: Cadeado para login, Usuário para cadastro) */
  icon: React.ReactNode;
  /** Título principal da página */
  title: string;
  /** Subtítulo explicativo ou instrução para o usuário */
  subtitle: string;
  /** Elementos opcionais adicionais (ex: indicadores de progresso/stepper) */
  children?: React.ReactNode;
}

/**
 * @component AuthHeader
 * @description Cabeçalho reutilizável para as telas de fluxo de autenticação (Login, Cadastro, Recuperação).
 * Centraliza a identidade visual dessas páginas, mantendo consistência no layout e tipografia.
 * @param {AuthHeaderProps} props - Propriedades do componente.
 * @returns {JSX.Element} O cabeçalho renderizado.
 */
export default function AuthHeader({
  icon,
  title,
  subtitle,
  children,
}: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      {/* Container do Ícone com gradiente */}
      <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        {icon}
      </div>
      
      {/* Título com gradiente de texto */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
        {title}
      </h1>
      
      <p className="text-gray-600 mt-2">{subtitle}</p>
      
      {/* Área para conteúdo extra (ex: Steps) */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}