const express = require('express'); 
const axios = require('axios');
const cors = require('cors');   

const app = express();
const PORT = 3000;  
const BASE_URL = 'http://localhost:9876';  

app.use(cors()); 
app.use(express.json()); 

// Root route
app.get('/', (req, res) => {
  res.send('Stock API Proxy Server is running.');
});
let stocks = {
  "Advanced Micro Devices, Inc.": "AMD",
  "Alphabet Inc. Class A": "GOOGL",
  "Alphabet Inc. Class C": "GOOG",
  "Amazon.com, Inc.": "AMZN",
  "Amgen Inc.": "AMGN",
  "Apple Inc.": "AAPL",
  "Berkshire Hathaway Inc.": "BRKB",
  "Booking Holdings Inc.": "BKNG",
  "Broadcom Inc.": "AVGO",
  "CSX Corporation": "CSX",
  "Eli Lilly and Company": "LLY",
  "Marriott International, Inc.": "MAR",
  "Marvell Technology, Inc.": "MRVL",
  "Meta Platforms, Inc.": "META",
  "Microsoft Corporation": "MSFT",
  "Nvidia Corporation": "NVDA",
  "PayPal Holdings, Inc.": "PYPL",
  "TSMC": "2330TW",
  "Tesla, Inc.": "TSLA",
  "Visa Inc.": "V"
};
app.get('/stocks', async (req, res) => {
  res.json(stocks);
});

app.get('/correlation', async (req, res) => {
  const { minutes } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}/correlation`, {
      params: { minutes }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching correlation data:', error);
    res.status(500).json({ error: 'Failed to fetch correlation data' });
  }
});
app.get('/stocks/tickers', (req, res) => {
  const tickerList = Object.values(stocks);
  res.json(tickerList);
});
//GET /stocks/:ticker
app.get('/stocks/:ticker', async (req, res) => {
  const { ticker } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/stocks/${ticker}`);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error.toString());
    res.status(500).json({ error: `Failed to fetch data for ${ticker}` });
  }
});
//GET /stocks/:ticker/prices
app.get('/stocks/:ticker/prices', async (req, res) => {
  const { ticker } = req.params;
  const { minutes } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}/stocks/${ticker}/prices`, {
      params: { minutes }
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching prices for ${ticker}:`, error.toString());
    res.status(500).json({ error: `Failed to fetch prices for ${ticker}` });
  }
});

//GET /stocks/:ticker/average 
app.get('/stocks/:ticker/average', async (req, res) => {
  const { ticker } = req.params;
  const { minutes } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}/stocks/${ticker}/average`, {
      params: { minutes }
    });
    res.json(response.data);
  }
  catch (error) {
    console.error(`Error fetching average for ${ticker}:`, error.toString());
    res.status(500).json({ error: `Failed to fetch average for ${ticker}` });
  } 
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});