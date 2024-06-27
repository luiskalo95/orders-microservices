import DeliveryApplication from "../module/application/delivery.application";
export default class TaskBootstrap {

  constructor(private deliveryApplication: DeliveryApplication) {}

  public async listenMessage(): Promise<void> {
    await this.deliveryApplication.receiveMessage();
  }
}
