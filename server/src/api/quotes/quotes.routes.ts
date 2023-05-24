import { Router } from 'express';
import * as QuotesController from './quotes.controller';
import { authenticateToken } from '../../middlewares/authenticateToken';

const router = Router();

router.get('/search', QuotesController.searchQuotes);
router.get('/:id', QuotesController.getQuoteById);

export default router;
