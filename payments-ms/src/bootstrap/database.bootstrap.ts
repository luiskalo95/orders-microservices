import mongoose from "mongoose";
import { Bootstrap } from "./bootstrap";

export default class DatabaseBootstrap extends Bootstrap {

  public initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const username = process.env.MONGO_USERNAME || "root";
      const password = process.env.MONGO_PASSWORD || "12345";
      const host = process.env.MONGO_HOST || "127.0.0.1";
      const port = process.env.MONGO_PORT || 27017;
      const database = process.env.MONGO_DATABASE || "payment";
      const authSource = process.env.MONGO_AUTH_SOURCE || "admin";

      const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}&retryWrites=true&w=majority`;

      console.log("connectionString: ", connectionString);

      const options = {
        maxPoolSize: 10,
        minPoolSize: 5,
      };

      const cb = (error: Error) => {
        if (error) {
          return reject(error);
        }
        console.log("Connected to MongoDB");
        resolve(true);
      };

      mongoose.connect(connectionString, options, cb);
    });
  }
}
