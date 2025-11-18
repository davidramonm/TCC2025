// src/features/authentication/components/RegisterPage.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "../schemas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, UserPlus, Check, Loader2 } from "lucide-react";
import { tiposAcessibilidade } from "@/lib/constants";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordStrength } from "@/components/ui/password-strength";
import AuthHeader from "@/components/layouts/AuthHeader";
import { Card } from "@/components/ui/card"; 
import { Necessity } from "@/types";

interface RegisterPageProps {
  onNavigate: (view: "login") => void;
  onRegister: (fName: string, lName: string, email: string, password: string, needs: Necessity[]) => void;
}

/**
 * @component RegisterPage
 * @description Componente de cadastro de usuários implementado como um formulário de múltiplas etapas (Wizard).
 * - Etapa 1: Coleta de dados pessoais (Nome, Email, Senha).
 * - Etapa 2: Seleção de preferências de acessibilidade.
 * - Etapa 3: Revisão de dados e aceite dos termos.
 * * @param {RegisterPageProps} props - Propriedades do componente.
 * @returns {JSX.Element} O formulário de cadastro.
 */
export default function RegisterPage({ onNavigate, onRegister }: RegisterPageProps) {
  const { toast } = useToast();
  const [registerStep, setRegisterStep] = useState(1);
  const [selectedNeeds, setSelectedNeeds] = useState<Necessity[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { register, handleSubmit, watch, trigger, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const passwordValue = watch("password");

  /**
   * @function handleNextStep
   * @description Valida os campos da etapa atual antes de permitir o avanço para a próxima.
   * Garante que o usuário não prossiga sem preencher corretamente os dados obrigatórios.
   */
  const handleNextStep = async () => {
    const fieldsToValidate: (keyof RegisterFormData)[] = ["firstName", "lastName", "email", "password", "confirmPassword"];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setRegisterStep(2);
    }
  };

  /**
   * @function handleRegister
   * @description Finaliza o processo de registro.
   * Verifica se os termos foram aceitos e invoca a função `onRegister` com os dados coletados.
   * * @param {RegisterFormData} data - Dados validados do formulário.
   */
  const handleRegister = async (data: RegisterFormData) => {
    if (!acceptTerms) {
      toast({ title: "Termos obrigatórios", description: "Você deve aceitar os termos.", variant: "destructive" });
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    onRegister(data.firstName, data.lastName, data.email, data.password, selectedNeeds);
  };

  /**
   * @function toggleNeed
   * @description Gerencia a seleção de necessidades de acessibilidade.
   * Adiciona ou remove uma necessidade da lista de itens selecionados.
   * * @param {string} necessityId - O ID da necessidade a ser alternada.
   */
  const toggleNeed = (necessityId: string) => {
    setSelectedNeeds((prev) => {
          const exists = prev.some(n => n.necessityId === necessityId);
          if (exists) {
            return prev.filter(n => n.necessityId !== necessityId);
          }
    
          const newNeed: Necessity = {
            necessityId: necessityId,
            name: "",
            description: "",
            ngroup: ""
          };
    
          return [...prev, newNeed];
        });
  };

  return (
    <>
      <AuthHeader
        icon={<UserPlus className="w-8 h-8 text-white" />}
        title="Criar Conta"
        subtitle="Junte-se à nossa comunidade inclusiva"
      >
        {/* Indicador de progresso (Stepper) */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${registerStep >= 1 ? "bg-gray-600 text-white" : "bg-gray-200"}`}>{registerStep > 1 ? <Check /> : "1"}</div>
            <span className="ml-2 text-sm font-medium">Dados</span>
          </div>
          <div className={`w-8 h-1 rounded transition-all ${registerStep >= 2 ? "bg-gray-600" : "bg-gray-200"}`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${registerStep >= 2 ? "bg-gray-600 text-white" : "bg-gray-200"}`}>{registerStep > 2 ? <Check /> : "2"}</div>
            <span className="ml-2 text-sm font-medium">Preferências</span>
          </div>
          <div className={`w-8 h-1 rounded transition-all ${registerStep >= 3 ? "bg-gray-600" : "bg-gray-200"}`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${registerStep >= 3 ? "bg-gray-600 text-white" : "bg-gray-200"}`}>3</div>
            <span className="ml-2 text-sm font-medium">Finalizar</span>
          </div>
        </div>
      </AuthHeader>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4 pt-6">
        {/* Passo 1: Dados Pessoais */}
        {registerStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="firstName">Nome *</Label><Input id="firstName" {...register("firstName")} />{errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}</div>
              <div><Label htmlFor="lastName">Sobrenome *</Label><Input id="lastName" {...register("lastName")} />{errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}</div>
            </div>
            <div><Label htmlFor="email">E-mail *</Label><Input id="email" type="email" {...register("email")} />{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}</div>
            <div><Label htmlFor="password">Senha *</Label><PasswordInput id="password" {...register("password")} />{passwordValue && <PasswordStrength password={passwordValue} />}{errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}</div>
            <div><Label htmlFor="confirmPassword">Confirmar Senha *</Label><PasswordInput id="confirmPassword" {...register("confirmPassword")} />{errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}</div>
            <Button type="button" onClick={handleNextStep} className="w-full h-12">Próximo</Button>
          </div>
        )}

        {/* Passo 2: Preferências de Acessibilidade */}
        {registerStep === 2 && (
          <div className="space-y-4">
            <Label className="text-base">Selecione suas preferências (opcional)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1 border rounded-lg">
              {tiposAcessibilidade.map((tipo) => (
                <div key={tipo.value} className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer ${selectedNeeds.some(n => n.necessityId === tipo.necessityId) ? "border-gray-600 bg-gray-50" : "border-gray-200 hover:border-gray-400"}`} onClick={() => toggleNeed(tipo.necessityId)}>
                  <tipo.icon className={`w-5 h-5 ${selectedNeeds.some(n => n.necessityId === tipo.necessityId) ? "text-gray-700" : "text-gray-500"}`} />
                  <Label className="text-sm font-medium cursor-pointer flex-1">{tipo.label}</Label>
                </div>
              ))}
            </div>
            <div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setRegisterStep(1)} className="w-full">Voltar</Button><Button type="button" onClick={() => setRegisterStep(3)} className="w-full">Próximo</Button></div>
          </div>
        )}

        {/* Passo 3: Resumo e Termos */}
        {registerStep === 3 && (
          <div className="space-y-6">
            <Card className="p-4 bg-gray-50"><h3 className="font-semibold mb-2">Resumo dos Dados</h3><div className="space-y-1 text-sm"><p><strong>Nome:</strong> {watch("firstName")} {watch("lastName")}</p><p><strong>E-mail:</strong> {watch("email")}</p></div></Card>
            <Card className="p-4 bg-gray-50"><h3 className="font-semibold mb-2">Preferências</h3><div className="flex flex-wrap gap-2">{selectedNeeds.length > 0 ? selectedNeeds.map(need => <Badge key={need.necessityId}>{tiposAcessibilidade.find(n => n.necessityId === need.necessityId)?.label}</Badge>) : <p className="text-sm text-gray-500">Nenhuma preferência selecionada.</p>}</div></Card>
            <div className="flex items-start space-x-3 pt-2"><Checkbox id="terms" checked={acceptTerms} onCheckedChange={(c) => setAcceptTerms(c === true)} /><Label htmlFor="terms" className="text-sm font-normal cursor-pointer">Aceito os <a href="#" className="underline">termos de uso</a>.</Label></div>
            <div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setRegisterStep(2)} className="w-full">Voltar</Button><Button type="submit" className="w-full" disabled={isSubmitting || !acceptTerms}>{isSubmitting ? <Loader2 className="animate-spin" /> : "Finalizar Cadastro"}</Button></div>
          </div>
        )}

        <div className="text-center pt-4 border-t">
          <button type="button" onClick={() => onNavigate("login")} className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1 mx-auto">
            <ArrowLeft className="w-4 h-4" /> Já tenho conta
          </button>
        </div>
      </form>
    </>
  );
}

function setData(arg0: { email: string; password: string; fName: string; lName: string; }): any {
  throw new Error("Function not implemented.");
}