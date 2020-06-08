import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUsersService from '../services/CreateUsersService';
import ensureAuthenticated from '../middewares/ensureAuthentificated';
import UpdateUsersAvatarService from '../services/UpdateUsersAvatarService';

const usersRouter = Router();

const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response, next) => {
    const { name, email, password } = request.body;


     const createUsers = new CreateUsersService();

     const user = await createUsers.execute({
       name,
       email,
       password,
     });

     delete user.password;


     return response.json(user);
    });

   usersRouter.patch('/avatar',  upload.single('avatar'),
   async (request, response)=>{


     const uploadUserAvatar = new UpdateUsersAvatarService();

     const user = await uploadUserAvatar.execute({
   user_id: request.user.id,
   avatarFilename: request.file.filename,
     });




  return response.json(user);

   });

export default usersRouter;
