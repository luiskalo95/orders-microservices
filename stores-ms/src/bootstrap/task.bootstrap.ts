import StoreApplication from "../module/application/store.application";
export default class TaskBootstrap {

  constructor(private storeApplication: StoreApplication) {}

  public async listenMessage(): Promise<void> {
    await this.storeApplication.receiveMessage();
  }
}
