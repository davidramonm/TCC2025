// Front-End/lib/api.ts

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
      ].filter(Boolean); // Remove partes vazias
      
      const uniqueAddressParts = [...new Set(addressParts)];
      return uniqueAddressParts.join(', ');
    }
    throw new Error("Endereço não encontrado na resposta da API.");
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    return "Não foi possível encontrar o endereço.";
  }
}