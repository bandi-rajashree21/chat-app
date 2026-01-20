import { validateSignup, validateLogin } from "../validators/auth.validator.js";
import * as authService from "../services/auth.service.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const validation = validateSignup(req.body);
  if (!validation.valid)
    return res.status(400).json({ message: validation.message });

  try {
    const newUser = await authService.signupService(req.body, res);
    res
      .status(201)
      .json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
  } catch (error) {
    console.error("Error in signup controller", error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const validation = validateLogin(req.body);
  if (!validation.valid)
    return res.status(400).json({ message: validation.message });

  try {
    const user = await authService.loginService(req.body, res);
    res
      .status(200)
      .json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
  } catch (error) {
    console.error("Error in login controller", error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    let updatedUser;

    if (Object.prototype.hasOwnProperty.call(req.body, "profilePic")) {
      const profilePic = req.body.profilePic;
      if (profilePic) {
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updatedUser = await authService.updateProfileService(
          req.user._id,
          fullName,
          uploadResponse.secure_url,
        );
      } else {
        updatedUser = await authService.updateProfileService(
          req.user._id,
          fullName,
          null,
        );
      }
    } else {
      updatedUser = await authService.updateProfileService(
        req.user._id,
        fullName,
        undefined,
      );
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  res.status(200).json(req.user);
};
