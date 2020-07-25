import IparseMailTemplateDTO from 'shared/container/providers/MailTemplateProvider/dtos/IparseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IparseMailTemplateDTO;
}
