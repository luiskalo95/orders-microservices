import { PaymentEntity, STATUS } from "../domain/entities/payment.entity";
import RepositoryBroker from "../domain/repositories/payment-broker.repository";
import Repository from "../domain/repositories/payment.repository";

export default class PaymentApplication {

  private repositoryPayment: Repository;
  private repositoryBroker: RepositoryBroker;

  constructor(repository: Repository, repositoryBroker: RepositoryBroker) {
    this.repositoryPayment = repository;
    this.repositoryBroker = repositoryBroker;
  }

   //TODO: Solo se usa por si no hubo una actualización con Rabbit y toca por medio Http
  public async update(transaction: string, status: STATUS): Promise<string> {
    return this.repositoryPayment.update(transaction, status);
  }

  public async receiveMessage(): Promise<void> {
    await this.repositoryBroker.receive();
  }
}
