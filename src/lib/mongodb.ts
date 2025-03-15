import mongoose from 'mongoose';

// MongoDB connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://SkillProof:EabEtIhpXnsQsy4B@skillproof-dev.j3xf3.mongodb.net/skillproof?retryWrites=true&w=majority&authSource=admin&tls=true';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

global.mongoose = {
  conn: null,
  promise: null,
};

async function dbConnect(): Promise<mongoose.Connection> {
  if (global.mongoose?.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose?.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
  } catch (e) {
    global.mongoose.promise = null;
    throw e;
  }

  return global.mongoose.conn;
}

export default dbConnect; 