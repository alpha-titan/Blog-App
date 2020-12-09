const express = require("express");
const cors = require("cors");
const mongooose = require("mongoose");
require("dotenv/config");
const postReq = require("./routes/Post");
const userReq = require("./routes/Auth");

//initialize express app
const app = express();

//middelware
app.use(cors());
app.use(express.json());

//connecct to database
mongooose.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to db");
  }
);

//routes

app.use("/posts", postReq);
app.use("/user", userReq);

// app.use('/graphql', Queryreq)

app.listen(4000, () => console.log("Server listening on port 4000"));
