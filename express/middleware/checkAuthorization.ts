import { NextFunction } from "express";

export const checkAuthorization = (
  req: any, //gives errors when type is set to Request
  res: any, //gives errors when type is set to Response
  next: NextFunction
) => {
  if (!req.user)
    res
      .status(401)
      .send({ error: "you are unauthorized to make this request" });
  else next();
};
