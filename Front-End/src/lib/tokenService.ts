// src/lib/tokenService.ts

let accessToken: string | null = null;

/**
 * @description Objeto singleton para gerenciar o token de acesso (JWT)
 * armazenado em memória (variável local).
 */
export const tokenService = {
  /**
   * @description Obtém o token de acesso atual.
   * @returns {string | null} O token de acesso ou null se não houver.
   */
  get: () => accessToken,
  
  /**
   * @description Define/atualiza o token de acesso.
   * @param {string} token O novo token JWT.
   * @returns {void}
   */
  set: (token: string) => { accessToken = token; },
  
  /**
   * @description Remove o token de acesso (define como null).
   * @returns {void}
   */
  clear: () => { accessToken = null; },
};