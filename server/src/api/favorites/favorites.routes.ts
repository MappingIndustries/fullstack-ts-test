import { Router } from 'express';
import * as FavoritesController from './favorites.controller';
import { authenticateToken } from '../../middlewares/authenticateToken';

const router = Router();

router.get('/', authenticateToken, FavoritesController.getFavorites);
router.post('/', authenticateToken, FavoritesController.addFavorite);
router.delete('/:id', authenticateToken, FavoritesController.deleteFavorite);

export default router;
