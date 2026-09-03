/**
 * Utilitário para extrair termos de busca a partir de uma descrição textual.
 * Utiliza um dicionário de palavras-chave para identificar tipo de cozinha,
 * características e faixa de preço.
 */

interface ExtractedKeywords {
  cuisine: string[];       // termos relacionados a tipo de comida
  features: string[];      // características (ex.: vegetariano, romântico)
  priceLevel: number | null; // nível de preço (1 = barato, 2 = médio, 3 = caro, 4 = muito caro)
  queryTerms: string[];    // termos combinados para busca textual
}

const cuisineMap: Record<string, string> = {
  japonesa: 'japanese',
  japones: 'japanese',
  sushi: 'sushi',
  italiana: 'italian',
  massas: 'italian',
  pizza: 'pizza',
  chinesa: 'chinese',
  mexicana: 'mexican',
  brasileira: 'brazilian',
  hamburguer: 'burger',
  burger: 'burger',
  vegana: 'vegan',
  vegetariana: 'vegetarian',
  arabe: 'middle eastern',
  francesa: 'french',
  tailandesa: 'thai',
  indiana: 'indian',
  coreana: 'korean',
};

const featureMap: Record<string, string> = {
  barato: 'cheap',
  economico: 'cheap',
  acessivel: 'cheap',
  medio: 'moderate',
  caro: 'expensive',
  romantico: 'romantic',
  aconchegante: 'cozy',
  familiar: 'family friendly',
  rapido: 'fast',
  buffet: 'buffet',
  'self-service': 'self service',
  cafeteria: 'cafe',
  bar: 'bar',
  pub: 'pub',
  'ao ar livre': 'outdoor seating',
  'entrega': 'delivery',
  'delivery': 'delivery',
};

const priceKeywords: Record<string, number> = {
  barato: 1,
  economico: 1,
  acessivel: 1,
  medio: 2,
  caro: 3,
  'muito caro': 4,
};

export function extractKeywords(description: string): ExtractedKeywords {
  const lowerDesc = description.toLowerCase();
  const words = lowerDesc.split(/[\s,.;:!?]+/).filter(Boolean);

  const cuisine: string[] = [];
  const features: string[] = [];
  let priceLevel: number | null = null;

  // Verifica cada palavra individual e também combinações de duas palavras
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const twoWordPhrase = i < words.length - 1 ? `${words[i]} ${words[i + 1]}` : '';

    if (cuisineMap[word]) {
      cuisine.push(cuisineMap[word]);
    }
    if (featureMap[word]) {
      features.push(featureMap[word]);
    }
    if (priceKeywords[word]) {
      priceLevel = priceKeywords[word];
    }
    if (twoWordPhrase && featureMap[twoWordPhrase]) {
      features.push(featureMap[twoWordPhrase]);
    }
    if (twoWordPhrase && priceKeywords[twoWordPhrase]) {
      priceLevel = priceKeywords[twoWordPhrase];
    }
  }

  // Remove duplicatas
  const uniqueCuisine = [...new Set(cuisine)];
  const uniqueFeatures = [...new Set(features)];

  // Monta queryTerms para busca textual (combina descrição original com termos mapeados)
  const queryTerms = [...uniqueCuisine, ...uniqueFeatures];
  if (priceLevel !== null) {
    queryTerms.push(`price_level:${priceLevel}`);
  }

  return {
    cuisine: uniqueCuisine,
    features: uniqueFeatures,
    priceLevel,
    queryTerms,
  };
}