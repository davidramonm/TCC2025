"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, UserPlus, Key, Mail, Loader2, Armchair as Wheelchair } from "lucide-react"
import AuthLayout from "../layouts/AuthLayout" // Importa o novo layout
import { PasswordInput } from "../ui/password-input" // Importa o novo input de senha

interface LoginPageProps {
  onNavigate: (view: "register" | "recovery" | "map") => void
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo ao Mapa Acessível!",
    })

    setTimeout(() => {
      onNavigate("map")
      setIsLoading(false)
    }, 1000)
  }

  return (
    // Utiliza o AuthLayout para encapsular o conteúdo da página.
    <AuthLayout>
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/95 shadow-2xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Wheelchair className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Mapa Acessível
            </h1>
            <p className="text-gray-600 mt-2">Conectando pessoas a lugares acessíveis</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input id="email" type="email" placeholder="Digite seu e-mail" className="pl-10 h-12" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              {/* Substitui o antigo Input por PasswordInput, simplificando o código. */}
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
    </AuthLayout>
  )
}