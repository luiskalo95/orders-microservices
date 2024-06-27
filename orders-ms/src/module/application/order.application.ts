import { OrderEntity, STATUS } from "../domain/entities/order.entity";
import RepositoryBroker from "../domain/repositories/order-broker.repository";
import OrdenRepository from "../domain/repositories/order.repository";

export default class OrderApplication {

  private ordenRepository: OrdenRepository;
  private brokerRepository: RepositoryBroker;

  constructor(repository: OrdenRepository, brokerRepository: RepositoryBroker) {
    this.ordenRepository = repository;
    this.brokerRepository = brokerRepository;
  }

  public async create(order: OrderEntity): Promise<OrderEntity> {
    const result = await this.ordenRepository.insert(order);
    this.brokerRepository.send({
      type: "ORDER_CREATED_EVENT",
      data: result,
    });

    return result;
  }

  /* TODO: No se usa */
  /* public async update(transaction: string, status: STATUS): Promise<string> {
    return this.ordenRepository.update(transaction, status);
  } */

  public async receiveMessage(): Promise<void> {
    await this.brokerRepository.receive();
  }
}
