"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Shield, Save, Heart, Trash2, Camera, Loader2 } from "lucide-react";
import { tiposAcessibilidade } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog";
import { Necessity } from '@/types';
import apiClient from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface UserSettingsPageProps {
  /** Função para fechar o modal de configurações */
  onClose: () => void;
  /** Nome atual do usuário */
  firstName: string;
  /** Sobrenome atual do usuário */
  lastName: string;
  /** E-mail do usuário (imutável nesta view) */
  email: string;
  /** URL da imagem de perfil atual */
  profileImage: string;
  /** Lista de necessidades cadastradas do usuário */
  userNeeds: Necessity[];
  /** Callback para atualizar o estado de necessidades no componente pai */
  onUpdateNeeds: (newNeeds: Necessity[]) => void;
  /** Callback para atualizar o estado do usuário (nome, foto) no componente pai */
  onUpdateUser: (firstName: string, lastName: string, profileImage: string) => void;
}

/**
 * @component UserSettingsPage
 * @description Modal de configurações de conta do usuário.
 * Permite edição de perfil, gerenciamento de acessibilidade e configurações de segurança (como excluir conta).
 * Utiliza o componente Tabs para organizar as seções.
 * * @param {UserSettingsPageProps} props - Propriedades do componente.
 * @returns {JSX.Element} O modal de configurações.
 */
export default function UserSettingsPage({
  onClose,
  firstName,
  lastName,
  email,
  profileImage,
  userNeeds,
  onUpdateNeeds,
  onUpdateUser,
}: UserSettingsPageProps) {
  const [selectedNeeds, setSelectedNeeds] = useState<Necessity[]>(userNeeds ?? []);
  const [newFirstName, setFirstName] = useState(firstName || "");
  const [newLastName, setLastName] = useState(lastName || "");
  const [localProfileImage, setLocalProfileImage] = useState<string | "">(profileImage || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState(false); 
  const { deleteUserAccount } = useAuth(); 
  const { toast } = useToast(); 

  useEffect(() => {
    setLocalProfileImage(profileImage);
  }, [profileImage]);

  /**
   * @function toggleNeed
   * @description Alterna a seleção de uma necessidade de acessibilidade.
   * Se a necessidade já estiver na lista, ela é removida. Caso contrário, é adicionada.
   * * @param {string} needValue - O ID da necessidade a ser alterada.
   */
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

  /**
   * @function handleSaveChanges
   * @description Persiste as alterações feitas no perfil.
   * 1. Atualiza dados textuais (nome, sobrenome, necessidades) via API.
   * 2. Se houver uma nova imagem selecionada, realiza o upload via FormData.
   * 3. Atualiza o estado local da aplicação e fecha o modal.
   */
  const handleSaveChanges = async () => {
    apiClient.put("auth/update", {
      fName: newFirstName,
      lName: newLastName,
      necessities: selectedNeeds,
    }).then(() => {
      console.log("User updated successfully");
    }).catch((error) => {
      console.error("Error updating user:", error);
    });

    try {
      const form = new FormData();
      if (fileInputRef.current?.files?.[0]) {
        form.append("file", fileInputRef.current.files[0]);

        const response = await apiClient.post("/users/me/profile-picture", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response?.data?.profileImage) {
          setLocalProfileImage(response.data.profileImage);
        }
      }

      onUpdateNeeds(selectedNeeds);
      onUpdateUser(newFirstName, newLastName, localProfileImage);
      onClose();

    } catch (error) {
      console.error("Erro ao atualizar a imagem de perfil:", error);
    }
  };

  /**
   * @function updateProfileImage
   * @description Dispara o clique no input de arquivo oculto para iniciar a seleção de imagem.
   */
  const updateProfileImage = () => {
    fileInputRef.current?.click();
  };

  /**
   * @function handleProfileImageChange
   * @description Handler executado quando o usuário seleciona um arquivo de imagem.
   * Cria uma URL de preview local para exibição imediata antes do envio ao servidor.
   * * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de alteração do input.
   */
  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setLocalProfileImage(previewUrl);
  };

  /**
   * @function handleDeleteAccount
   * @description Executa a exclusão permanente da conta do usuário.
   * Utiliza o método `deleteUserAccount` do contexto de autenticação.
   * Exibe feedback via Toast em caso de sucesso ou erro.
   */
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteUserAccount();
      toast({
        title: "Conta excluída com sucesso",
        description: "Sentiremos sua falta.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir conta",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
      setIsLoading(false); 
    }
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
              {/* Aba de Perfil */}
              <TabsContent value="profile">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {
                        localProfileImage ? (
                          <img src={localProfileImage} alt="Foto do usuário" className="w-24 h-24 rounded-full border" />
                        ) : (
                          <img src="/placeholder-user.jpg" alt="Foto do usuário" className="w-24 h-24 rounded-full border" />
                        )
                      }
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageChange}
                      />

                      <Button onClick={updateProfileImage} size="icon" className="absolute bottom-0 right-0 rounded-full w-8 h-8">
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
                      <Input id="firstName" value={newFirstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input id="lastName" value={newLastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" value={email} readOnly disabled />
                  </div>
                </div>
              </TabsContent>

              {/* Aba de Acessibilidade */}
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

              {/* Aba de Segurança */}
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
                        <Button variant="destructive" disabled={isLoading}>
                          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
                          Excluir minha conta
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente
                            sua conta e removerá todos os seus dados e avaliações de
                            nossos servidores.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Confirmar Exclusão
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