import {Router} from 'express';

import ForgotPasswordControllers from '@modules/users/infra/http/controllers/ForgotPasswordControllers';
import ResetPasswordControllers from '@modules/users/infra/http/controllers/ResetPasswordControllers';

const passwordRouter = Router();

const forgotPasswordControllers = new ForgotPasswordControllers();
const resetPasswordControllers = new ResetPasswordControllers();

passwordRouter.post('/forgot', forgotPasswordControllers.create);
passwordRouter.post('/reset', resetPasswordControllers.create)

export default passwordRouter;
