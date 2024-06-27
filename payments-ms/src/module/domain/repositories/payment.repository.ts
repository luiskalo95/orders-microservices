import { PaymentEntity, STATUS } from "../entities/payment.entity";

export default interface Repository {
  
  insert(payment: PaymentEntity): Promise<PaymentEntity>;
  update(transaction: string, status: STATUS): Promise<string>;
}
