"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowRight,
  ArrowLeft,
  Key,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  CheckCircle,
  AlertCircle,
  RotateCcw,
} from "lucide-react"
import { getPasswordStrength } from "@/lib/constants"

interface RecoveryPageProps {
  onNavigate: (view: "login") => void
}

export default function RecoveryPage({ onNavigate }: RecoveryPageProps) {
  const { toast } = useToast()
  const [recoveryStep, setRecoveryStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResendingCode, setIsResendingCode] = useState(false)
  const [sentCode, setSentCode] = useState("")
  const [codeTimer, setCodeTimer] = useState(0)
  const [recoveryData, setRecoveryData] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  })

  const sendVerificationCode = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setSentCode(code)

    setCodeTimer(60)
    const timer = setInterval(() => {
      setCodeTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setIsLoading(false)
    setRecoveryStep(2)

    toast({
      title: "Código enviado!",
      description: `Código de verificação enviado para ${recoveryData.email}. (Código: ${code} - apenas para demonstração)`,
      duration: 8000,
    })
  }

  const resendCode = async () => {
    if (codeTimer > 0) return

    setIsResendingCode(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newCode = Math.floor(100000 + Math.random() * 900000).toString()
    setSentCode(newCode)
    setCodeTimer(60)

    const timer = setInterval(() => {
      setCodeTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setIsResendingCode(false)

    toast({
      title: "Novo código enviado!",
      description: `Novo código: ${newCode} (apenas para demonstração)`,
      duration: 6000,
    })
  }

  const verifyCode = () => {
    if (recoveryData.verificationCode === sentCode) {
      setRecoveryStep(3)
      toast({
        title: "Código verificado!",
        description: "Agora você pode definir sua nova senha.",
      })
    } else {
      toast({
        title: "Código incorreto",
        description: "Verifique o código e tente novamente.",
        variant: "destructive",
      })
    }
  }

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (recoveryData.newPassword !== recoveryData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas devem ser idênticas.",
        variant: "destructive",
      })
      return
    }

    if (getPasswordStrength(recoveryData.newPassword) < 80) {
      toast({
        title: "Senha muito fraca",
        description: "Sua senha deve atender a todos os critérios de segurança.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    toast({
      title: "🎉 Senha redefinida com sucesso!",
      description: "Sua senha foi alterada. Você pode fazer login agora.",
    })

    setRecoveryStep(1)
    setRecoveryData({
      email: "",
      verificationCode: "",
      newPassword: "",
      confirmPassword: "",
    })
    setSentCode("")
    setCodeTimer(0)

    setTimeout(() => {
      onNavigate("login")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gray-600 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gray-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-gray-400 rounded-full animate-pulse delay-2000"></div>
      </div>

      <Card className="w-full max-w-md backdrop-blur-sm bg-white/95 shadow-2xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Recuperar Senha
            </h1>
            <p className="text-gray-600 mt-2">
              {recoveryStep === 1 && "Digite seu e-mail para receber o código"}
              {recoveryStep === 2 && "Digite o código enviado para seu e-mail"}
              {recoveryStep === 3 && "Defina sua nova senha"}
            </p>

            <div className="flex items-center justify-center mt-6 space-x-2">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    recoveryStep >= 1 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">E-mail</span>
              </div>
              <div
                className={`w-8 h-1 rounded transition-all ${recoveryStep >= 2 ? "bg-gray-600" : "bg-gray-200"}`}
              ></div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    recoveryStep >= 2 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Código</span>
              </div>
              <div
                className={`w-8 h-1 rounded transition-all ${recoveryStep >= 3 ? "bg-gray-600" : "bg-gray-200"}`}
              ></div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    recoveryStep >= 3 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Nova Senha</span>
              </div>
            </div>
          </div>

          {recoveryStep === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendVerificationCode()
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="recovery-email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="recovery-email"
                    type="email"
                    placeholder="Digite seu e-mail cadastrado"
                    className="pl-10 h-12"
                    value={recoveryData.email}
                    onChange={(e) => setRecoveryData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                disabled={isLoading || !recoveryData.email}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <span className="flex items-center gap-2">
                    Enviar Código <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <div className="text-center pt-4 border-t">
                <button
                  type="button"
                  onClick={() => onNavigate("login")}
                  className="text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1 mx-auto transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao login
                </button>
              </div>
            </form>
          )}

          {recoveryStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="verification-code">Código de Verificação</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="verification-code"
                    placeholder="Digite o código de 6 dígitos"
                    className="pl-10 h-12 text-center text-lg tracking-widest"
                    value={recoveryData.verificationCode}
                    onChange={(e) => setRecoveryData((prev) => ({ ...prev, verificationCode: e.target.value }))}
                    maxLength={6}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Código enviado para: <span className="font-medium">{recoveryData.email}</span>
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setRecoveryStep(1)} className="flex-1 h-12">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  onClick={verifyCode}
                  className="flex-1 h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                  disabled={recoveryData.verificationCode.length !== 6}
                >
                  Verificar
                </Button>
              </div>

              <div className="text-center">
                <button
                  onClick={resendCode}
                  disabled={codeTimer > 0 || isResendingCode}
                  className="text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 flex items-center gap-1 mx-auto"
                >
                  {isResendingCode ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
                  {codeTimer > 0 ? `Reenviar em ${codeTimer}s` : "Reenviar código"}
                </button>
              </div>
            </div>
          )}

          {recoveryStep === 3 && (
            <form onSubmit={resetPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua nova senha"
                    className="pl-10 pr-10 h-12"
                    value={recoveryData.newPassword}
                    onChange={(e) => setRecoveryData((prev) => ({ ...prev, newPassword: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {recoveryData.newPassword && (
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          getPasswordStrength(recoveryData.newPassword) >= 80
                            ? "bg-gray-600"
                            : getPasswordStrength(recoveryData.newPassword) >= 60
                            ? "bg-yellow-500"
                            : getPasswordStrength(recoveryData.newPassword) >= 40
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${getPasswordStrength(recoveryData.newPassword)}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div
                        className={`flex items-center gap-1 ${recoveryData.newPassword.length >= 8 ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {recoveryData.newPassword.length >= 8 ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        8+ caracteres
                      </div>
                      <div
                        className={`flex items-center gap-1 ${/[A-Z]/.test(recoveryData.newPassword) ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {/[A-Z]/.test(recoveryData.newPassword) ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        Letra maiúscula
                      </div>
                      <div
                        className={`flex items-center gap-1 ${/[0-9]/.test(recoveryData.newPassword) ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {/[0-9]/.test(recoveryData.newPassword) ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        Número
                      </div>
                      <div
                        className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(recoveryData.newPassword) ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {/[^A-Za-z0-9]/.test(recoveryData.newPassword) ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        Símbolo especial
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirmar Nova Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirm-new-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    className="pl-10 pr-10 h-12"
                    value={recoveryData.confirmPassword}
                    onChange={(e) => setRecoveryData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {recoveryData.confirmPassword && recoveryData.newPassword !== recoveryData.confirmPassword && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    As senhas não coincidem
                  </p>
                )}
                {recoveryData.confirmPassword && recoveryData.newPassword === recoveryData.confirmPassword && (
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Senhas coincidem
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setRecoveryStep(2)} className="flex-1 h-12">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                  disabled={
                    isLoading ||
                    getPasswordStrength(recoveryData.newPassword) < 80 ||
                    recoveryData.newPassword !== recoveryData.confirmPassword
                  }
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Redefinir Senha <CheckCircle className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}