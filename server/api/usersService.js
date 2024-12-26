import Users from "../models/Users.js";

export const isLoggedIn = async (email) => {
  try {
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to find user");
  }
};

export const register = async (user) => {
  console.log(user);

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
