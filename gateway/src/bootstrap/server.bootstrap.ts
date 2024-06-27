import { Bootstrap } from "./bootstrap";
import http from "http";
import App from "../app";

export default class ServerBootstrap extends Bootstrap {

  public initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const PORT = process.env.PORT || 20000;

      const server = http.createServer(App);

      server
        .listen(PORT)
        .on("listening", () => {
          resolve(true);
          console.log(`Server is listening on port ${PORT}`);
        })
        .on("error", (err: Error) => {
          reject(err);
          console.error(err);
        });
    });
  }
}
