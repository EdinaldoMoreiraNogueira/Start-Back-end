import { Router}  from 'express';
import AppointmentsControllers from '@modules/appointments/infra/http/controllers/AppointmentsControllers';

import ensureAuthentificated from '@modules/users/infra/http/middewares/ensureAuthentificated';



const appointmentsRouter = Router();
const appointmentsControllers = new AppointmentsControllers();


appointmentsRouter.use(ensureAuthentificated);


appointmentsRouter.post('/', appointmentsControllers.create)


export default appointmentsRouter;
