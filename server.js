const express = require('express');
const pathUtils = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/dist"));

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`)
})