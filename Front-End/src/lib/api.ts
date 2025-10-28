// src/lib/api.ts
import { Establishment, Location, Review } from '@/types';
import axios from 'axios';
import { tokenService } from './tokenService';

/**
 * @description Instância principal do Axios (apiClient) configurada para
 * interagir com a API backend.
 * Inclui baseURL, withCredentials e interceptors para gerenciamento de token.
 */
const apiClient = axios.create({
  baseURL: "http://localhost:8080", 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @description Interceptor de requisição do Axios.
 * Adiciona o token JWT (se existir) ao cabeçalho Authorization
 * de cada requisição antes de ela ser enviada.
 */
apiClient.interceptors.request.use(config => {
  const token = tokenService.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * @description Interceptor de resposta do Axios.
 * Lida com respostas 401 (Não Autorizado) para tentar
 * renovar o token de acesso (refresh token) automaticamente.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `http://localhost:8080/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;
        tokenService.set(newToken);

        apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        tokenService.clear();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

/**
 * @description Busca a lista de locais (estabelecimentos) da API.
 * @returns {Promise<Location[]>} Uma promessa que resolve para a lista de locais.
 * Retorna um array vazio em caso de erro.
 */
export async function fetchLocations(): Promise<Location[]> {
  try {
    const response = await apiClient.get('/establishments');
    return response.data as Location[];
  } catch (error) {
    console.error('Erro ao buscar estabelecimentos:', error);
    return [];
  }
}

/**
 * @description Busca os detalhes de um estabelecimento específico pelo seu ID.
 * @param {string} id O ID do estabelecimento.
 * @returns {Promise<Establishment | null>} Uma promessa que resolve para os dados do
 * estabelecimento ou null em caso de erro.
 * @throws {Error} Lança o erro se a busca falhar.
 */
export async function getEstablishmentById(id: string): Promise<Establishment | null> {
  try {
    const response = await apiClient.get(`/establishments/${id}`);
    return response.data as Establishment;
  } catch (error) {
    console.error('Erro ao buscar estabelecimento:', error);
    throw error;
  }
}

/**
 * @description Busca um estabelecimento com base em coordenadas geográficas (latitude e longitude).
 * @param {number} xCoords Latitude (coordenada X).
 * @param {number} yCoords Longitude (coordenada Y).
 * @returns {Promise<Establishment | null>} Uma promessa que resolve para o estabelecimento
 * encontrado ou null se nenhum for encontrado ou em caso de erro.
 */
export async function getEstablishmentFromCoordinates(xCoords: number, yCoords: number): Promise<Establishment | null> {
  try {
    const response = await apiClient.get(`/establishments/coordinates`, {
      params: { xCoords, yCoords }
    });
    return response.data as Establishment;
  } catch (error) {
    console.error('Erro ao buscar estabelecimento por coordenadas:', error);
    return null;
  }
}

/**
 * @description Envia os dados de um novo estabelecimento para serem salvos na API.
 * @param {Location} establishmentData Os dados do local a ser salvo.
 * @returns {Promise<Location>} Uma promessa que resolve para o local salvo (com ID).
 * @throws {Error} Lança um erro se não for possível salvar.
 */
export async function saveEstablishment(establishmentData: Location): Promise<Location> {
  try {
    const response = await apiClient.post('/establishments', establishmentData);
    return response.data as Location;
  } catch (error) {
    console.error('Erro ao salvar estabelecimento:', error);
    throw error;
  }
}

/**
 * @description Envia os dados de uma nova avaliação para serem salvos na API.
 * @param {any} reviewData Os dados da avaliação.
 * @returns {Promise<Review>} Uma promessa que resolve para a avaliação salva.
 * @throws {Error} Lança um erro se não for possível salvar.
 */
export async function saveReview(reviewData: any): Promise<Review> {
  try {
    const response = await apiClient.post(`/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar avaliação:', error);
    throw error;
  }
}

/**
 * @description Envia dados atualizados de uma avaliação existente para a API.
 * @param {string} reviewId O ID da avaliação a ser atualizada.
 * @param {any} reviewData Os novos dados da avaliação.
 * @returns {Promise<Review>} Uma promessa que resolve para a avaliação atualizada.
 * @throws {Error} Lança um erro se não for possível atualizar.
 */
export async function updateReview(reviewId: string, reviewData: any): Promise<Review> {
  try {
    const response = await apiClient.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  }
  catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    throw error;
  }
}

/**
 * @description Busca um endereço legível a partir de coordenadas geográficas.
 * Utiliza a API pública do Nominatim (OpenStreetMap).
 * @param {number} lat - A latitude.
 * @param {number} lng - A longitude.
 * @returns {Promise<string>} O endereço formatado ou uma mensagem de erro.
 */
export async function getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    const data = await response.json();

    if (data && data.address) {
      const { road, house_number, suburb, city, town, village } = data.address;
      const addressParts = [
        road || '', house_number || '', suburb || '', city || town || village || ''
      ].filter(Boolean);

      const uniqueAddressParts = [...new Set(addressParts)];
      return uniqueAddressParts.join(', ');
    }
    throw new Error("Endereço não encontrado na resposta da API.");
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    return "Não foi possível encontrar o endereço.";
  }
}

/**
 * @description Busca todos os estabelecimentos (usando fetch, parece ser uma alternativa ao apiClient).
 * @returns {Promise<any>} Uma promessa que resolve para a lista de estabelecimentos.
 * @throws {Error} Lança um erro se a requisição falhar.
 */
export async function fetchAllEstablishments(): Promise<any> {
  try {
    const response = await fetch('http://localhost:8080/establishments', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar estabelecimentos:", error);
    throw error;
  }
}

/**
 * @description Busca detalhes de um estabelecimento pelo ID (usando fetch).
 * @param {number} id O ID do estabelecimento.
 * @returns {Promise<any>} Uma promessa que resolve para os detalhes do estabelecimento.
 * @throws {Error} Lança um erro se a requisição falhar.
 */
export async function getEstablishmentDetails(id: number): Promise<any> {
  try {
    const response = await fetch(`http://localhost:8080/establishments/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar detalhes do estabelecimento:", error);
    throw error;
  }
}