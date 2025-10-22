// src/contexts/AuthContext.tsx

"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { tokenService } from '@/lib/tokenService';
import { Necessity } from '@/types';
import api from '@/lib/api';
import Error from 'next/error';


interface DecodedToken {
  sub: string;
  exp: number;
}


interface LoginResponseData {
  fName: string;
  lName: string;
  email: string;
  profileImage?: string;
  necessities: Necessity[];
  userId: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  userNeeds: Necessity[];
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  register: (fName: string, lName: string, email: string, pass: string, needs: Necessity[]) => Promise<void>;
  updateUserName: (fName: string, lName: string) => void;
  updateNeeds: (needs: Necessity[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [userNeeds, setUserNeeds] = useState<Necessity[]>([]);

  // Função para popular o estado a partir da resposta completa do login
  const setUserDataFromResponse = (data: LoginResponseData) => {
    const { userId, fName, lName, email, profileImage, necessities } = data;

    setIsLoggedIn(true);
    setUserId(userId);
    setFirstName(fName);
    setLastName(lName);
    setEmail(email);
    setProfileImage(profileImage)
    setUserNeeds(necessities);
  };

  useEffect(() => {
    (async () => {
      const currentToken = tokenService.get();
      if (!currentToken) {
        try {
          const res = await api.post("/auth/refresh");
          tokenService.set(res.data.accessToken);
          setIsLoggedIn(true);
          setUserDataFromResponse(res.data);
        } catch (error) {
          logout();
        }
      }
    })();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const response = await api.post<LoginResponseData>('/auth/login', { email, password: pass });

      if (response.data && response.data.userId) {
        setUserDataFromResponse(response.data);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro desconhecido durante o login.");
      logout();
      throw error;
    }
  };

  const register = async (fName: string, lName: string, email: string, pass: string, needs: Necessity[]) => {
    await api.post('/auth/register', {
      fName: fName,
      lName: lName,
      email,
      password: pass,
      necessities: needs,
    });
    await login(email, pass);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    tokenService.clear();
    setIsLoggedIn(false);
    setUserId("");
    setFirstName('');
    setLastName('');
    setEmail('');
    setProfileImage(undefined);
    setUserNeeds([]);
  };

  const updateUserName = (fName: string, lName: string) => {
    setFirstName(fName);
    setLastName(lName);
  };

  const updateNeeds = (needs: Necessity[]) => {
    setUserNeeds(needs);
  };

  const value = {
    isLoggedIn,
    userId,
    firstName,
    lastName,
    email,
    profileImage,
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