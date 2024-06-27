export type STATUS = "ORDERED" | "PAID" | "STORED" | "DELIVERED" | "COMPLETED" | "CANCELLED";

export class PaymentBuilder {

  public userId: string;
  public productId: string;
  public name: string;
  public itemCount: number;
  public transaction: string;
  public status: STATUS;

  public addUserId(userId: string): PaymentBuilder {
    this.userId = userId;
    return this;
  }

  public addProductId(productId: string): PaymentBuilder {
    this.productId = productId;
    return this;
  }

  public addName(name: string): PaymentBuilder {
    this.name = name;
    return this;
  }

  public addItemCount(itemCount: number): PaymentBuilder {
    this.itemCount = itemCount;
    return this;
  }

  public addTransaction(transaction: string): PaymentBuilder {
    this.transaction = transaction;
    return this;
  }

  public addStatus(status: STATUS): PaymentBuilder {
    this.status = status;
    return this;
  }

  public build(): PaymentEntity {
    return new PaymentEntity(this);
  }
}

export class PaymentEntity {
  
  public userId: string;
  public productId: string;
  public name: string;
  public itemCount: number;
  public transaction: string;
  public status: STATUS;

  constructor(builder: PaymentBuilder) {
    Object.assign(this, builder);
  }
}
