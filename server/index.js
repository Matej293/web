const express = require("express");
const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const mongoUri = "mongodb://localhost:27017";
const dbName = "database";

const client = new MongoClient(mongoUri);

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist/client/browser")));

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Could not connect to database: ${error}`);
  }
}

async function storeToDB() {
  const data = await fs.readFile(path.join(__dirname, "items.json"), "utf8");
  const items = JSON.parse(data);
  const collection = client.db(dbName).collection("items");

  for (let item of items) {
    const query = { name: item.name };
    const update = { $set: item };
    const options = { upsert: true };
    await collection.updateOne(query, update, options);
  }

  console.log("Stored items.json to database.");
}

async function loadFromDB() {
  const collection = client.db(dbName).collection("items");
  return await collection.find({}).toArray();
}

app.get("/api/items", async (req, res) => {
  try {
    const items = await loadFromDB();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch items" });
  }
});

app.get("/api/login", (req, res) => {
  const userData = { username: "user", profile: "profile.jpg" };
  const secret = "YOUR_SECRET_KEY";
  const token = jwt.sign(userData, secret, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/client/browser/index.html"));
});

async function startServer() {
  try {
    await connectToDB();
    await storeToDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server start error: ${error}`);
  }
}

startServer();
