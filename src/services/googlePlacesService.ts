import axios from 'axios';
import { env } from '../config/env';

interface Restaurant {
  placeId: string;
  name: string;
  address?: string;
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  types?: string[];
  location?: {
    lat: number;
    lng: number;
  };
  photos?: string[];
  distance?: number; // em metros, se disponível
}

interface SearchParams {
  description: string;
  lat: number;
  lng: number;
  radius?: number;
  maxResults?: number;
}

class GooglePlacesService {
  private apiKey: string;

  constructor() {
    this.apiKey = env.googleMapsApiKey;
  }

  /**
   * Busca restaurantes próximos usando Text Search e depois detalha cada um.
   */
  async findRestaurants(params: SearchParams): Promise<Restaurant[]> {
    const {
      description,
      lat,
      lng,
      radius = env.defaultRadius,
      maxResults = env.maxResults,
    } = params;

    // Utiliza a API Text Search para buscar restaurantes com base na descrição
    const textSearchUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const textSearchParams = {
      query: `restaurantes ${description}`,
      location: `${lat},${lng}`,
      radius: radius,
      type: 'restaurant',
      key: this.apiKey,
    };

    try {
      const textSearchResponse = await axios.get(textSearchUrl, {
        params: textSearchParams,
      });

      const results = textSearchResponse.data.results || [];
      const limitedResults = results.slice(0, maxResults);

      // Para cada resultado, busca detalhes adicionais (opcional)
      const detailedRestaurants = await Promise.all(
        limitedResults.map(async (result: any) => {
          return await this.getPlaceDetails(result.place_id);
        })
      );

      return detailedRestaurants.filter((r): r is Restaurant => r !== null);
    } catch (error) {
      console.error('Erro na busca de restaurantes:', error);
      throw new Error('Falha ao buscar restaurantes na Google Places API');
    }
  }

  /**
   * Obtém detalhes de um lugar específico pelo place_id.
   */
  private async getPlaceDetails(placeId: string): Promise<Restaurant | null> {
    const detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
    const detailsParams = {
      place_id: placeId,
      fields: 'name,formatted_address,rating,user_ratings_total,price_level,types,geometry,photos',
      key: this.apiKey,
    };

    try {
      const detailsResponse = await axios.get(detailsUrl, {
        params: detailsParams,
      });

      const details = detailsResponse.data.result;
      if (!details) return null;

      return {
        placeId: placeId,
        name: details.name,
        address: details.formatted_address,
        rating: details.rating,
        userRatingsTotal: details.user_ratings_total,
        priceLevel: details.price_level,
        types: details.types,
        location: details.geometry?.location,
        photos: details.photos?.map((p: any) => p.photo_reference),
      };
    } catch (error) {
      console.error(`Erro ao obter detalhes do lugar ${placeId}:`, error);
      return null;
    }
  }
}

export default new GooglePlacesService();