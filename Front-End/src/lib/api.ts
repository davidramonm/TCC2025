// src/lib/api.ts
import { Establishment, Location, Review } from '@/types';
import axios from 'axios';
import { tokenService } from './tokenService';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const token = tokenService.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:8080/auth/refresh",
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
 * @description Busca a lista de locais. Atualmente, simula uma chamada de API
 * retornando dados mockados após um pequeno atraso.
 * @returns {Promise<Location[]>} Uma promessa que resolve para a lista de locais.
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

export async function fetchEstablishmentById(id: number): Promise<Establishment> {
  try {
    const response = await apiClient.get(`/establishments/${id}`);
    return response.data as Establishment;
  } catch (error) {
    console.error('Erro ao buscar estabelecimento:', error);
    throw error;
  }
}

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

export async function saveEstablishment(establishmentData: any): Promise<Establishment> {
  try {
    const response = await apiClient.post('/establishments', establishmentData);
    return response.data as Establishment;
  } catch (error) {
    console.error('Erro ao salvar estabelecimento:', error);
    throw error;
  }
}

export async function saveReview(reviewData: any): Promise<Review> {
  try {
    const response = await apiClient.post(`/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar avaliação:', error);
    throw error;
  }
}

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

// Dados de exemplo estão agora dentro da função para simular uma fonte de dados
// const mockLocations: Location[] = [
//   {
//     id: 1,
//     name: "Shopping Center Acessível",
//     address: "Rua das Flores, 123, São Paulo",
//     typeValues: ["rampa", "banheiro"],
//     rating: 5,
//     lat: -23.5505,
//     lng: -46.6333,
//     description: "Ótimo shopping com rampas de acesso em todas as entradas e banheiros adaptados em todos os andares."
//   },
//   {
//     id: 2,
//     name: "Praça da Paz",
//     address: "Avenida da Liberdade, 456, São Paulo",
//     typeValues: ["circulacao", "piso"],
//     rating: 4,
//     lat: -23.54,
//     lng: -46.65,
//     description: "Praça ampla com piso tátil bem sinalizado e muito espaço para circulação."
//   },
// ];



// return mockLocations;


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