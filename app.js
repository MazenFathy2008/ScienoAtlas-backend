import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./database/mongodb.js";
import dns from "node:dns";
import Publish from "./routes/Publish.route.js";
import errorsMiddleware from "./middleware/error.middleware.js";
import signUp from "./routes/signUp.route.js";
import signIn from "./routes/signIn.route.js";
dns.setServers(["8.8.8.8"]);
const app = express();
app.use(express.json());
app.use("/publish", Publish);
app.use("/signingUp", signUp);
app.use("/signingIn", signIn);
app.use(errorsMiddleware);
app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
  await connectDB();
});
