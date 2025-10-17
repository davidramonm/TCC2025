// Front-End/contexts/AuthContext.tsx
"use client";

import { ref } from 'process';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import apiClient from "@/lib/api";
import { tokenService } from '@/lib/tokenService';
import { set } from 'zod';
import { Necessity } from '@/types';

interface AuthContextType {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  userNeeds: Necessity[];
  login: (email: string, password: string) => void;
  register: (fName: string, lName: string, email: string, password: string, needs: Necessity[]) => void;
  logout: () => void;
  updateUserName: (fName: string, lName: string) => void;
  updateNeeds: (needs: Necessity[]) => void;
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
  const [firstName, setFirstName] = useState("Convidado");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userNeeds, setUserNeeds] = useState<Necessity[]>([]);
  

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.post("/auth/refresh");
        tokenService.set(res.data.accessToken);
        setFirstName(res.data.fName);
        setLastName(res.data.lName);
        setEmail(res.data.email);
        setUserNeeds((res.data.necessities ?? []) as Necessity[]);
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }


    })();
  }, []);

  async function login(email: string, password: string) {
    const res = await apiClient.post("/auth/login", { email, password });
    setFirstName(res.data.fName);
    setLastName(res.data.lName);
    setEmail(res.data.email);
    setUserNeeds((res.data.necessities ?? []) as Necessity[]);
    setIsLoggedIn(true);
  };

  async function register (fName: string, lName: string, email: string, password: string, necessities: Necessity[]) {
    const res = await apiClient.post("/auth/register", {fName, lName, email, password, necessities});
    setFirstName(res.data.fName);
    setLastName(res.data.lName);
    setEmail(res.data.email);
    setUserNeeds((res.data.necessities ?? []) as Necessity[]);
    setIsLoggedIn(true);
  };

  async function logout() {
    await apiClient.post("/auth/logout");
    tokenService.clear();
    setFirstName("Convidado");
    setLastName("");
    setEmail("");
    setUserNeeds([]);
    setIsLoggedIn(false);
  };

  function updateUserName(fName: string, lName: string) {
    setFirstName(fName);
    setLastName(lName);
  }

  const value = {
    isLoggedIn,
    firstName,
    lastName,
    email,
    userNeeds,
    login,
    register,
    logout,
    updateUserName,
    updateNeeds: setUserNeeds,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}