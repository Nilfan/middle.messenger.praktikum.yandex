const express = require('express');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const dirPath = __dirname + "/dist"
const indexFilePath = "/index.html"

app.use(express.static(dirPath));


app.get("*", function (_, res) {
  res.sendFile(path.resolve(dirPath + indexFilePath));
});

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`)
})