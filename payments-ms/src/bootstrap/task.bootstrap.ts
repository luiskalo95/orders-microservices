import PaymentApplication from "../module/application/payment.application";
export default class TaskBootstrap {
  
  constructor(private paymentApplication: PaymentApplication) {}

  public async listenMessage(): Promise<void> {
    await this.paymentApplication.receiveMessage();
  }
}
