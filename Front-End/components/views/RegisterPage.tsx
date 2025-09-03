"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowRight,
  ArrowLeft,
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Heart,
  Check,
  Loader2,
  CheckCircle,
  AlertCircle,
  Armchair as Wheelchair,
  EarOff,
  Brain,
  Baby,
  Clock,
  Scale,
  Church as Crutches,
  Users,
  Navigation,
  Volume2,
} from "lucide-react"

interface RegisterPageProps {
  onNavigate: (view: "login" | "map") => void
}

const necessidades = [
  { value: "cadeirante", label: "Cadeirante", icon: Wheelchair },
  { value: "baixa-visao", label: "Baixa visão", icon: Eye },
  { value: "cegueira", label: "Cegueira", icon: EyeOff },
  { value: "surdez", label: "Surdez", icon: EarOff },
  { value: "deficiencia-auditiva", label: "Deficiência auditiva", icon: Volume2 },
  { value: "deficiencia-motora", label: "Deficiência motora", icon: Crutches },
  { value: "deficiencia-intelectual", label: "Deficiência intelectual", icon: Brain },
  { value: "autismo", label: "Autismo", icon: Users },
  { value: "mobilidade-reduzida", label: "Mobilidade reduzida", icon: Navigation },
  { value: "obesidade", label: "Obesidade", icon: Scale },
  { value: "gestante", label: "Gestante", icon: Baby },
  { value: "idoso", label: "Idoso", icon: Clock },
]

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { toast } = useToast()
  const [registerStep, setRegisterStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const canProceedToStep2 = () => {
    return (
      registerData.firstName.length >= 2 &&
      registerData.lastName.length >= 2 &&
      isValidEmail(registerData.email) &&
      getPasswordStrength(registerData.password) >= 80 &&
      registerData.password === registerData.confirmPassword
    )
  }

  const toggleNeed = (needValue: string) => {
    setSelectedNeeds((prev) => (prev.includes(needValue) ? prev.filter((n) => n !== needValue) : [...prev, needValue]))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptTerms) {
      toast({
        title: "Termos obrigatórios",
        description: "Você deve aceitar os termos de uso para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "🎉 Conta criada com sucesso!",
      description: `Bem-vindo(a), ${registerData.firstName}! Sua conta foi criada.`,
    })

    setTimeout(() => {
      onNavigate("map")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gray-600 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gray-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-gray-400 rounded-full animate-pulse delay-2000"></div>
      </div>

      <Card className="w-full max-w-3xl backdrop-blur-sm bg-white/95 shadow-2xl border-0 max-h-[95vh] overflow-y-auto">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Criar Conta
            </h1>
            <p className="text-gray-600 mt-2">Junte-se à nossa comunidade inclusiva</p>

            <div className="flex items-center justify-center mt-6 space-x-2">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    registerStep >= 1 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {registerStep > 1 ? <Check className="w-4 h-4" /> : "1"}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Dados Pessoais</span>
              </div>
              <div
                className={`w-8 h-1 rounded transition-all ${registerStep >= 2 ? "bg-gray-600" : "bg-gray-200"}`}
              ></div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    registerStep >= 2 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {registerStep > 2 ? <Check className="w-4 h-4" /> : "2"}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Necessidades</span>
              </div>
              <div
                className={`w-8 h-1 rounded transition-all ${registerStep >= 3 ? "bg-gray-600" : "bg-gray-200"}`}
              ></div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    registerStep >= 3 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {registerStep > 3 ? <Check className="w-4 h-4" /> : "3"}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">Confirmação</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {registerStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Vamos começar com seus dados</h2>
                  <p className="text-gray-600 text-sm mt-1">Precisamos de algumas informações básicas</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="firstName"
                        placeholder="Seu primeiro nome"
                        className={`pl-10 h-12 transition-all ${
                          registerData.firstName && registerData.firstName.length >= 2
                            ? "border-gray-600 focus:border-gray-600"
                            : registerData.firstName && registerData.firstName.length > 0
                              ? "border-red-500 focus:border-red-500"
                              : ""
                        }`}
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                      {registerData.firstName && registerData.firstName.length >= 2 && (
                        <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    {registerData.firstName &&
                      registerData.firstName.length > 0 &&
                      registerData.firstName.length < 2 && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Nome deve ter pelo menos 2 caracteres
                        </p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="lastName"
                        placeholder="Seu sobrenome"
                        className={`pl-10 h-12 transition-all ${
                          registerData.lastName && registerData.lastName.length >= 2
                            ? "border-gray-600 focus:border-gray-600"
                            : registerData.lastName && registerData.lastName.length > 0
                              ? "border-red-500 focus:border-red-500"
                              : ""
                        }`}
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                      {registerData.lastName && registerData.lastName.length >= 2 && (
                        <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">E-mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      className={`pl-10 h-12 transition-all ${
                        registerData.email && isValidEmail(registerData.email)
                          ? "border-gray-600 focus:border-gray-600"
                          : registerData.email && registerData.email.length > 0
                            ? "border-red-500 focus:border-red-500"
                            : ""
                      }`}
                      value={registerData.email}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                    {registerData.email && isValidEmail(registerData.email) && (
                      <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  {registerData.email && registerData.email.length > 0 && !isValidEmail(registerData.email) && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Digite um e-mail válido
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crie uma senha segura"
                      className={`pl-10 pr-10 h-12 transition-all ${
                        registerData.password && getPasswordStrength(registerData.password) >= 80
                          ? "border-gray-600 focus:border-gray-600"
                          : registerData.password && registerData.password.length > 0
                            ? "border-yellow-500 focus:border-yellow-500"
                            : ""
                      }`}
                      value={registerData.password}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {registerData.password && (
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            getPasswordStrength(registerData.password) >= 80
                              ? "bg-gray-600"
                              : getPasswordStrength(registerData.password) >= 60
                                ? "bg-yellow-500"
                                : getPasswordStrength(registerData.password) >= 40
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${getPasswordStrength(registerData.password)}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div
                          className={`flex items-center gap-1 ${registerData.password.length >= 8 ? "text-gray-600" : "text-gray-400"}`}
                        >
                          {registerData.password.length >= 8 ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          8+ caracteres
                        </div>
                        <div
                          className={`flex items-center gap-1 ${/[A-Z]/.test(registerData.password) ? "text-gray-600" : "text-gray-400"}`}
                        >
                          {/[A-Z]/.test(registerData.password) ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          Letra maiúscula
                        </div>
                        <div
                          className={`flex items-center gap-1 ${/[0-9]/.test(registerData.password) ? "text-gray-600" : "text-gray-400"}`}
                        >
                          {/[0-9]/.test(registerData.password) ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          Número
                        </div>
                        <div
                          className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(registerData.password) ? "text-gray-600" : "text-gray-400"}`}
                        >
                          {/[^A-Za-z0-9]/.test(registerData.password) ? (
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
                  <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Digite a senha novamente"
                      className={`pl-10 pr-10 h-12 transition-all ${
                        registerData.confirmPassword && registerData.password === registerData.confirmPassword
                          ? "border-gray-600 focus:border-gray-600"
                          : registerData.confirmPassword && registerData.confirmPassword.length > 0
                            ? "border-red-500 focus:border-red-500"
                            : ""
                      }`}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      As senhas não coincidem
                    </p>
                  )}
                  {registerData.confirmPassword && registerData.password === registerData.confirmPassword && (
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Senhas coincidem
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    if (canProceedToStep2()) {
                      setRegisterStep(2)
                    } else {
                      toast({
                        title: "Campos obrigatórios",
                        description: "Por favor, preencha todos os campos corretamente antes de continuar.",
                        variant: "destructive",
                      })
                    }
                  }}
                  className="w-full h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={!canProceedToStep2()}
                >
                  <span className="flex items-center gap-2">
                    Continuar <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            )}

            {registerStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Suas necessidades específicas</h2>
                  <p className="text-gray-600 text-sm mt-1">Isso nos ajuda a personalizar sua experiência (opcional)</p>
                </div>

                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-base">
                    <Heart className="w-5 h-5 text-gray-600" />
                    Selecione suas necessidades específicas
                  </Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Essas informações nos ajudam a destacar locais mais relevantes para você. Você pode pular esta etapa
                    e configurar depois.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {necessidades.map((necessidade) => {
                      const IconComponent = necessidade.icon
                      const isSelected = selectedNeeds.includes(necessidade.value)
                      return (
                        <div
                          key={necessidade.value}
                          className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "border-gray-600 bg-gray-50 shadow-md transform scale-105"
                              : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                          }`}
                          onClick={() => toggleNeed(necessidade.value)}
                        >
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected ? "border-gray-600 bg-gray-600" : "border-gray-300"
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <IconComponent
                            className={`w-5 h-5 transition-colors ${isSelected ? "text-gray-700" : "text-gray-500"}`}
                          />
                          <Label className="text-sm font-medium cursor-pointer flex-1">{necessidade.label}</Label>
                        </div>
                      )
                    })}
                  </div>

                  {selectedNeeds.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-800 font-medium mb-2">
                        Necessidades selecionadas ({selectedNeeds.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedNeeds.map((need) => {
                          const necessidade = necessidades.find((n) => n.value === need)
                          return (
                            <Badge key={need} variant="secondary" className="bg-gray-200 text-gray-800">
                              {necessidade?.label}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setRegisterStep(1)} className="flex-1 h-12">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setRegisterStep(3)}
                    className="flex-1 h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                  >
                    <span className="flex items-center gap-2">
                      Continuar <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              </div>
            )}

            {registerStep === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Confirme seus dados</h2>
                  <p className="text-gray-600 text-sm mt-1">Revise as informações antes de criar sua conta</p>
                </div>

                <div className="space-y-4">
                  <Card className="p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Dados Pessoais
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nome:</span>
                        <span className="font-medium">
                          {registerData.firstName} {registerData.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">E-mail:</span>
                        <span className="font-medium">{registerData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Senha:</span>
                        <span className="font-medium">••••••••</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-gray-600" />
                      Necessidades Específicas
                    </h3>
                    {selectedNeeds.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedNeeds.map((need) => {
                          const necessidade = necessidades.find((n) => n.value === need)
                          const IconComponent = necessidade?.icon || User
                          return (
                            <Badge key={need} variant="secondary" className="flex items-center gap-1">
                              <IconComponent className="w-3 h-3" />
                              {necessidade?.label}
                            </Badge>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Nenhuma necessidade específica selecionada</p>
                    )}
                  </Card>

                  <div className="flex items-start space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
                    <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                        Aceito os termos de uso e política de privacidade
                      </Label>
                      <p className="text-xs text-gray-600 mt-1">
                        Ao criar sua conta, você concorda com nossos{" "}
                        <a href="#" className="text-gray-700 hover:underline">
                          termos de uso
                        </a>{" "}
                        e{" "}
                        <a href="#" className="text-gray-700 hover:underline">
                          política de privacidade
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setRegisterStep(2)} className="flex-1 h-12">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading || !acceptTerms}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <span className="flex items-center gap-2">
                        Criar Conta <Check className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center pt-4 border-t">
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Já tenho conta
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
