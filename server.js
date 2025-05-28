const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Use your new Google Calendar .ics link here:
const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/ju4bjb5dlku7bgc1hrts5bmpngh4i2p4%40import.calendar.google.com/public/basic.ics';

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