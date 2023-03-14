if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "https://www.fts-nemt.com/",
  optionsSuccessStatus: 200 // For legacy browser support
  }

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log("db conntected"));

app.use("/", routes);

app.listen(PORT, () => console.log(`app running on port ${PORT}`));

app.route("/").get((req, res) => res.json({ msg: "test message" }));

