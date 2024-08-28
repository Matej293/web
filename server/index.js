const express = require("express");
const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 3000;

// app.get("/items", async (req, res) => {
//   try {
//     console.log("Reading 'db.json'...");
//     const data = await fs.readFile(
//       "./dist/client/browser/assets/db.json",
//       "utf8"
//     );
//     res.json(JSON.parse(data));
//   } catch (error) {
//     console.error("Failed to read or parse 'db.json':", error);
//     res.status(500).send("Failed to read the data.");
//   }
// });

app.use(express.static(path.join(__dirname, "dist/client/browser")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/client/browser/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
