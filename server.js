const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let nfcData = '';

app.post('/api/nfc-scan', (req, res) => {
  nfcData = req.body.nfcData;
  if (!nfcData) {
    return res.status(400).send('No NFC data received.');
  }
  const description = nfcData.split(',')[0];
  console.log('NFC tag scanned successfully:', description);
  res.status(200).send({ message: `NFC tag scanned successfully: ${description}` });
});

app.post('/api/query', (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).send('No query received.');
  }

  const fields = nfcData.split(',');
  const infoMap = {
    height: fields[1].trim(),
    weight: fields[2].trim(),
    color: fields[3].trim(),
    material: fields[4].trim(),
    price: fields[5].trim()
  };

  const lowerCaseQuery = query.toLowerCase();
  let response = '';
  let attributes = [];

  if (lowerCaseQuery.includes('price') || lowerCaseQuery.includes('cost') || lowerCaseQuery.includes('fee')) {
    response += `Price: ${infoMap.price}\n`;
    attributes.push('price');
  }
  if (lowerCaseQuery.includes('height') || lowerCaseQuery.includes('tall') || lowerCaseQuery.includes('short')) {
    response += `Height: ${infoMap.height}\n`;
    attributes.push('height');
  }
  if (lowerCaseQuery.includes('weight') || lowerCaseQuery.includes('heavy')) {
    response += `Weight: ${infoMap.weight}\n`;
    attributes.push('weight');
  }
  if (lowerCaseQuery.includes('color') || lowerCaseQuery.includes('colour') || lowerCaseQuery.includes('shade')) {
    response += `Color: ${infoMap.color}\n`;
    attributes.push('color');
  }
  if (lowerCaseQuery.includes('material') || lowerCaseQuery.includes('made of')) {
    response += `Material: ${infoMap.material}\n`;
    attributes.push('material');
  }
  if (response === '') {
    response = 'Information not available';
  }

  if (attributes.length > 0) {
    console.log(`User asked about the ${attributes.join(', ')} of ${fields[0].trim()}`);
  }

  res.status(200).send({ message: response.trim() });
});

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).send('No question provided.');
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:keio-university-sfc-nakazawa-and-okoshi-lab::9on9ljoY",
      messages: [
        {"role": "system", "content": "You are a product information assistant limited to six specific items in the store. Do not reference any other items or provide information not related to these six. The items are: 1. Round Circular Scandinavian Table for 4 People (Beige wood), 2. Nordic Floor Couch (5 kilograms), 3. Simple Kitchen Bar Stool, 4. LED floor uplight/reading lamp, 5. Round Circular Scandinavian Table for 4 People (Chestnut), 6. Nordic Floor Couch (6 kilograms)."},
        { role: "user", content: question }]
    });

    const answer = chatCompletion.choices[0].message.content;
    console.log(`User asks: "${question}"`);
    console.log(`Chatbot answers: "${answer}"`);
    res.status(200).send({ answer });
  } catch (error) {
    console.error('Failed to fetch the response from OpenAI:', error);
    res.status(500).send('Failed to process the question.');
  }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
