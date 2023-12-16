import { IRequest } from "../interface/express";

export const usePagination = (req: IRequest) => {
  const page = Number(req.query.page) * 1 || 1;
  const limit = Number(req.query.limit) * 1 || 4;
  const skip = Number(page - 1) * limit;

  return { page, limit, skip };
};
