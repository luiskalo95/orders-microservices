import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();

async function start() {
  try {
    await server.initialize();
    await database.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
