import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";
dotenv.config();

let client: RedisClientType | null = null;

const getRedisClient = async (): Promise<RedisClientType> => {
  if (!client) {
    client = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_URI,
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
    });

    client.on("error", (err) => console.error("❌ Redis Error:", err));

    try {
      await client.connect();
      console.log("✅ Redis connected");
    } catch (error) {
      console.error("❌ Redis connection failed:", error);
      client = null;
      throw error;
    }
  }
  return client;
};

export default getRedisClient;
