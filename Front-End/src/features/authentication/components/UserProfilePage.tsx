"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, User, Settings } from "lucide-react";
import { tiposAcessibilidade } from "@/lib/constants";
import UserSettingsPage from "./UserSettingsPage";
import { useAuth } from "@/contexts/AuthContext";

// Interface que define as propriedades do componente
interface UserProfilePageProps {
  onClose: () => void;
}

/**
 * Componente UserProfilePage
 * Responsável por exibir o perfil do usuário e suas preferências
 * Permite acesso às configurações do perfil
 */
export default function UserProfilePage({ onClose }: UserProfilePageProps) {
  // Obtém dados do usuário através do contexto de autenticação
  const { userName, userNeeds, updateUser, updateNeeds } = useAuth();
  
  // Estado para controlar a exibição do modal de configurações
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  /**
   * Renderiza os badges de preferências de acessibilidade
   */
  const renderAccessibilityBadges = () => {
    if (userNeeds.length === 0) {
      return <p className="text-gray-500">Nenhuma preferência selecionada.</p>;
    }

    return userNeeds.map((need) => {
      const tipo = tiposAcessibilidade.find((n) => n.value === need);
      if (!tipo) return null;

      return (
        <Badge 
          key={need} 
          variant="secondary" 
          className="flex items-center gap-2 text-base px-3 py-1"
        >
          <tipo.icon className="w-4 h-4" aria-hidden="true" />
          {tipo.label}
        </Badge>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      {/* Card principal do perfil */}
      <Card className="w-full max-w-lg bg-white shadow-2xl border-0">
        {/* Cabeçalho do card com título e botão de fechar */}
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6" aria-hidden="true" />
            Perfil de Usuário
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            aria-label="Fechar perfil"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        {/* Conteúdo do perfil */}
        <CardContent className="p-6 space-y-6">
          {/* Seção de informações do usuário */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback 
                  className="text-3xl bg-gradient-to-br from-gray-600 to-gray-800 text-white"
                  aria-label={`Avatar de ${userName}`}
                >
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{userName}</h2>
                <p className="text-gray-500">Membro desde 2024</p>
              </div>
            </div>
            
            {/* Botão de configurações */}
            <Button 
              variant="outline" 
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Abrir configurações"
            >
              <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
              Configurações
            </Button>
          </div>

          {/* Seção de preferências de acessibilidade */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Minhas Preferências de Acessibilidade
            </h3>
            <div className="flex flex-wrap gap-2">
              {renderAccessibilityBadges()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de configurações */}
      {isSettingsOpen && (
        <UserSettingsPage
          onClose={() => setIsSettingsOpen(false)}
          userName={userName}
          userNeeds={userNeeds}
          onUpdateNeeds={updateNeeds}
          onUpdateUser={updateUser}
        />
      )}
    </div>
  );
}