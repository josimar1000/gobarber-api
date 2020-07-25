import IparseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IparseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IparseMailTemplateDTO): Promise<string>;
}
