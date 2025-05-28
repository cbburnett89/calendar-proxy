const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const CALENDAR_URL = 'https://p170-caldav.icloud.com/published/2/MjcwMjYzNDM5MjcwMjYzNHk1U5T4VL-qp5PnCN00Zsli_0keMwpeC76yLSvz0c4nerZzIP1fv_KGSRdR9iY9aN3sAJ67A2EEBAczAGVznM4';

app.get('/api/calendar', async (req, res) => {
  try {
    const response = await fetch(CALENDAR_URL);
    if (!response.ok) throw new Error('Failed to fetch calendar');
    const text = await response.text();
    res.set('Content-Type', 'text/calendar');
    res.send(text);
  } catch (err) {
    res.status(500).send('Failed to fetch calendar');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});