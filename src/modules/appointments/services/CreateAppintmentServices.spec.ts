import AppError from '@shared/error/appError'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentServices from './CreateAppointmentServices';

describe('CreateAppointment', ()=>{
  it('should be able to create a new appointment', async ()=>{

    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentServices(fakeAppointmentRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '111111',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('111111');
  });


  it('should not be able to create two appointments on the same time',async ()=>{

    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentServices(fakeAppointmentRepository);

    const appointmentDate = new Date(2020, 5, 16, 2);
    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '111111',
    });

    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '111111',
    })).rejects.toBeInstanceOf(AppError);

  });
});
