export const validateSignup = (body) => {
  const { fullName, email, password } = body;
  if (!fullName || !email || !password) {
    return { valid: false, message: "All fields are required" };
  }
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  return { valid: true };
};

export const validateLogin = (body) => {
  const { email, password } = body;
  if (!email || !password)
    return { valid: false, message: "Email and password are required" };
  return { valid: true };
};
