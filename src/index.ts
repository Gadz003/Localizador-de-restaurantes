import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import restaurantRoutes from './routes/restaurantRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);

app.get('/', (req, res) => {
  res.send('API de Localização de Restaurantes - Funcionando!');
});

app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`);
});