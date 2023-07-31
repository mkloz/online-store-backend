import { Role } from '@prisma/client';

export interface IJwtPayload {
  id: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}
