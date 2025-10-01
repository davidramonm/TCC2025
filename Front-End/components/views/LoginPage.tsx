// Front-End/components/views/LoginPage.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, UserPlus, Key, Mail, Loader2, Armchair as Wheelchair } from "lucide-react"
import { PasswordInput } from "../ui/password-input"
import AuthHeader from "../layouts/AuthHeader"

interface LoginPageProps {
  onNavigate: (view: "register" | "recovery") => void; // CORRIGIDO AQUI
  onLogin: (name: string) => void;
}

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const userFirstName = email.split('@')[0] || "Usuário";
    const capitalizedFirstName = userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1);

    toast({
      title: "Login realizado com sucesso!",
      description: `Bem-vindo(a) de volta, ${capitalizedFirstName}!`,
    })

    // A função onLogin agora é a única responsável por fechar o modal e atualizar o estado
    onLogin(capitalizedFirstName); 
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-md backdrop-blur-sm bg-white/95 shadow-2xl border-0">
      <CardContent className="p-8">
        <AuthHeader
          icon={<Wheelchair className="w-8 h-8 text-white" />}
          title="Mapa Acessível"
          subtitle="Conectando pessoas a lugares acessíveis"
        />

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                className="pl-10 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <PasswordInput
              id="password"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <span className="flex items-center gap-2">
                Entrar <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>

          <div className="flex justify-between items-center text-sm">
            <button
              type="button"
              onClick={() => onNavigate("register")}
              className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1"
            >
              <UserPlus className="w-4 h-4" />
              Criar conta
            </button>
            <button
              type="button"
              onClick={() => onNavigate("recovery")}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <Key className="w-4 h-4" />
              Esqueci a senha
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}