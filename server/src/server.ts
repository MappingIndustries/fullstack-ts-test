import app from './app';

const PORT = process.env.NODE_ENV === 'test' ? 5001 : 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
