// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @description Função utilitária para mesclar nomes de classes do Tailwind CSS
 * de forma inteligente, resolvendo conflitos e condicionais.
 * Combina 'clsx' (para classes condicionais) e 'tailwind-merge' (para resolver conflitos).
 * @param {...ClassValue[]} inputs Uma lista de nomes de classes,
 * podendo ser strings, arrays ou objetos condicionais.
 * @returns {string} Uma string única com os nomes de classe mesclados e resolvidos.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}