import Users from "../models/Users.js";
import { generateAccessToken } from "../auth/token.js";

export const login = async (user) => {
  try {
    const existingUser = await Users.findOne({
      email: user.email,
      password: user.password,
    });
    if (existingUser) {
      const token = generateAccessToken(user);
      return token;
    }
    return false;
  } catch (error) {
    console.error("Failed to find user");
  }
};

export const register = async (user) => {
  console.log(user);
  const existingUser = await Users.findOne({ email: user.email });
  if (existingUser) {
    console.log("Email already exists");
    return false;
  }
  try {
    const newUser = new Users({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const isUserCreated = await newUser.save();
    console.log("iscreated", isUserCreated);

    return isUserCreated ? true : false;
  } catch (error) {
    console.error("Failed to create user");
  }
};
