import {startOfDay} from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import appError from '@shared/error/appError';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService{

  constructor(
    @inject('AppointmentsRepository')
  private appointmentRepository: IAppointmentsRepository,
  ){}

  public async execute({provider_id, date}:IRequest):
   Promise <Appointment> {

    const appointmentDate = startOfDay(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate
    (appointmentDate);

      if(findAppointmentInSameDate) {
        throw new appError('This appointment is already bookeed');
      }
          const appointment = await this.appointmentRepository.create({
            provider_id,
           date: appointmentDate,
          });



      return appointment;
  }
}

export default CreateAppointmentService;
