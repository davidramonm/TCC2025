// Front-End/components/views/MapHeader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Search, Menu, LogOut } from "lucide-react";

interface MapHeaderProps {
  userName: string;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onGlobalSearch: () => void;
  onNavigate: (view: "login" | "profile") => void;
  onToggleSidebar: () => void;
}

export default function MapHeader({
  userName,
  searchTerm,
  onSearchTermChange,
  onGlobalSearch,
  onNavigate,
  onToggleSidebar,
}: MapHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onToggleSidebar} className="lg:hidden">
          <Menu className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
            Mapa Acessível
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-8 relative">
        <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
          <Search className="absolute left-4 w-4 h-4 text-gray-400 z-10" />
          <Input
            placeholder="Pesquisar locais, tipos de acessibilidade, endereços..."
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
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => onNavigate("profile")}>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline font-medium">{userName}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate("login")}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}