import OrderApplication from '../module/application/order.application';
export default class TaskBootstrap {

    constructor(private orderApplication: OrderApplication) { }

    public async listenMessage(): Promise<void> {
        await this.orderApplication.receiveMessage();
    }
}