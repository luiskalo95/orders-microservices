import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";
import TaskBootstrap from "./bootstrap/task.bootstrap";
import DeliveryApplication from "./module/application/delivery.application";
import BrokerInfrastructure from "./module/infrastructure/adapters/broker.infrastructure";
import DeliveryInfrastructure from "./module/infrastructure/adapters/delivery.infrastructure";

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();
const deliveryInfrastructure = new DeliveryInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure(deliveryInfrastructure);
const deliveryApplication = new DeliveryApplication(
  deliveryInfrastructure,
  brokerInfrastructure
);
const task = new TaskBootstrap(deliveryApplication);

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
