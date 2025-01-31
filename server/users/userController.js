import {
  login as login,
  register,
  getUserInfo,
  inProcess,
} from "./usersService.js";

export async function userLogin(req, res) {
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

export async function userVerify(req, res) {
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
    if (result) {
      return res.status(200).json({ message: "successful to create user" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Faild to register user try diffrent email or password",
    });
  }
}

export async function registerVerify(req, res) {
  console.log(req.body);

  const code = req.body;
  console.log(code.code);

  try {
    const result = await inProcess(code.code);
    if (result)
      return res
        .status(200)
        .json({ message: "successful to create user and confirm email" });
  } catch (error) {
    return res.status(500).json({
      message: "Faild to confirm email",
    });
  }
}

export async function userLogout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "successful to logout user" });
  } catch (error) {
    return res.status(500).json({
      message: "Faild to logout user",
    });
  }
}

export async function UserInfo(req, res) {
  const { userId } = req.body;
  try {
    const info = await getUserInfo(userId);
    return res
      .status(200)
      .json({ message: "successful to logout user", userInfo: info });
  } catch (error) {
    return res.status(500).json({
      message: "Faild to logout user",
    });
  }
}
