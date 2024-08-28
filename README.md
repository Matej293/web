Kreirati client: ng new client --skip-tests --routing
css + ssr
Kreirati server folder - copy


client instalacije:

bootstrap:
npm i bootstrap

U angular.json dodajemo:
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "src/styles.scss"
],
"scripts": [
  "./node_modules/bootstrap/dist/js/bootstrap.bundle.js"
]

fontawesome:
https://www.npmjs.com/package/@fortawesome/angular-fontawesome

npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/angular-fontawesome


run node index.js u server diru

// server index.js
const express = require("express");
const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "dist", "client", "browser")));

app.get("/items", async (req, res) => {
  try {
    const data = await fs.readFile("./items.json", "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Failed to read or parse 'items.json':", error);
    res.status(500).send("Failed to read the data.");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/client/browser/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


proxy.config.json:
{
    "/api": {
        "target": "http://localhost:3000",
        "secure": false
    }
}


nodemon setup:

npm i -g nodemon
add nodemon.json to client:
{
    "watch": ["src/"],
    "ext": "ts,html,css,json",
    "ignore": ["src/environments/*"],
    "exec": "ng build && npm run copy && ng serve --proxy-config proxy.config.json"
  }

add script to package.json:
"copy": "xcopy .\\dist ..\\server\\dist /E /H /C /I /R /Y"

add nodemon.json to server:
{
  "watch": ["dist/", "index.js"],
  "ignore": ["node_modules/", "dist/node_modules/"],
  "exec": "node index.js"
}

run nodemon in both directories


U KOMPONENTI KOJA TREBA ROUTING - imports: [CommonModule, RouterModule]