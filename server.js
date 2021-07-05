const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`)
  console.log(`dirname ${__dirname}`)
})