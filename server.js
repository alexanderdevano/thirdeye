const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS to allow requests from your specific domain
app.use(cors({
  origin: 'http://web.sfc.keio.ac.jp'
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Handle NFC scan
app.post('/~t22517aa/ubiqnfc/api/nfc-scan', (req, res) => {
  console.log(`Received POST request at /~t22517aa/ubiqnfc/api/nfc-scan`);
  const { nfcData } = req.body;
  if (!nfcData) {
    console.log('No NFC data received.');
    return res.status(400).send('No NFC data received.');
  }
  const description = nfcData.split(',')[0];

  console.log(`NFC data: ${nfcData}`);
  console.log(`Description: ${description}`);

  res.status(200).send(`NFC tag scanned successfully: ${description}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
