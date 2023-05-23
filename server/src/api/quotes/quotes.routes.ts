import { Router } from 'express';
import * as QuotesController from './quotes.controller';
import { authMiddleware } from '../../middlewares/Auth';

const router = Router();

router.get('/quotes/search', QuotesController.searchQuotes);
router.get('/quotes/:id', QuotesController.getQuoteById);
router.get('/favorites', authMiddleware, QuotesController.getFavorites);
router.post('/favorites', authMiddleware, QuotesController.addFavorite);
router.delete(
  '/favorites/:id',
  authMiddleware,
  QuotesController.deleteFavorite
);

export default router;
