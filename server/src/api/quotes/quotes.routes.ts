import { Router } from 'express';
import * as QuotesController from './quotes.controller';
import { authMiddleware } from '../../middlewares/Auth';

const router = Router();

router.get('/search', QuotesController.searchQuotes);
router.get('/favorites', authMiddleware, QuotesController.getFavorites);
router.post('/favorites', authMiddleware, QuotesController.addFavorite);

export default router;
