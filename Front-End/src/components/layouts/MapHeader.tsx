// src/components/layouts/MapHeader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Search, LogOut, LogIn, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface MapHeaderProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onGlobalSearch: () => void;
  onNavigate: (view: "profile" | "login") => void;
}

/**
 * @description O cabeçalho principal da aplicação. Contém o logo, a barra de busca
 * e os controles de usuário (perfil/login). Consome o AuthContext para exibir
 * o estado de autenticação correto.
 */
export default function MapHeader({
  searchTerm,
  onSearchTermChange,
  onGlobalSearch,
  onNavigate,
}: MapHeaderProps) {
  const { isLoggedIn, userName, logout } = useAuth();

  const firstName = userName.split(' ')[0];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-20 relative">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          Mapa Acessível
        </h1>
      </div>

      <div className="flex-1 max-w-2xl mx-8 relative">
        <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
          <Search className="absolute left-4 w-4 h-4 text-gray-400 z-10" />
          <Input
            placeholder="Pesquisar por nome, endereço ou tipo de acessibilidade..."
            className="pl-12 pr-12 border-0 bg-transparent focus:ring-0 h-10"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onGlobalSearch()}
          />
          <Button
            size="sm"
            className="rounded-full bg-gray-600 hover:bg-gray-700 h-8 px-3 absolute right-1"
            onClick={onGlobalSearch}
          >
            <Search className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <Button variant="ghost" className="flex items-center gap-2" onClick={() => onNavigate("profile")}>
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* CORREÇÃO APLICADA AQUI */}
              <span className="hidden md:inline font-medium">{firstName}</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={logout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              aria-label="Sair"
            >
              <LogOut className="w-4 h-4" />
            </Button>
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