import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors';
import '@shared/container';

import routes from './routes';
import uploadConfing from '@config/upload';
import appError from '@shared/error/appError';

import '@shared/infra/typeorm';


const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfing.uploadsFolder));
app.use(routes);
console.log(routes);
app.use((err: Error, request: Request,
  response: Response, next:
   NextFunction) =>{
     if(err instanceof appError) {
       return response.status(err.statusCode).json({
         status: 'error',
         menssage: err.message,
       });
     }


      console.error(err);
      console.log(err);
      return response.status(500).json({
       status: 'error',
       menssage: 'internal error server',
     })

});





app.listen(3333, () => {
  console.log('Server started on port 3333!');
});














































44444




















































































44444




































