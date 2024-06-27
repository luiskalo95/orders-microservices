export default interface RepositoryBroker {
  
  send(message: any): Promise<void>;
  sendError(message: any): Promise<void>;
  receive(): Promise<void>;
}
