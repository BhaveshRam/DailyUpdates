const express = require("express");
const app = express();
const people = require("./routers/people");
const login = require("./routers/auth")
app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/people', people)
app.use('/login', login)


app.all("*", (req, res) => {
  res.status(404).send("Resource not found..!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
