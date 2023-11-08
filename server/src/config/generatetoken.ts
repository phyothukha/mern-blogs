import jwt from "jsonwebtoken";

export const generateActivetoken = (payload: object) => {
  return jwt.sign(payload, `${process.env.JWT_ACTIVE_SECRET}`, {
    expiresIn: "5m",
  });
};

export const generateAccesstoken = (payload: object) => {
  return jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, {
    expiresIn: "15m",
  });
};

export const generateRefreshtoken = (payload: object) => {
  return jwt.sign(payload, `${process.env.JWT_REFRESH_SECRET}`, {
    expiresIn: "30d",
  });
};
