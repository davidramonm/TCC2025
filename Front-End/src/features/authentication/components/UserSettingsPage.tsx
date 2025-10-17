"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Shield, Save, Heart, User, Trash2, Camera } from "lucide-react";
import { tiposAcessibilidade } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Necessity } from '@/types';
import apiClient from "@/lib/api";

interface UserSettingsPageProps {
  onClose: () => void;
  firstName: string;
  lastName: string;
  email: string;
  userNeeds: Necessity[];
  onUpdateNeeds: (newNeeds: Necessity[]) => void;
  onUpdateUser: (firstName: string, lastName: string) => void;
}

export default function UserSettingsPage({
  onClose,
  firstName,
  lastName,
  email,
  userNeeds,
  onUpdateNeeds,
  onUpdateUser,
}: UserSettingsPageProps) {
  const [selectedNeeds, setSelectedNeeds] = useState<Necessity[]>(userNeeds ?? []);
  const [newFirstName, setFirstName] = useState(firstName || "");
  const [newLastName, setLastName] = useState(lastName || "");
  const [newEmail, setEmail] = useState(email || ""); // E-mail simulado

  const toggleNeed = (needValue: string) => {
    setSelectedNeeds((prev) => {
      const exists = prev.some(n => n.necessityId === needValue);
      if (exists) {
        return prev.filter(n => n.necessityId !== needValue);
      }

      const needToAdd = tiposAcessibilidade.find(n => n.value === needValue);
      const newNeed: Necessity = {
        necessityId: needValue,
        name: needToAdd?.label ?? needValue,
        description: "",
        ngroup: ""
      };

      return [...prev, newNeed];
    });

  };

  const handleSaveChanges = () => {
    apiClient.put("auth/update", {
      fName: newFirstName,
      lName: newLastName,
      necessities: selectedNeeds,
    }).then(() => {
      console.log("User updated successfully");
    }).catch((error) => {
      console.error("Error updating user:", error);
    });
    onUpdateNeeds(selectedNeeds);
    onUpdateUser(newFirstName, newLastName);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1100]">
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Configurações
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="accessibility">Acessibilidade</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>

            <div className="pt-6 min-h-[350px]">
              <TabsContent value="profile">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src="/placeholder-user.jpg" alt="Foto do usuário" className="w-24 h-24 rounded-full border" />
                      <Button size="icon" className="absolute bottom-0 right-0 rounded-full w-8 h-8">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Alterar Foto de Perfil</h3>
                      <p className="text-sm text-gray-500">Faça o upload de uma nova foto.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" value={email} readOnly disabled />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accessibility">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-gray-600" />
                  Minhas Preferências
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                  {tiposAcessibilidade.map((tipo) => {
                    const IconComponent = tipo.icon;
                    const isSelected = selectedNeeds.some(n => n.necessityId === tipo.necessityId);
                    return (
                      <div
                        key={tipo.value}
                        className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
                            ? "border-gray-800 bg-gray-800 text-white shadow-lg"
                            : "border-gray-200 hover:border-gray-400"
                          }`}
                        onClick={() => toggleNeed(tipo.necessityId)}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-colors ${isSelected ? "text-white" : "text-gray-500"
                            }`}
                        />
                        <Label className={`text-sm font-medium cursor-pointer flex-1 ${isSelected ? "text-white" : ""}`}>
                          {tipo.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-gray-600" />
                      Segurança
                    </h3>
                    <Button variant="outline">
                      Alterar Senha
                    </Button>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-3">Excluir Conta</h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir minha conta
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction className="bg-gray-800 hover:bg-gray-900">
                            Continuar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="flex justify-end pt-6 border-t mt-6">
            <Button
              onClick={handleSaveChanges}
              className="bg-gray-800 hover:bg-gray-900"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}