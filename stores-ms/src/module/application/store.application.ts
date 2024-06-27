import { StoreEntity, STATUS } from "../domain/entities/store.entity";
import RepositoryBroker from "../domain/repositories/store-broker.repository";
import Repository from "../domain/repositories/store.repository";

export default class StoreApplication {

  private repositoryStore: Repository;
  private repositoryBroker: RepositoryBroker;

  constructor(repository: Repository, repositoryBroker: RepositoryBroker) {
    this.repositoryStore = repository;
    this.repositoryBroker = repositoryBroker;
  }
   //TODO: Solo se usa por si no hubo una actualización con Rabbit y toca por medio Http
  public async update(transaction: string, status: STATUS): Promise<string> {
    return this.repositoryStore.update(transaction, status);
  }

  public async receiveMessage(): Promise<void> {
    await this.repositoryBroker.receive();
  }
}
