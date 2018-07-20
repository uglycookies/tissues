const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/test', (req, res) => {
  res.json({ message: 'This is working!' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
