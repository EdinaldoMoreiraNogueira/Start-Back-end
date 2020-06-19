import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middewares/ensureAuthentificated';
import UsersControllers from '@modules/users/infra/http/controllers/UsersControllers';

import UserAvatarControllers from '@modules/users/infra/http/controllers/UserAvatarControllers';

const usersRouter = Router();
const usersControllers = new UsersControllers();
const userAvatarControllers = new UserAvatarControllers();


const upload = multer(uploadConfig);



usersRouter.post('/', usersControllers.create);

usersRouter.patch('/avatar',  ensureAuthenticated ,upload.single('avatar'),
    userAvatarControllers.update)









export default usersRouter;
