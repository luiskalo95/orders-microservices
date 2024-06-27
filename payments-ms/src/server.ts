import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";
import TaskBootstrap from "./bootstrap/task.bootstrap";
import PaymentApplication from "./module/application/payment.application";
import BrokerInfrastructure from "./module/infrastructure/adapters/broker.infrastructure";
import PaymentInfrastructure from "./module/infrastructure/adapters/payment.infrastructure";

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();
const paymentInfrastructure = new PaymentInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure(paymentInfrastructure);
const paymentApplication = new PaymentApplication(
  paymentInfrastructure,
  brokerInfrastructure
);
const task = new TaskBootstrap(paymentApplication);

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
