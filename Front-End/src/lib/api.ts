// src/lib/api.ts
import { Location } from '@/types';

/**
 * @description Busca a lista de locais. Atualmente, simula uma chamada de API
 * retornando dados mockados após um pequeno atraso.
 * @returns {Promise<Location[]>} Uma promessa que resolve para a lista de locais.
 */
export async function fetchLocations(): Promise<Location[]> {
  // Dados de exemplo estão agora dentro da função para simular uma fonte de dados
  const mockLocations: Location[] = [
    { 
      id: 1, 
      name: "Shopping Center Acessível", 
      address: "Rua das Flores, 123, São Paulo", 
      typeValues: ["rampa", "banheiro"], 
      rating: 5, 
      lat: -23.5505, 
      lng: -46.6333, 
      description: "Ótimo shopping com rampas de acesso em todas as entradas e banheiros adaptados em todos os andares." 
    },
    { 
      id: 2, 
      name: "Praça da Paz", 
      address: "Avenida da Liberdade, 456, São Paulo", 
      typeValues: ["circulacao", "piso"], 
      rating: 4, 
      lat: -23.54, 
      lng: -46.65, 
      description: "Praça ampla com piso tátil bem sinalizado e muito espaço para circulação." 
    },
  ];

  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockLocations;
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