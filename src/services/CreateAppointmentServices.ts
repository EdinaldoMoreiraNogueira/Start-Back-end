import {startOfDay} from 'date-fns';
import {getCustomRepository} from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'

import appError from '../error/appError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService{

  public async execute({provider_id, date}:Request):
   Promise <Appointment> {
    const appointmentsRepository = getCustomRepository (
      AppointmentsRepository);

    const appointmentDate = startOfDay(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate
    (appointmentDate);

      if(findAppointmentInSameDate) {
        throw new appError('This appointment is already bookeed');
      }
          const appointment = appointmentsRepository.create({
            provider_id,
           date: appointmentDate,
          });

          await appointmentsRepository.save(appointment);

      return appointment;
  }
}

export default CreateAppointmentService;
