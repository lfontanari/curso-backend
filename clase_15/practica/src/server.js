import express from "express";
import mongoose from "mongoose";
import { __dirname } from "./utils";

const app=express();

// mongoose.connect("mongodb://localhost:27017")

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Db id connected"))
  .catch((error) => console.log("Error connection" + error));

  