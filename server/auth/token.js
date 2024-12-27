import jwt from "jsonwebtoken";

export const generateAccessToken = async (user) => {
  return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
};
