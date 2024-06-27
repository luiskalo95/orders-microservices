import { StoreEntity, STATUS } from "../entities/store.entity";

export default interface Repository {
  
  insert(store: StoreEntity): Promise<StoreEntity>;
  update(transaction: string, status: STATUS): Promise<string>;
}
