import express from "express";
import { FRONTEND_URL, PORT } from "./config/env.js";
import connectDB from "./database/mongodb.js";
import dns from "node:dns";
import Publish from "./routes/Publish.route.js";
import errorsMiddleware from "./middleware/error.middleware.js";
import signUp from "./routes/signUp.route.js";
import signIn from "./routes/signIn.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import checkAuth from "./routes/checkAuth.route.js";
import signOut from "./routes/signOut.route.js";
import paperLink from "./routes/paperLink.route.js";
dns.setServers(["8.8.8.8"]);
const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/publish", Publish);
app.use("/signingUp", signUp);
app.use("/signingIn", signIn);
app.use("/auth/me", checkAuth);
app.use("/signingOut", signOut);
app.use("/link", paperLink);
app.use(errorsMiddleware);
app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
  await connectDB();
});
