import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";
import TaskBootstrap from "./bootstrap/task.bootstrap";
import OrderApplication from "./module/application/order.application";
import BrokerInfrastructure from "./module/infrastructure/adapters/broker.infrastructure";
import OrderInfrastructure from "./module/infrastructure/adapters/order.infrastructure";

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();
const orderInfrastructure = new OrderInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure(orderInfrastructure);
const orderApplication = new OrderApplication(
  orderInfrastructure,
  brokerInfrastructure
);
const task = new TaskBootstrap(orderApplication);

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
