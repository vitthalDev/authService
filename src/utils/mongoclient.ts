// import { MongoClient, MongoClientOptions, Db } from "mongodb";

// const uri = process.env.MONGO_URI as string;

// class Mongo {
//   private client: MongoClient;
//   private db: Db | undefined;

//   constructor() {
//     // const options: MongoClientOptions = {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     // };
//     this.client = new MongoClient(uri)
//   }

//   async main(): Promise<void> {
//     try {
//       await this.client.connect();
//       console.log("Connected to mongoDB");
//       this.db = this.client.db();
//     } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//     }

//   }

//   getDb(): Db | undefined {
//     return this.db;
//   }
// }

// export default new Mongo();


import { MongoClient, MongoClientOptions, Db } from 'mongodb';

class Mongo {
  private client: MongoClient | null;
  private db: Db | null;

  constructor(private uri: string, private options: MongoClientOptions = {}) {
    this.client = null;
    this.db = null;
  }

  async connect(): Promise<void> {
    try {
      this.client = new MongoClient(this.uri, this.options);
      await this.client.connect();
      this.db = this.client.db();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  isConnected(): boolean {
    return !!this.client;
  }

  async disconnect(): Promise<void> {
    try {
      await this.client?.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      throw error;
    } finally {
      this.client = null;
      this.db = null;
    }
  }

  getDb(): Db | null {
    return this.db;
  }
}

export default Mongo;
