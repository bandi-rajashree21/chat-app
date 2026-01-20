import userDao from "../dao/user.dao.js";
import * as messageService from "../services/message.service.js";
import { validateSendMessage } from "../validators/message.validator.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await userDao.findAllExcept(loggedInUserId);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await messageService.getMessagesForChat(
      myId,
      userToChatId,
    );
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  const validation = validateSendMessage(req.body);
  if (!validation.valid)
    return res.status(400).json({ message: validation.message });

  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    const newMessage = await messageService.sendMessageService({
      senderId,
      receiverId,
      text,
      image,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
