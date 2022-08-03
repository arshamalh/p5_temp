import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import { getData } from "./models/data";

// ** Configs ** //

dotenv.config();

const mongodb_uri =
  process.env.MONGODB_URI ||
  "mongodb://USERNAME:PASSWORD@MY_SCRAPPER_mongodb:27017/COLLECTION_NAME?authSource=admin";

mongoose.connect(mongodb_uri, async (e) => {
  if (!e) console.log("successfully connected to DB");
  else console.log(e);
});

const app = express();
app.use(express.json());

// ** Routes ** //

app.post("/", (req, res) => {});

app.get("/data/:_id", async (req, res) => {
  let data = await getData(req.params._id)
  if (!!data) {
      res.send(data)
      return
  }
  res.status(404).send("data not found");
});

app.listen(30, () => {
  console.log("App is listening on port 30");
});
