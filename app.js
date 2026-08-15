import express from "express";
import {PORT} from "./config/env.js"
import connectDB from "./database/mongodb.js";
import dns from "node:dns";
import Publish from "./routes/Publish.routes.js";
dns.setServers(["8.8.8.8"]);
const app = express();
app.use("/publish",Publish)
app.listen(PORT,async ()=>{
  console.log(`http://localhost:${PORT}`)
  await connectDB()
})