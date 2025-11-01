// src/features/authentication/components/UserProfilePage.tsx
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
import { AvatarImage } from "@radix-ui/react-avatar";

interface UserProfilePageProps {
  onClose: () => void;
}

export default function UserProfilePage({ onClose }: UserProfilePageProps) {
  const { firstName, lastName, email, userNeeds, profileImage, updateUser, updateNeeds } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
        <Card className="w-full max-w-lg bg-white shadow-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><User className="w-6 h-6" /> Perfil de Usuário</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  {profileImage ? (
                    console.log("Profile Image:", profileImage),
                    <AvatarImage src={profileImage} alt={`${firstName} ${lastName}`} className="object-cover w-full h-full" />
                  ) : (
                    console.log("Profile Image not:", profileImage),
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${firstName}`} alt={firstName} />
                  )}
                </Avatar>
                <div>
                  {}
                  <h2 className="text-2xl font-bold">{firstName}</h2>
                  <p className="text-gray-500">Membro desde 2024</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Minhas Preferências de Acessibilidade</h3>
              <div className="flex flex-wrap gap-2">
                {userNeeds.length > 0 ? (
                  userNeeds.map((need) => {
                    const tipo = tiposAcessibilidade.find((n) => n.necessityId === need.necessityId);
                    if (!tipo) return null;
                    return (
                      <Badge key={need.name} variant="secondary" className="flex items-center gap-2 text-base px-3 py-1">
                        <tipo.icon className="w-4 h-4" />
                        {tipo.label}
                      </Badge>
                    );
                  })
                ) : (
                  <p className="text-gray-500">Nenhuma preferência selecionada.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {isSettingsOpen && (
        <UserSettingsPage
          onClose={() => { setIsSettingsOpen(false); }}
          firstName={firstName}
          lastName={lastName}
          email={email}
          userNeeds={userNeeds}
          profileImage={profileImage || ""}
          onUpdateNeeds={updateNeeds}
          onUpdateUser={updateUser}
        />
      )}
    </>
  );
}