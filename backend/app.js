const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const fs = require('fs');
const cors = require('cors');

dotenv.config(); // config will read your .env file, parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content or an error key if it failed.

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // customization options for mongo connection
    useUnifiedTopology: true, // customization options for mongo connection
  })
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(postRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.get("/", (req, res, next) => {
  fs.readFile('docs/apiDoc.json', (err, data) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json(JSON.parse(data));
  });
});
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      error: "Unauthorized. Access Denied",
    });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server Has Started");
});