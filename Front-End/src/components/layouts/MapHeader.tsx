// Front-End/src/components/layouts/MapHeader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, LogOut, LogIn, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { AvatarImage } from "@/components/ui/avatar"; 
import SearchBar from "./SearchBar";
import { Location } from "@/types";

interface MapHeaderProps {
  /** Termo de busca atual (controlled state) */
  searchTerm: string;
  /** Função para atualizar o termo de busca */
  onSearchTermChange: (term: string) => void;
  /** Função executada ao selecionar um local na busca */
  onGlobalSearch: (location: Location) => void;
  /** Função de navegação para telas de login/cadastro */
  onNavigate: (view: "login") => void;
  /** Função para abrir as configurações do usuário */
  onOpenSettings: () => void;
}

/**
 * @component MapHeader
 * @description Barra de navegação superior (Navbar).
 * Responsabilidades:
 * 1. Branding (Logo e Nome).
 * 2. Hospedar a barra de busca (`SearchBar`).
 * 3. Gerenciar o estado de autenticação visual (Botão Entrar vs Avatar do Usuário).
 * 4. Menu de contexto do usuário (Popover) com opções de Perfil e Logout.
 * @param {MapHeaderProps} props - Propriedades do componente.
 */
export default function MapHeader({
  searchTerm,
  onSearchTermChange,
  onGlobalSearch,
  onNavigate,
  onOpenSettings,
}: MapHeaderProps) {
  const { isLoggedIn, firstName, lastName, email, profileImage, logout } = useAuth();
  const fullName = `${firstName} ${lastName}`;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-20 relative">
      {/* Identidade Visual */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          Mapa Acessível
        </h1>
      </div>

      {/* Barra de Busca Centralizada */}
      <div className="flex-1 max-w-2xl mx-8 relative">
        <SearchBar onSelectResult={(location) => onGlobalSearch(location)} />
      </div>

      {/* Controles de Usuário */}
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <span className="font-semibold text-gray-700 hidden sm:inline">Olá, {firstName}</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="rounded-full w-9 h-9 p-0">
                  <Avatar className="w-9 h-9">
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt={fullName} className="object-cover w-full h-full" />
                    ) : (
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`} alt={fullName} />
                    )}
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mr-4" align="end">
                <div className="flex flex-col items-center p-4">
                  <Avatar className="w-20 h-20 mb-2">
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt={fullName} className="object-cover w-full h-full" />
                    ) : (
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`} alt={fullName} />
                    )}
                  </Avatar>
                  <h2 className="text-lg font-semibold">{fullName}</h2>
                  <p className="text-sm text-muted-foreground">{email}</p>
                  <Button variant="outline" className="mt-4" onClick={onOpenSettings}>
                    <Settings className="mr-2 h-4 w-4" />
                    Gerenciar sua Conta
                  </Button>
                </div>
                <Separator />
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => onNavigate("login")}>
            <LogIn className="mr-2 h-4 w-4" />
            Entrar / Cadastrar
          </Button>
        )}
      </div>
    </header>
  );
}