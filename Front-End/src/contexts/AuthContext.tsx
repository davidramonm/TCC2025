// src/contexts/AuthContext.tsx

"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { tokenService } from '@/lib/tokenService';
import { Necessity } from '@/types';
import api from '@/lib/api';


interface DecodedToken {
  sub: string; 
  exp: number;
}


interface LoginResponseData {
  fName: string;
  lName: string;
  email: string;
  necessities: { name: string }[];
  accessToken: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string;
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
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userNeeds, setUserNeeds] = useState<string[]>([]);
  
  // Função para popular o estado a partir da resposta completa do login
  const setUserDataFromResponse = (data: LoginResponseData) => {
    const { accessToken, fName, lName, email, necessities } = data;
    const decodedToken: DecodedToken = jwtDecode(accessToken);

    tokenService.set(accessToken);
    
    setIsLoggedIn(true);
    setUserId(decodedToken.sub);
    setFirstName(fName);
    setLastName(lName);
    setEmail(email);
    setUserNeeds(necessities.map(n => n.name));
  };

  useEffect(() => {
    const currentToken = tokenService.get();
    if (currentToken) {
      try {
        const decoded: DecodedToken = jwtDecode(currentToken);
        if (decoded.exp * 1000 > Date.now()) {
          tokenService.set(currentToken);
          setIsLoggedIn(true);
          setUserId(decoded.sub);
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
      const response = await api.post<LoginResponseData>('/auth/login', { email, password: pass });
      
      if (response.data && typeof response.data.accessToken === 'string') {
        setUserDataFromResponse(response.data);
      } else {
        throw new Error("Formato de resposta inválido recebido do servidor.");
      }
    } catch (error) {
      console.error("Falha no login:", error);
      logout();
      throw error;
    }
  };

  const register = async (fName: string, lName: string, email: string, pass: string, needs: string[]) => {
    await api.post('/auth/register', {
      firstName: fName,
      lastName: lName,
      email,
      password: pass,
      necessidades: needs,
    });
    await login(email, pass);
  };

  const logout = () => {
    tokenService.clear();
    setIsLoggedIn(false);
    setUserId("");
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