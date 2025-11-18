// src/features/authentication/schemas.ts
import { z } from 'zod';

/**
 * @constant loginSchema
 * @description Esquema de validação para o formulário de Login.
 * Define as regras básicas de entrada para autenticação.
 * * Regras:
 * - email: Deve ser uma string em formato de e-mail válido.
 * - password: Campo obrigatório (não pode estar vazio).
 */
export const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

/**
 * @constant registerSchema
 * @description Esquema de validação robusto para o formulário de Cadastro (Registro).
 * Implementa políticas de senha forte e verifica a igualdade entre os campos de senha.
 * * Regras de validação:
 * - firstName: Mínimo de 2 caracteres.
 * - lastName: Mínimo de 2 caracteres.
 * - email: Formato de e-mail válido.
 * - password: Política de segurança forte:
 * - Mínimo de 8 caracteres.
 * - Pelo menos uma letra maiúscula (A-Z).
 * - Pelo menos um número (0-9).
 * - Pelo menos um caractere especial (símbolo).
 * - confirmPassword: Deve corresponder exatamente ao campo password.
 */
export const registerSchema = z.object({
  firstName: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  lastName: z.string().min(2, { message: "O sobrenome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
    .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos um símbolo especial." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"], // Associa o erro especificamente ao campo de confirmação
});

/**
 * @type LoginFormData
 * @description Tipo TypeScript inferido automaticamente a partir do schema Zod de login.
 * Garante a sincronia entre a validação e a tipagem utilizada nos componentes.
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * @type RegisterFormData
 * @description Tipo TypeScript inferido automaticamente a partir do schema Zod de registro.
 * Utilizado para tipar o hook 'useForm' e os parâmetros de envio da API.
 */
export type RegisterFormData = z.infer<typeof registerSchema>;