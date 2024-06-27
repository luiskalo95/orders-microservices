export class AuthBuilder {

  public _id: string;
  public email: string;
  public password: string;
  public name: string;
  public refreshToken: string;

  public addEmail(email: string): AuthBuilder {
    this.email = email;
    return this;
  }

  public addPassword(password: string): AuthBuilder {
    this.password = password;
    return this;
  }

  public addName(name: string): AuthBuilder {
    this.name = name;
    return this;
  }

  public addRefreshToken(refreshToken: string): AuthBuilder {
    this.refreshToken = refreshToken;
    return this;
  }

  public build(): AuthEntity {
    return new AuthEntity(this);
  }
}

export class AuthEntity {
  
  public _id?: string;
  public email: string;
  public password: string;
  public name: string;
  public refreshToken?: string;

  constructor(builder: AuthBuilder) {
    Object.assign(this, builder);
  }
}
