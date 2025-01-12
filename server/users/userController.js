import { login as login, register } from "./usersService.js";

export async function loginUser(req, res) {
  const user = req.body;

  let response;
  try {
    response = await login(user);
    const { token, userId } = response;
    if (token) {
      res.cookie("token", token, {
        path: "/",
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
      });
      return res
        .status(200)
        .json({ message: "User logged in successfully.", userId: userId });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function verifyUser(req, res) {
  try {
    return res.status(200).json({ message: "User is verify" });
  } catch (error) {
    return res.status(401).json({ message: "User is not verify" });
  }
}

export async function registerUser(req, res) {
  const user = req.body;
  try {
    const result = await register(user);
    if (result)
      return res.status(200).json({ message: "successful to create user" });
  } catch (error) {
    return res.status(500).json({
      message: "Faild to register user try diffrent email or password",
    });
  }
}
