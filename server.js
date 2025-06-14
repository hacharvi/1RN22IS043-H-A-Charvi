// //Develop a React based Stock Price Aggregation Frontend Web Application

// As a developer, you have been provided with access to the APIs of a stock exchange platform. Your task is to build a responsive React frontend web application that delivers real-time analytical insights.

// Your users are assumed to be pre-authorised. Therefore, your application must not require user registration or login for viewing any developed pages.

// The server's API provides data on stocks, and their respective price history.

// Your React application must run exclusively on http://localhost:3000.

// Your application should consist of the following pages

// Stock Page: Chart the prices of the stock over the specified time frame along with the average being distinctly highlighted. The user should be able to select different time intervals to alter the last m minutes for which the stock prices have to be displayed. Suitable UI features and concepts should be leveraged to display key stock details on hover or selection of data points on the chart.

// Correlation Heatmap: Display a heatmap showing the variations in correlation

// between all the stocks over the last "m" minutes. Suitable Ul features and concepts should be leveraged to display the average and standard deviation of a stock's price within the last 'm' minutes upon selecting or hovering over its label on either axis of the heatmap. The heatmap should also provide a suitable color legend indicating the correlation strength (e.g., from strong positive to strong negative).
// Formulae for Correlation

// Covariance:

// Consider the disparity in available data for different stocks in the same time interval and time alignment of chosen tickers.

// Each API call made by your application to the test server incurs a cost, which will negatively affect your test score.

// Your users require a responsive, performant, and accurate experience. Therefore, any attempts to minimise costs must not compromise user experience or display outdated data.

// Your frontend application must exclusively consume the test server API for data retrieval and must not utilise any third-party APIs.

// Use Material Ul only. If you aren't familiar with Material UI, employ native CSS. Use of ShadCN or other CSS, Libraries is prohibited. Solely relying on native CSS or not using Material Ul will result în lower scores. The Ul must prioritise user experience, with a focus on highlighting key elements of each page.

// The stock exchange reserves the right to modify the sorting order or data at any time, without prior notice, and at any frequency. Your application must be capable of adapting to these changes. Your choice of data structures and algorithms will be critical in ensuring your application remains performant and adaptable to these potential changes.
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