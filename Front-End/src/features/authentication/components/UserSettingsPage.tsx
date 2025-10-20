"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { 
  X, 
  Shield, 
  Save, 
  Heart, 
  Trash2, 
  Camera 
} from "lucide-react";
import { tiposAcessibilidade } from "@/lib/constants";

/**
 * Interface que define as propriedades do componente de configurações
 */
interface UserSettingsPageProps {
  onClose: () => void;                           // Função para fechar o modal
  userName: string;                              // Nome atual do usuário
  userNeeds: string[];                          // Preferências atuais
  onUpdateNeeds: (newNeeds: string[]) => void;  // Atualiza preferências
  onUpdateUser: (newName: string) => void;      // Atualiza nome do usuário
}

/**
 * Componente UserSettingsPage
 * Modal que permite ao usuário gerenciar suas configurações:
 * - Editar informações de perfil
 * - Configurar preferências de acessibilidade
 * - Gerenciar configurações de segurança
 */
export default function UserSettingsPage({
  onClose,
  userName,
  userNeeds,
  onUpdateNeeds,
  onUpdateUser,
}: UserSettingsPageProps) {
  // Estados locais para gerenciar as alterações
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(userNeeds);
  const [firstName, setFirstName] = useState(userName.split(' ')[0] || "");
  const [lastName, setLastName] = useState(userName.split(' ').slice(1).join(' ') || "");
  const [email] = useState("seu.email@exemplo.com"); // Email mockado

  /**
   * Alterna a seleção de uma preferência de acessibilidade
   */
  const toggleNeed = (needValue: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(needValue)
        ? prev.filter((n) => n !== needValue)
        : [...prev, needValue]
    );
  };

  /**
   * Salva todas as alterações feitas pelo usuário
   */
  const handleSaveChanges = () => {
    onUpdateNeeds(selectedNeeds);
    onUpdateUser(`${firstName} ${lastName}`.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1100]">
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-0">
        {/* Cabeçalho do modal */}
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Configurações
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            aria-label="Fechar configurações"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </Button>
        </CardHeader>

        <CardContent>
          {/* Abas de navegação */}
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="accessibility">Acessibilidade</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>

            {/* Aba de Perfil */}
            <TabsContent value="profile" className="pt-6">
              <div className="space-y-4">
                {/* Seção de foto do perfil */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src="/placeholder-user.jpg" 
                      alt="Foto do usuário" 
                      className="w-24 h-24 rounded-full border" 
                    />
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                      aria-label="Alterar foto"
                    >
                      <Camera className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Alterar Foto de Perfil</h3>
                    <p className="text-sm text-gray-500">Faça o upload de uma nova foto.</p>
                  </div>
                </div>

                {/* Campos de nome */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input 
                      id="firstName" 
                      value={firstName} 
                      onChange={e => setFirstName(e.target.value)}
                      aria-label="Nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input 
                      id="lastName" 
                      value={lastName} 
                      onChange={e => setLastName(e.target.value)}
                      aria-label="Sobrenome"
                    />
                  </div>
                </div>

                {/* Campo de email */}
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    readOnly 
                    disabled
                    aria-label="Email"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Aba de Acessibilidade */}
            <TabsContent value="accessibility" className="pt-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-gray-600" aria-hidden="true" />
                Minhas Preferências
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                {tiposAcessibilidade.map((tipo) => {
                  const IconComponent = tipo.icon;
                  const isSelected = selectedNeeds.includes(tipo.value);
                  return (
                    <div
                      key={tipo.value}
                      className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "border-gray-600 bg-gray-50 shadow-sm"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => toggleNeed(tipo.value)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                    >
                      <IconComponent
                        className={`w-5 h-5 transition-colors ${
                          isSelected ? "text-gray-700" : "text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      <Label className="text-sm font-medium cursor-pointer flex-1">
                        {tipo.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            {/* Aba de Segurança */}
            <TabsContent value="security" className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  Segurança
                </h3>
                <Button variant="outline">
                  Alterar Senha
                </Button>
              </div>
              
              {/* Seção de exclusão de conta */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Excluir Conta</h3>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" aria-hidden="true" />
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
                      <AlertDialogAction>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TabsContent>
          </Tabs>

          {/* Botão de salvar alterações */}
          <div className="flex justify-end pt-6 border-t mt-6">
            <Button 
              onClick={handleSaveChanges}
              aria-label="Salvar todas as alterações"
            >
              <Save className="w-4 h-4 mr-2" aria-hidden="true" />
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}