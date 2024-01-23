const express = require("express");
const app = express();
const { ObjectId , $set} = require("mongodb");
const router = require("./routers/routes");
const { connectToDb, getDb } = require("./db");
let db;

app.use(express.json());
app.use('/Ram' , router)

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
    db = getDb();
  }
});

