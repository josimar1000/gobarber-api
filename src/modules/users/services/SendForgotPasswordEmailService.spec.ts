import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
// import AppError from '@shared/errors/AppError';

describe('SendForgotPassordEmail', () => {
  it('Should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeEmailProvider = new FakeEmailProvider();

    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await sendForgotPasswordEmail.execute({
      email: 'johndoe@examplo.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });
});
