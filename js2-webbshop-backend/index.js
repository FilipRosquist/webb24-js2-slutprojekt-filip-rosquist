import express from 'express';
import cors from 'cors';
import products from './data/products.json' assert { type: 'json' };

const app = express();

const PORT = 3000;

app.use(cors());

// Skapar en väg för att hämta produkter
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Startar servern och lyssnar på porten
app.listen(PORT, () => {
  console.log("Listening to port ", PORT);
});
