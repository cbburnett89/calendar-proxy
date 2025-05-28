const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

const ICAL_URL = 'https://p170-caldav.icloud.com/published/2/MjcwMjYzNDM5MjcwMjYzNHk1U5T4VL-qp5PnCN00Zsli_0keMwpeC76yLSvz0c4nerZzIP1fv_KGSRdR9iY9aN3sAJ67A2EEBAczAGVznM4';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/calendar', async (req, res) => {
  try {
    const resp = await fetch(ICAL_URL);
    if (!resp.ok) throw new Error('Failed to fetch calendar');
    const icsData = await resp.text();
    res.type('text/calendar').send(icsData);
  } catch (err) {
    res.status(500).send('Error fetching calendar: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});