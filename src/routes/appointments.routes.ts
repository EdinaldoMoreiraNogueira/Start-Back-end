import {Router} from 'express';
import {getCustomRepository} from 'typeorm';
import {startOfHour, parseISO, isEqual} from 'date-fns';
import ensureAuthentificated from '../middewares/ensureAuthentificated';
import Appointment from '../models/Appointment';
import AppointmentsRepository from
'../repositories/AppointmentsRepository';
import CreateAppointmentServices from
 '../services/CreateAppointmentServices';


const appointmentsRouter = Router();


appointmentsRouter.use(ensureAuthentificated);

appointmentsRouter.get('/', async (request, response) => {

  const appointmentsRepository = getCustomRepository(
    AppointmentsRepository);
const appointment = await appointmentsRepository.find();

return response.json(appointment);

});


appointmentsRouter.post('/', async (request, response) =>{
    const {provider_id, date} = request.body;

  const parsedDate = parseISO(date);
  const appointmentsRepository = getCustomRepository(
    AppointmentsRepository);


  const createAppointment = new CreateAppointmentServices ();

    const appointment = await createAppointment.execute (
      {date: parsedDate, provider_id})

      return response.json(appointment);
});

export default appointmentsRouter;
