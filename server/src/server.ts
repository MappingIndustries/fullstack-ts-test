import express from 'express';
import quoteRoutes from './api/quotes/quotes.routes';
import authRoutes from './api/auth/auth.routes';
import favoriteRoutes from './api/favorites/favorites.routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/quotes', quoteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
