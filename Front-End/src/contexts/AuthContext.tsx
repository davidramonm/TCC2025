// src/contexts/AuthContext.tsx

"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
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
  updateUser: (fName: string, lName: string, profileImage: string) => void;
  updateNeeds: (needs: Necessity[]) => void;
  deleteUserAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * @description Provedor de contexto para gerenciamento de estado de autenticação e dados do usuário.
 * Expõe o estado (isLoggedIn, dados do usuário) e as funções (login, logout, register, etc.)
 * para todos os componentes envolvidos por ele.
 * @param { { children: ReactNode } } props Propriedades do provedor.
 * @param {ReactNode} props.children Componentes filhos que terão acesso a este contexto.
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
   * @description Popula o estado de autenticação e os dados do usuário a partir da resposta da API.
   * @param {LoginResponseData} data Os dados completos do usuário retornados pelo back-end.
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
   * @description Efeito que roda na inicialização do app para tentar
   * revalidar a sessão (refresh token) se o access token não estiver presente.
   */
  useEffect(() => {
    (async () => {
      const currentToken = tokenService.get();
      if (!currentToken) {
        try {
          // Tenta obter um novo access token usando o refresh token (via cookie httpOnly)
          const res = await api.post("/auth/refresh");
          tokenService.set(res.data.accessToken);
          setIsLoggedIn(true);
          setUserDataFromResponse(res.data);
        } catch (error) {
          // Se o refresh falhar (ex: refresh token expirado ou inválido),
          // garante que o usuário esteja deslogado no front-end.
          await logout();
        }
      }
    })();
  }, []);

  /**
   * @description Autentica o usuário na API.
   * Em caso de sucesso, armazena o token e atualiza o estado global de autenticação.
   * @param {string} email Email do usuário.
   * @param {string} pass Senha do usuário.
   * @returns {Promise<void>}
   * @throws {Error} Lança um erro se o login falhar (ex: credenciais inválidas).
   */
  const login = async (email: string, pass: string) => {
    try {
      const response = await api.post<LoginResponseData>('/auth/login', { email, password: pass });

      if (response.data && response.data.userId) {
        setUserDataFromResponse(response.data);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro desconhecido durante o login.");
    }
  };

  /**
   * @description Registra um novo usuário na API.
   * Após o registro bem-sucedido, realiza o login automaticamente.
   * @param {string} fName Primeiro nome do usuário.
   * @param {string} lName Sobrenome do usuário.
   * @param {string} email Email do usuário.
   * @param {string} pass Senha do usuário.
   * @param {Necessity[]} needs Lista de necessidades especiais do usuário.
   * @returns {Promise<void>}
   * @throws {Error} Lança um erro se o registro falhar.
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
   * @description Desloga o usuário.
   * Chama o endpoint de logout da API (para invalidar o refresh token no back-end),
   * limpa o access token do storage e reseta o estado global de autenticação no front-end.
   * @returns {Promise<void>}
   */
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Erro ao deslogar no back-end, limpando estado do front-end:", error);
    } finally {

      tokenService.clear();
      setIsLoggedIn(false);
      setUserId("");
      setFirstName('');
      setLastName('');
      setEmail('');
      setProfileImage(undefined);
      setUserNeeds([]);
    }
  };

  /**
   * @description Atualiza dados do usuário no estado local (frontend).
   * Usado após o usuário editar seu perfil.
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
   * @description Atualiza a lista de necessidades do usuário no estado local (frontend).
   * @param {Necessity[]} needs A nova lista de necessidades.
   * @returns {void}
   */
  const updateNeeds = (needs: Necessity[]) => {
    setUserNeeds(needs);
  };

  /**
   * @description Exclui a conta do usuário logado.
   * Chama o endpoint de exclusão da API e, em caso de sucesso, desloga o usuário.
   * @returns {Promise<void>}
   * @throws {Error} Lança um erro se a exclusão falhar ou se o usuário não estiver logado.
   */
  const deleteUserAccount = async (): Promise<void> => {
    if (!userId) {
      throw new Error("Usuário não está logado.");
    }
    try {
      await api.delete(`/auth/delete`);     
      await logout();
    } catch (error: any) {
      console.error("Erro ao excluir conta:", error);
      throw new Error(error.response?.data?.message || "Não foi possível excluir a conta. Tente novamente.");
    }
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
    deleteUserAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * @description Hook customizado para consumir o AuthContext.
 * Facilita o acesso ao contexto de autenticação em qualquer componente
 * e garante que ele está sendo usado dentro de um AuthProvider.
 * @returns {AuthContextType} O objeto de contexto contendo o estado e as funções de autenticação.
 * @throws {Error} Lança um erro se o hook for usado fora de um AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};