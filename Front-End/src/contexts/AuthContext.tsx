// Front-End/contexts/AuthContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  userNeeds: string[];
  login: (name: string) => void;
  register: (name: string, needs: string[]) => void;
  logout: () => void;
  updateUser: (name: string) => void;
  updateNeeds: (needs: string[]) => void;
}

// Criação do Contexto com um valor inicial nulo
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * @description Hook customizado para consumir o AuthContext de forma segura.
 * Garante que o contexto só seja usado dentro de um AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

/**
 * @description Provedor de estado global para a autenticação.
 * Envolve a aplicação e disponibiliza o estado de sessão para todos os componentes filhos.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Convidado");
  const [userNeeds, setUserNeeds] = useState<string[]>([]);

  const login = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const register = (name: string, needs: string[]) => {
    setUserName(name);
    setUserNeeds(needs);
    setIsLoggedIn(true);
  };
  
  const logout = () => {
    setUserName("Convidado");
    setUserNeeds([]);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    userName,
    userNeeds,
    login,
    register,
    logout,
    updateUser: setUserName,
    updateNeeds: setUserNeeds,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}