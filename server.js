const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const apiRouter = require('./routes/api-routes.js');
app.use('/api', apiRouter);

const noteRouter = require('./routes/notes-routes.js');
app.use('/notes', noteRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
