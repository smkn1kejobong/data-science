import compression from 'compression';
import express from 'express';
import { fakerID_ID as faker} from '@faker-js/faker';
const app = express();
app.use(compression())
const port = 3000;

const salesData = []

// Endpoint untuk mendapatkan semua data penjualan
app.get('/api/sales', (req, res) => {
  res.json(salesData);
});

// Endpoint untuk generate data, return dari data akan disimpan ke salesData
app.get('/api/sales/generate/:count', (req, res) => {
  const count = parseInt(req.params.count, 10);
  if (isNaN(count) || count <= 0) {
    return res.status(400).json({ message: 'Jumlah harus berupa angka positif' });
  }

  const newSalesData = [];
  const products = ["Motherboard","Processor","RAM","VGA Card","SPF+","Switch","Router"];
  const customers = ["Rafli","Arif","Ichsan","Fajar","Zuhud","Fauzi"];
  
  for (let i = 0; i < count; i++) {
    newSalesData.push({
      id: faker.string.uuid(),
      product: products[(Math.floor(Math.random() * products.length))],
      price: faker.commerce.price({ min: 1000000, max: 10000000, dec: 0}),
      quantity: faker.number.int({ min: 1, max: 30 }),
      customer: customers[(Math.floor(Math.random() * customers.length))],
      date: faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-12-30T00:00:00.000Z' })
    });
  }

  salesData.push(...newSalesData); // Menambahkan data baru ke salesData
  return res.status(201).json({ message: `${count} Data telah ditambahkan ke Data Penjualan`})
});

// Endpoint untuk mendapatkan data penjualan berdasarkan ID
app.get('/api/sales/:id', (req, res) => {
  const sale = salesData.find(s => s.id === req.params.id);
  if (sale) {
    res.json(sale);
  } else {
    res.status(404).json({ message: 'Data penjualan tidak ditemukan' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
