import ServerBootstrap from "./bootstrap/server.bootstrap";

const server = new ServerBootstrap();

async function start() {
  try {
    await server.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
