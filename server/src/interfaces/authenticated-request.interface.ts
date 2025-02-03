// src/common/interfaces/authenticated-request.interface.ts
import { Request } from 'express';
import { User } from 'src/users/user.schema';

export interface AuthenticatedRequest extends Request {
  user: User;
}
