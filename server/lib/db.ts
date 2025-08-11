import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error: any) {
    console.log("Error connecting to MONGODB", error.message);
    process.exit(1);
  }
};
