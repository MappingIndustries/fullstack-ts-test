import { Router } from 'express';
import * as QuotesController from './quotes.controller';

const router = Router();

router.get('/search', QuotesController.searchQuotes);
router.get('/:id', QuotesController.getQuoteById);

export default router;
