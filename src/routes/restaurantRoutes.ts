import { Router } from 'express';
import { searchRestaurants } from '../controllers/restaurantController';

const router = Router();

router.post('/search', searchRestaurants);

export default router;