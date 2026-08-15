import express from "express";
import {PORT} from "./config/env.js"
import connectDB from "./database/mongodb.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8"]);
const app = express();
app.post("/", (req, res) => {
  res.send({
    mazen:"Nigga"
  });
});
app.listen(PORT,async ()=>{
  console.log(`http://localhost:${PORT}`)
  await connectDB()
})