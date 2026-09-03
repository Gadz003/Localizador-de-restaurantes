import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  defaultRadius: Number(process.env.DEFAULT_RADIUS) || 1500,
  maxResults: Number(process.env.MAX_RESULTS) || 10,
};