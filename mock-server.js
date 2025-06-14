// mock-server.js
const express = require('express');
const app = express();
const PORT = 9876;

app.use(express.json());

app.get('/stocks', (req, res) => {
  res.json([
    { name: "Apple Inc.", ticker: "AAPL", prices: [150, 152, 151, 153, 149] },
    { name: "Microsoft Corporation", ticker: "MSFT", prices: [300, 298, 301, 299, 305] }
  ]);
});

app.get('/correlation', (req, res) => {
  res.json({
    AAPL: { AAPL: 1, MSFT: 0.8 },
    MSFT: { AAPL: 0.8, MSFT: 1 }
  });
});

app.listen(PORT, () => {
  console.log(`Mock Test Server running at http://localhost:${PORT}`);
});
