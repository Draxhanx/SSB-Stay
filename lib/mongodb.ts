import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.warn(
    "Warning: MONGODB_URI is not defined. Database operations will fail.",
  );
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
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
