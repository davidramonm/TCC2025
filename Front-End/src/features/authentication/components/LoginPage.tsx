// src/features/authentication/components/LoginPage.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Key, Mail, Loader2, Armchair as Wheelchair } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import AuthHeader from "@/components/layouts/AuthHeader";

interface LoginPageProps {
  onNavigate: (view: "register" | "recovery") => void;
  onLogin: (name: string) => void;
}

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userFirstName = data.email.split('@')[0] || "Usuário";
    onLogin(userFirstName);
  };

  return (
    <>
      <AuthHeader
        icon={<Wheelchair className="w-8 h-8 text-white" />}
        title="Mapa Acessível"
        subtitle="Conectando pessoas a lugares acessíveis"
      />
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input id="email" type="email" placeholder="Digite seu e-mail" className="pl-10 h-12" {...register("email")} />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <PasswordInput id="password" placeholder="Digite sua senha" {...register("password")} />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Entrar'}
        </Button>
        <div className="flex justify-between items-center text-sm pt-4 border-t">
          <button type="button" onClick={() => onNavigate("register")} className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1">
            <UserPlus className="w-4 h-4" /> Criar conta
          </button>
          <button type="button" onClick={() => onNavigate("recovery")} className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <Key className="w-4 h-4" /> Esqueci a senha
          </button>
        </div>
      </form>
    </>
  );
}