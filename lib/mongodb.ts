import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.warn("MONGODB_URI is missing from environment variables.");
} else {
  const uriPrefix = MONGODB_URI.startsWith("mongodb+srv")
    ? "mongodb+srv://***"
    : MONGODB_URI.split("@")[1] || "local/unknown";
  console.log(`Attempting to connect to MongoDB: ${uriPrefix}`);
}

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance: mongoose.Mongoose) => {
        return mongooseInstance.connection;
      });
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: any) {
    cached.promise = null; // Reset promise if connection fails
    console.error("MongoDB Connection Failed:", {
      message: error.message,
      code: error.code,
      name: error.name,
    });
    throw error;
  }
}

export default connectDB;
