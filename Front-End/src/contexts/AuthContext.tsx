// src/contexts/AuthContext.tsx

"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { tokenService } from '@/lib/tokenService';
import { Necessity } from '@/types';
import api from '@/lib/api';

/**
 * @description Define a estrutura esperada do token JWT decodificado.
 */
interface DecodedToken {
  sub: string;
  exp: number;
}

/**
 * @description Define a estrutura dos dados do usuário retornados pela API no login.
 */
interface LoginResponseData {
  fName: string;
  lName: string;
  email: string;
  profileImage?: string;
  necessities: Necessity[];
  userId: string;
}

/**
 * @description Define o formato e os valores expostos pelo AuthContext.
 */
interface AuthContextType {
  isLoggedIn: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  userNeeds: Necessity[];
  /**
   * @description Função para realizar o login do usuário.
   * @param email O email do usuário.
   * @param pass A senha do usuário.
   * @returns {Promise<void>} Uma promessa que resolve quando o login é concluído.
   */
  login: (email: string, pass: string) => Promise<void>;
  /**
   * @description Função para realizar o logout do usuário.
   * @returns {void}
   */
  logout: () => void;
  /**
   * @description Função para registrar um novo usuário.
   * @param fName Primeiro nome do usuário.
   * @param lName Sobrenome do usuário.
   * @param email Email do usuário.
   * @param pass Senha do usuário.
   * @param needs Lista de necessidades de acessibilidade do usuário.
   * @returns {Promise<void>} Uma promessa que resolve quando o registro e o login automático são concluídos.
   */
  register: (fName: string, lName: string, email: string, pass: string, needs: Necessity[]) => Promise<void>;
  /**
   * @description Função para atualizar dados básicos do usuário no estado do contexto.
   * @param fName Primeiro nome atualizado.
   * @param lName Sobrenome atualizado.
   * @param profileImage URL da imagem de perfil atualizada.
   * @returns {void}
   */
  updateUser: (fName: string, lName: string, profileImage: string) => void;
  /**
   * @description Função para atualizar a lista de necessidades do usuário no estado do contexto.
   * @param needs A nova lista de necessidades.
   * @returns {void}
   */
  updateNeeds: (needs: Necessity[]) => void;
}

/**
 * @description Contexto React para gerenciamento de autenticação e dados do usuário.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * @description Provedor do contexto de autenticação. Gerencia o estado de autenticação
 * e fornece funções relacionadas ao usuário para os componentes filhos.
 * @param {object} props Propriedades do componente.
 * @param {ReactNode} props.children Componentes filhos que terão acesso ao contexto.
 * @returns {JSX.Element} O componente provedor.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [userNeeds, setUserNeeds] = useState<Necessity[]>([]);

  /**
   * @description Popula o estado de autenticação com os dados recebidos da API.
   * @param {LoginResponseData} data Os dados completos do usuário retornados pelo login ou refresh.
   * @returns {void}
   */
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

  /**
   * @description Efeito para verificar e tentar renovar a sessão (refresh token)
   * assim que o provedor é montado.
   */
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

  /**
   * @description Executa a lógica de login, chamando a API e atualizando o estado global.
   * @param {string} email O email do usuário.
   * @param {string} pass A senha do usuário.
   * @returns {Promise<void>}
   * @throws {Error} Lança um erro se o login falhar.
   */
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

  /**
   * @description Executa a lógica de registro de um novo usuário e, em seguida,
   * realiza o login automático.
   * @param {string} fName Primeiro nome.
   * @param {string} lName Sobrenome.
   * @param {string} email Email.
   * @param {string} pass Senha.
   * @param {Necessity[]} needs Lista de necessidades de acessibilidade.
   * @returns {Promise<void>}
   */
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

  /**
   * @description Executa a lógica de logout, chamando a API e limpando o estado global
   * e o token de acesso.
   * @returns {Promise<void>}
   */
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

  /**
   * @description Atualiza o estado local do usuário com novas informações de perfil.
   * @param {string} fName Primeiro nome atualizado.
   * @param {string} lName Sobrenome atualizado.
   * @param {string} profileImage URL da imagem de perfil atualizada.
   * @returns {void}
   */
  const updateUser = (fName: string, lName: string, profileImage: string) => {
    setFirstName(fName);
    setLastName(lName);
    setProfileImage(profileImage);
  };

  /**
   * @description Atualiza o estado local das necessidades do usuário.
   * @param {Necessity[]} needs A nova lista de necessidades.
   * @returns {void}
   */
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
    updateUser,
    updateNeeds,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * @description Hook customizado para consumir o AuthContext.
 * Facilita o acesso aos dados e funções de autenticação.
 * @returns {AuthContextType} O valor do contexto de autenticação.
 * @throws {Error} Lança um erro se o hook for usado fora de um AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};