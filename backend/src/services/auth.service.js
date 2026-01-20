import bcrypt from "bcryptjs";
import userDao from "../dao/user.dao.js";
import { generateToken } from "../lib/utils.js";

export const signupService = async ({ fullName, email, password }, res) => {
  const existing = await userDao.findByEmail(email);
  if (existing) throw { status: 400, message: "Email already exists" };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await userDao.createUser({
    fullName,
    email,
    password: hashedPassword,
  });
  generateToken(newUser._id, res);

  return newUser;
};

export const loginService = async ({ email, password }, res) => {
  const user = await userDao.findByEmail(email);
  if (!user) throw { status: 400, message: "Invalid credentials" };

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw { status: 400, message: "Invalid credentials" };

  generateToken(user._id, res);

  return user;
};

export const updateProfileService = async (userId, fullName, profilePic) => {
  const update = {};
  if (fullName !== undefined) update.fullName = fullName;
  if (profilePic !== undefined) update.profilePic = profilePic;

  return userDao.updateById(userId, update);
};

export default { signupService, loginService, updateProfileService };
