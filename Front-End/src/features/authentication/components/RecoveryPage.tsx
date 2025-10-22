"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Key, 
  Mail, 
  Loader2 
} from "lucide-react";
import AuthHeader from "@/components/layouts/AuthHeader";

// Interface que define as props do componente
interface RecoveryPageProps {
  onNavigate: (view: "login") => void;
}

/**
 * Componente RecoveryPage
 * Responsável pela página de recuperação de senha
 * Permite ao usuário solicitar reset de senha via email
 */
export default function RecoveryPage({ onNavigate }: RecoveryPageProps) {
  // Hooks para gerenciar estado e notificações
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Função que processa o envio do formulário
   * Simula uma requisição com delay de 1.5s
   * Exibe toast de sucesso e redireciona para login
   */
  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Exibe notificação de sucesso
    toast({
      title: "E-mail de recuperação enviado!",
      description: "Por favor, verifique sua caixa de entrada.",
    });
    
    setIsLoading(false);
    onNavigate("login");
  };

  return (
    <>
      {/* Cabeçalho da página com ícone e textos */}
      <AuthHeader
        icon={<Key className="w-8 h-8 text-white" />}
        title="Recuperar Senha"
        subtitle="Digite seu e-mail para receber o link de recuperação"
      />

      {/* Formulário de recuperação */}
      <form 
        onSubmit={handleRecovery} 
        className="space-y-6 mt-8"
        noValidate
      >
        {/* Campo de email */}
        <div className="space-y-2">
          <Label htmlFor="recovery-email">E-mail</Label>
          <div className="relative">
            <Mail 
              className="absolute left-3 top-3 w-4 h-4 text-gray-400"
              aria-hidden="true" 
            />
            <Input
              id="recovery-email"
              type="email"
              placeholder="Digite seu e-mail cadastrado"
              className="pl-10 h-12"
              required
              aria-required="true"
            />
          </div>
        </div>

        {/* Botão de envio com estado de loading */}
        <Button 
          type="submit" 
          className="w-full h-12" 
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <Loader2 
              className="animate-spin"
              aria-hidden="true"
            />
          ) : (
            "Enviar E-mail"
          )}
        </Button>

        {/* Link para retornar ao login */}
        <div className="text-center pt-4 border-t">
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1 mx-auto"
          >
            <ArrowLeft 
              className="w-4 h-4"
              aria-hidden="true"
            />
            Voltar ao login
          </button>
        </div>
      </form>
    </>
  );
}