import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI;
const DB = process.env.MONGODB_DB;

export async function connectToDatabase() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    return client.db(DB);
  } catch (error) {
    console.error("Помилка при підключенні до бази даних:", error);
    throw error;
  }
}
