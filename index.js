const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 8000;

dotenv.config();

//GETTING ROUTES
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

//CONNECTING TO DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else {
      console.log("connected successfully to the DB");
    }
  }
);

app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);

//Initializing the server
app.listen(PORT, () => console.log(`server up and running at port ${PORT}`));
