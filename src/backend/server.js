const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recepten', require('./routes/recipes'));
app.use('/api/supermarkten', require('./routes/supermarkets'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/boodschappenlijst', require('./routes/shopping-list'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', versie: '0.1.0', naam: 'BoodschappenBuddy API' });
});

app.listen(PORT, () => {
  console.log(`BoodschappenBuddy backend draait op http://localhost:${PORT}`);
});

module.exports = app;
