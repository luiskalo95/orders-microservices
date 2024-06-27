import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";
import TaskBootstrap from "./bootstrap/task.bootstrap";
import StoreApplication from "./module/application/store.application";
import BrokerInfrastructure from "./module/infrastructure/adapters/broker.infrastructure";
import StoreInfrastructure from "./module/infrastructure/adapters/store.infrastructure";

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();
const storeInfrastructure = new StoreInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure(storeInfrastructure);
const storeApplication = new StoreApplication(
  storeInfrastructure,
  brokerInfrastructure
);
const task = new TaskBootstrap(storeApplication);

async function start() {
  try {
    await server.initialize();
    await database.initialize();
    await broker.initialize();
    await task.listenMessage();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
