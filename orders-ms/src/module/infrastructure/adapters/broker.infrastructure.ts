import { Channel } from "amqplib";
import BrokerBootstrap from "../../../bootstrap/broker.bootstrap";
import { OrderEntity } from "../../domain/entities/order.entity";
import BrokerRepository from "../../domain/repositories/order-broker.repository";
import OrderInfrastructure from "./order.infrastructure";

export default class BrokerInfrastructure implements BrokerRepository {

  constructor(private orderInfrastructure: OrderInfrastructure) { }

  public async send(message: any): Promise<void> {
    const channel = BrokerBootstrap.getChannel();
    const queueName = "ORDER_CREATE_EVENT";
    await channel.assertQueue(queueName, { durable: true });
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  public async receive(): Promise<void> {
    const channel = BrokerBootstrap.getChannel();
    const orderConfirmed = this.receiveMessageCustom(channel, this.consumerOrderConfirmed.bind(this), "ORDER_CONFIRMED_EXCHANGE", "fanout", "");

    const orderPaid = this.receiveMessageCustom(channel, this.consumerOrderPaid.bind(this),
     "ORDER_PAID_EXCHANGE", "fanout", "");

    const orderStored = this.receiveMessageCustom(channel, this.consumerOrderStored.bind(this),
     "ORDER_STORED_EXCHANGE", "fanout", "");

    const orderDelivered = this.receiveMessageCustom(channel, this.consumerOrderDelivered.bind(this),
     "ORDER_DELIVERED_EXCHANGE", "fanout", "");

    const failedError = this.receiveMessageCustom(channel, this.consumerFailedError.bind(this), "FAILED_ERROR_EXCHANGE", "topic", "*.order_cancelled.error");

    await Promise.all([orderConfirmed, orderPaid, orderStored, orderDelivered, failedError]);
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

  public async consumerOrderConfirmed(message: any): Promise<void> {
    console.log("Mensaje recibido",JSON.stringify(message.content.toString()));
    const content: Partial<OrderEntity> = JSON.parse(message.content.toString());
    content.status = "COMPLETED";
    await this.orderInfrastructure.update(content.transaction, content.status);
    this.confirmMessageBroker(message);
  }

  public async consumerOrderPaid(message: any): Promise<void> {
    console.log("Mensaje recibido",JSON.stringify(message.content.toString()));
    const content: Partial<OrderEntity> = JSON.parse(message.content.toString());
    content.status = "PAID";
    await this.orderInfrastructure.update(content.transaction, content.status);
    this.confirmMessageBroker(message);
  }

  public async consumerOrderStored(message: any): Promise<void> {
    console.log("Mensaje recibido",JSON.stringify(message.content.toString()));
    const content: Partial<OrderEntity> = JSON.parse(message.content.toString());
    content.status = "STORED";
    await this.orderInfrastructure.update(content.transaction, content.status);
    this.confirmMessageBroker(message);
  }

  public async consumerOrderDelivered(message: any): Promise<void> {
    console.log("Mensaje recibido",JSON.stringify(message.content.toString()));
    const content: Partial<OrderEntity> = JSON.parse(message.content.toString());
    content.status = "DELIVERED";
    await this.orderInfrastructure.update(content.transaction, content.status);
    this.confirmMessageBroker(message);
  }

  public async consumerFailedError(message: any): Promise<void> {
    console.log("Mensaje recibido",JSON.stringify(message.content.toString()));
    const content: Partial<OrderEntity> = JSON.parse(message.content.toString());
    content.status = "CANCELLED";
    await this.orderInfrastructure.update(content.transaction, content.status);
    this.confirmMessageBroker(message);
  }

  public confirmMessageBroker(message: any): void {
    const channel = BrokerBootstrap.getChannel();
    channel.ack(message);
  }
}
