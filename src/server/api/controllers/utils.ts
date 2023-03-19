import { User } from '@prisma/client';

import { exclude } from '../services';

export const getUserWithoutPassword = <T extends User>(userData: T) =>
  exclude(userData, ['password']);
