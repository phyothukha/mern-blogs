import { IAuthUser } from "./../../../client/src/store/server/auth/interface";

import { Request } from "express";

interface IRequest extends Request {
  user: IAuthUser;
}
