import { container } from 'tsyringe';

import IHashProvider from '../provider/HashProvider/models/IHashProvider';
import BCryptHashProvider from '../provider/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider', BCryptHashProvider
);
