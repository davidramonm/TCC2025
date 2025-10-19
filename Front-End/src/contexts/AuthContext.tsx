// src/contexts/AuthContext.tsx

"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { tokenService } from '@/lib/tokenService';
import api from '@/lib/api';

// Interface para o que o TOKEN realmente contém (apenas dados de autenticação)
interface DecodedToken {
  sub: string; // ID do usuário
  exp: number;
}

// Interface para a RESPOSTA COMPLETA da API de login
interface LoginResponseData {
  fName: string;
  lName: string;
  email: string;
  necessities: { name: string }[]; // Array de objetos com a propriedade 'name'
  accessToken: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userId: number | null;
  firstName: string;
  lastName: string;
  email: string;
  userNeeds: string[];
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  register: (fName: string, lName: string, email: string, pass: string, needs: string[]) => Promise<void>;
  updateUserName: (fName: string, lName: string) => void;
  updateNeeds: (needs: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userNeeds, setUserNeeds] = useState<string[]>([]);
  
  // Função para popular o estado a partir da resposta completa do login
  const setUserDataFromResponse = (data: LoginResponseData) => {
    const { accessToken, fName, lName, email, necessities } = data;
    const decodedToken: DecodedToken = jwtDecode(accessToken);

    tokenService.set(accessToken); // Salva o token na memória
    
    setIsLoggedIn(true);
    setUserId(parseInt(decodedToken.sub, 10));
    setFirstName(fName);
    setLastName(lName);
    setEmail(email);
    setUserNeeds(necessities.map(n => n.name)); // Extrai os nomes das necessidades
  };

  useEffect(() => {
    const currentToken = tokenService.get();
    if (currentToken) {
      try {
        const decoded: DecodedToken = jwtDecode(currentToken);
        if (decoded.exp * 1000 > Date.now()) {
          // Se um token válido existir ao carregar a página,
          // o ideal seria ter um endpoint como /auth/me para buscar os dados do usuário.
          // Por enquanto, apenas marcamos como logado e salvamos o ID.
          tokenService.set(currentToken);
          setIsLoggedIn(true);
          setUserId(parseInt(decoded.sub, 10));
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    }
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      // Define explicitamente o tipo de dado esperado da resposta
      const response = await api.post<LoginResponseData>('/auth/login', { email, password: pass });
      
      // A verificação agora é mais simples e segura
      if (response.data && typeof response.data.accessToken === 'string') {
        setUserDataFromResponse(response.data);
      } else {
        throw new Error("Formato de resposta inválido recebido do servidor.");
      }
    } catch (error) {
      console.error("Falha no login:", error);
      logout(); // Garante que o estado fique limpo em caso de erro
      throw error;
    }
  };

  const register = async (fName: string, lName: string, email: string, pass: string, needs: string[]) => {
    // A API de registro pode não retornar o token, então chamamos o login em seguida
    await api.post('/auth/register', {
      firstName: fName,
      lastName: lName,
      email,
      password: pass,
      necessidades: needs,
    });
    // O login já tem todo o tratamento de erro e de dados necessário
    await login(email, pass);
  };

  const logout = () => {
    tokenService.clear();
    setIsLoggedIn(false);
    setUserId(null);
    setFirstName('');
    setLastName('');
    setEmail('');
    setUserNeeds([]);
  };

  const updateUserName = (fName: string, lName: string) => {
    setFirstName(fName);
    setLastName(lName);
  };

  const updateNeeds = (needs: string[]) => {
    setUserNeeds(needs);
  };

  const value = {
    isLoggedIn,
    userId,
    firstName,
    lastName,
    email,
    userNeeds,
    login,
    logout,
    register,
    updateUserName,
    updateNeeds,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};