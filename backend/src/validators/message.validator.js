export const validateSendMessage = (body) => {
  const { text, image } = body;
  if (!text && !image)
    return { valid: false, message: "Message must contain text or image" };
  return { valid: true };
};
