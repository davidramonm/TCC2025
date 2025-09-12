// Front-End/components/views/UserProfilePage.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, User, Settings } from "lucide-react";
import { necessidades } from "@/lib/constants";
import UserSettingsPage from "./UserSettingsPage";

interface UserProfilePageProps {
  onClose: () => void;
  userName: string;
  userNeeds: string[];
  onUpdateNeeds: (newNeeds: string[]) => void;
  onUpdateUser: (newName: string) => void;
}

export default function UserProfilePage({
  onClose,
  userName,
  userNeeds,
  onUpdateNeeds,
  onUpdateUser,
}: UserProfilePageProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Esta função agora fecha tanto as configurações quanto o perfil, voltando ao mapa.
  const handleCloseSettingsAndProfile = () => {
    setIsSettingsOpen(false); // Fecha o painel de configurações
    onClose(); // Executa a função para voltar ao mapa
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
        <Card className="w-full max-w-lg bg-white shadow-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-6 h-6" />
              Perfil de Usuário
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-gray-600 to-gray-800 text-white">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{userName}</h2>
                  <p className="text-gray-500">Membro desde 2024</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Minhas Necessidades</h3>
              <div className="flex flex-wrap gap-2">
                {userNeeds.length > 0 ? (
                  userNeeds.map((need) => {
                    const necessidade = necessidades.find((n) => n.value === need);
                    if (!necessidade) return null;
                    const Icon = necessidade.icon;
                    return (
                      <Badge
                        key={need}
                        variant="secondary"
                        className="flex items-center gap-2 text-base px-3 py-1"
                      >
                        <Icon className="w-4 h-4" />
                        {necessidade.label}
                      </Badge>
                    );
                  })
                ) : (
                  <p className="text-gray-500">
                    Nenhuma necessidade específica selecionada.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {isSettingsOpen && (
        <UserSettingsPage
          onClose={handleCloseSettingsAndProfile} // Passa a nova função de fechamento
          userName={userName}
          userNeeds={userNeeds}
          onUpdateNeeds={onUpdateNeeds}
          onUpdateUser={onUpdateUser}
        />
      )}
    </>
  );
}