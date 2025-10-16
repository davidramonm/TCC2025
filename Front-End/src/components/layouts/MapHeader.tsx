"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Search, LogOut, LogIn, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

interface MapHeaderProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onGlobalSearch: () => void;
  onNavigate: (view: "login") => void;
  onOpenSettings: () => void;
}

export default function MapHeader({
  searchTerm,
  onSearchTermChange,
  onGlobalSearch,
  onNavigate,
  onOpenSettings,
}: MapHeaderProps) {
  const { isLoggedIn, firstName, email, logout } = useAuth();

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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1 rounded-full">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
                    {firstName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-4" align="end">
              <div className="flex flex-col items-center p-4">
                <Avatar className="w-20 h-20 mb-2">
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-gray-600 to-gray-800 text-white">
                    {firstName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold">Olá, {firstName}</h2>
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