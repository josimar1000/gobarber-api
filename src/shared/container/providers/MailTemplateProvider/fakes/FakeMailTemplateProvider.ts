import IparseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IparseMailTemplateDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IparseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
