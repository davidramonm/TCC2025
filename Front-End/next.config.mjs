/** @type {import('next').NextConfig} */

/**
 * @constant nextConfig
 * @description Configurações do framework Next.js.
 * * Destaques:
 * - `eslint.ignoreDuringBuilds`: Evita que avisos de Lint parem o build de produção (útil em prazos curtos).
 * - `typescript.ignoreBuildErrors`: Permite o build mesmo com erros de tipagem (usar com cautela, mas útil para deploy rápido no TCC).
 * - `images.unoptimized`: Desabilita a otimização de imagens do Next.js (necessário se o servidor de hospedagem não suportar processamento de imagem ou para reduzir custos).
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  }
}

export default nextConfig