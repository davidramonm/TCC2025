// src/app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ReactNode, useState } from 'react';

/**
 * @description Componente agregador para todos os provedores de contexto da aplicação.
 * Envolve os componentes filhos com o QueryClientProvider (para React Query)
 * e o AuthProvider (para gerenciamento de autenticação).
 * @param { { children: ReactNode } } props Propriedades do componente.
 * @param {ReactNode} props.children Os componentes filhos (normalmente a aplicação inteira)
 * que terão acesso aos contextos.
 * @returns {JSX.Element} Os provedores aninhados envolvendo os componentes filhos.
 */
export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}