"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Key, Mail, Loader2, Armchair as Wheelchair, Accessibility } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import AuthHeader from "@/components/layouts/AuthHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface LoginPageProps {
  onNavigate: (view: "register" | "recovery") => void;
  onLoginSuccess: () => void;
}

export default function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login, isLoggedIn } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    setLoginError(null);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await login(data.email, data.password);
      onLoginSuccess();
    } catch (error: Error | any) {
      setLoginError(error.props);
    }



  };

  return (
    <>
      <AuthHeader
        icon={<Accessibility className="w-8 h-8 text-white" />}
        title="Mapa Acessível"
        subtitle="Conectando pessoas a lugares acessíveis"
      />

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 pt-6" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" aria-hidden="true" />
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              className="pl-10 h-12"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1" role="alert">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <PasswordInput
            id="password"
            placeholder="Digite sua senha"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className="text-xs text-red-500 mt-1" role="alert">{errors.password.message}</p>}
        </div>

        {loginError && (
          <p className="text-sm text-red-600 font-medium text-center mt-2" role="alert">
            {loginError}
          </p>
        )}

        <Button type="submit" className="w-full h-12" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : 'Entrar'}
        </Button>

        <div className="flex justify-between items-center text-sm pt-4 border-t">
          <button type="button" onClick={() => onNavigate("register")} className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1">
            <UserPlus className="w-4 h-4" aria-hidden="true" />Criar conta
          </button>
          <button type="button" onClick={() => onNavigate("recovery")} className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <Key className="w-4 h-4" aria-hidden="true" />Esqueci a senha
          </button>
        </div>
      </form>
    </>
  );
}