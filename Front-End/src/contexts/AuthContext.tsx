// Front-End/contexts/AuthContext.tsx
"use client";

import { ref } from 'process';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import apiClient, { refreshToken } from "@/lib/api";
import { tokenService } from '@/lib/tokenService';

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  userNeeds: string[];
  login: (email: string, password: string) => void;
  register: (fName: string, lName: string, email: string, password: string, needs: string[]) => void;
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

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.post("/auth/refresh");
        tokenService.set(res.data.accessToken);
        setUserName(res.data.fName + " " + res.data.lName);
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }


    })();
  }, []);

  async function login(email: string, password: string) {
    const res = await apiClient.post("/auth/login", { email, password });
    setUserName(res.data.fName + " " + res.data.lName);
    setIsLoggedIn(true);
  };

  async function register (fName: string, lName: string, email: string, password: string, needs: string[]) {
    const res = await apiClient.post("/auth/register", {fName, lName, email, password });
    setUserName(res.data.fName + " " + res.data.lName);
    setUserNeeds(needs);
    setIsLoggedIn(true);
  };

  async function logout() {
    await apiClient.post("/auth/logout");
    tokenService.clear();
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