import { Request, Response } from 'express';
import googlePlacesService from '../services/googlePlacesService';
import { extractKeywords } from '../utils/keywordExtractor';

export async function searchRestaurants(req: Request, res: Response) {
  try {
    const { description, lat, lng, radius, maxResults } = req.body;

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Descrição é obrigatória.' });
    }

    // Valida coordenadas
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'Latitude e longitude devem ser números.' });
    }

    // Extrai palavras-chave para futura filtragem (opcional)
    const keywords = extractKeywords(description);
    console.log('Palavras-chave extraídas:', keywords);

    // Chama o serviço do Google Places
    const restaurants = await googlePlacesService.findRestaurants({
      description,
      lat,
      lng,
      radius,
      maxResults,
    });

    // Aplica filtro adicional baseado nas palavras-chave (ex.: cuisine)
    // (Opcional: aqui poderíamos filtrar os resultados com base nos termos extraídos)
    const filtered = filterByKeywords(restaurants, keywords);

    res.json({
      count: filtered.length,
      restaurants: filtered,
    });
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Erro interno ao processar a solicitação.' });
  }
}

/**
 * Filtra a lista de restaurantes com base nas palavras-chave extraídas.
 * Exemplo: se a descrição menciona "japonesa", mantém apenas restaurantes cujo tipo inclui "japanese" ou "sushi".
 */
function filterByKeywords(restaurants: any[], keywords: any) {
  if (!keywords.cuisine || keywords.cuisine.length === 0) {
    return restaurants;
  }

  return restaurants.filter((restaurant) => {
    const types = restaurant.types || [];
    const matchesCuisine = keywords.cuisine.some((cuisine: string) =>
      types.some((type: string) => type.includes(cuisine))
    );
    return matchesCuisine;
  });
}