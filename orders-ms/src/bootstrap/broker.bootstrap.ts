import amqp from "amqplib";
import { Bootstrap } from "./bootstrap";

export default class BrokerBootstrap implements Bootstrap {

  private static channel: amqp.Channel;

  public async initialize(): Promise<boolean | Error> {
    return new Promise(async (resolve, reject) => {
      const host = process.env.RABBITMQ_HOST || "localhost:5672";

      try {
        const connection = await amqp.connect(`amqp://${host}`);
        BrokerBootstrap.channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static getChannel(): amqp.Channel {
    return this.channel;
  }
}
