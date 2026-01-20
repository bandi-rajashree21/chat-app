import messageDao from "../dao/message.dao.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getMessagesForChat = async (myId, otherId) => {
  return messageDao.findBetweenUsers(myId, otherId);
};

export const sendMessageService = async ({
  senderId,
  receiverId,
  text,
  image,
}) => {
  let imageUrl;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = await messageDao.createMessage({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  return newMessage;
};

export default { getMessagesForChat, sendMessageService };
