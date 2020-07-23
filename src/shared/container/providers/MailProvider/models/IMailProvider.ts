export default interface IMailProvider {
  sendMail(to: string, dody: string): Promise<void>;
}
