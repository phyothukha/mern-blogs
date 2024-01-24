import { Request } from "express";
import { Iuser } from ".";

interface IRequest extends Request {
  user: Iuser;
}
