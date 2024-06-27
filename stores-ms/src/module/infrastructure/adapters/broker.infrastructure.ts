import { Channel } from "amqplib";
import BrokerBootstrap from "../../../bootstrap/broker.bootstrap";
import { StoreEntity, StoreBuilder } from "../../domain/entities/store.entity";
import RepositoryBroker from "../../domain/repositories/store-broker.repository";
import StoreInfrastructure from "./store.infrastructure";

export default class BrokerInfrastructure implements RepositoryBroker {

  constructor(private storeInfrastructure: StoreInfrastructure) { }

  public async send(message: any): Promise<void> {
    const channel = BrokerBootstrap.getChannel();
    const queueName = "ORDER_PREPARE_EVENT";
    await channel.assertQueue(queueName, { durable: true });
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  public async sendError(message: any): Promise<void> {
    const channel = BrokerBootstrap.getChannel();
    const messageAsString = JSON.stringify(message);
    const nameExchange = "FAILED_ERROR_EXCHANGE";
    await channel.assertExchange(nameExchange, "topic", { durable: true });
    channel.publish(nameExchange, "store.order_cancelled.error", Buffer.from(messageAsString));
  }

  public async sendConfirmationFeedback(message: any): Promise<void> {
    const channel = BrokerBootstrap.getChannel();
    const messageAsString = JSON.stringify(message);
    const nameExchange = "ORDER_STORED_EXCHANGE";
    await channel.assertExchange(nameExchange, "fanout", { durable: true });
    channel.publish(nameExchange, "", Buffer.from(messageAsString));
  }

  public async receive(): Promise<void> {
    const channel = BrokerBootstrap.getChannel();
    const created = this.receiveMessageAccepted(channel, this.consumerAccepted.bind(this), "BILLED_ORDER_EVENT");

    const orderConfirmed = this.receiveMessageCustom(channel, this.consumerOrderConfirmed.bind(this), "ORDER_CONFIRMED_EXCHANGE", "fanout", "");

    const orderDelivered = this.receiveMessageCustom(channel, this.consumerOrderDelivered.bind(this),
      "ORDER_DELIVERED_EXCHANGE", "fanout", "");

    const failedError = this.receiveMessageCustom(channel, this.consumerFailedError.bind(this), "FAILED_ERROR_EXCHANGE", "topic", "*.order_cancelled.error");

    await Promise.all([created, orderConfirmed, orderDelivered, failedError]);
  }

  public async receiveMessageCustom(channel: Channel, cb: (message: any) => void, exchangeName: string, kindExchange: string, routingKeys: string | string[]) {
    await channel.assertExchange(exchangeName, kindExchange, { durable: true });
    const assertQueue = await channel.assertQueue("", { exclusive: true });
    if (Array.isArray(routingKeys)) {
      routingKeys.forEach((routingKey) => {
        channel.bindQueue(assertQueue.queue, exchangeName, routingKey);
      });
    } else {
      channel.bindQueue(assertQueue.queue, exchangeName, routingKeys);
    }
    channel.consume(assertQueue.queue, (message: any) => cb(message), {
      noAck: false,
    });
  }

  public async receiveMessageAccepted(channel: Channel, cb: (message: any) => void, queueName: string): Promise<void> {
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, (message: any) => cb(message), {
      noAck: false,
    });
  }

  public async consumerOrderConfirmed(message: any): Promise<void> {
    console.log("Mensaje recibido",JSON.stringify(message.content.toString()));
    const content: Partial<StoreEntity> = JSON.parse(message.content.toString());
    content.status = "COMPLETED";
    await this.storeInfrastructure.update(content.transaction, content.status);
    this.confirmMessageBroker(message);
  }

  public async consumerOrderDelivered(message: any): Promise<void> {
    console.log("Mensaje recibido",JSON.stringify(message.content.toString()));
    const content: Partial<StoreEntity> = JSON.parse(message.content.toString());
    content.status = "DELIVERED";
    await this.storeInfrastructure.update(content.transaction, content.status);
    this.confirmMessageBroker(message);
  }

  public async consumerFailedError(message: any): Promise<void> {
    console.log("Mensaje recibido",JSON.stringify(message.content.toString()));
    const content: Partial<StoreEntity> = JSON.parse(message.content.toString());
    content.status = "CANCELLED";
    await this.storeInfrastructure.update(content.transaction, content.status);
    this.confirmMessageBroker(message);
  }

  public async consumerAccepted(message: any): Promise<void> {
    const content: Partial<StoreEntity> = JSON.parse(message.content.toString());
    const storeEntity = new StoreBuilder()
      .addUserId(content.userId)
      .addProductId(content.productId)
      .addName(content.name)
      .addItemCount(content.itemCount)
      .addTransaction(content.transaction)
      .addStatus("STORED")
      .build();
    await this.storeInfrastructure.insert(storeEntity);
    await this.send(storeEntity);
    await this.sendConfirmationFeedback(storeEntity)
    //await this.sendError(storeEntity);
    this.confirmMessageBroker(message);
  }

  public confirmMessageBroker(message: any): void {
    const channel = BrokerBootstrap.getChannel();
    channel.ack(message);
  }
}
