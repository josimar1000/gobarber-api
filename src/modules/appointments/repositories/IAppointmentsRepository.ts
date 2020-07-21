import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppintmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
