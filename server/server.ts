import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import tripRoutes from "./routes/tripRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";
// Load environment variables before using them
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
//app.use(cookieParser());

//app.use("/api/auth", authRoute);
app.use("/api/trip", tripRoutes);
app.use("/api/itineraries", itineraryRoutes);

app.listen(PORT, () => {
  console.log("Server is Running on http://localhost:" + PORT);
  connectDB();
});
