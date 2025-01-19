import { Db, MongoClient, ServerApiVersion  } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }

let database: Db;
export let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  console.log("Connecting to MongoDB in development mode");
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }

  
  client = globalWithMongo._mongoClient;
  database = client.db("test");
} else {
  client = new MongoClient(uri, options);
  database = client.db("prod");
}

export default database;