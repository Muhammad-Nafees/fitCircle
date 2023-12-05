import {api} from '../api/utils/interceptor';
import {FileData} from '../interfaces/user.interface';
import io from 'socket.io-client';

const BASE_SOCKET_CONNECTION: string = 'http://fitcircle.yameenyousuf.com'; // dev

export const socket = io(BASE_SOCKET_CONNECTION);

//creating support

export const createChatSupport = (userId: string) => {
  socket.emit('createChatForSupport', {
    userId: userId,
  });
};

// getting all support user chats
export const getSupportChats = (userId: string) => {
  socket.emit('getSupportChats', {
    userId: userId,
    page: 1,
  });
};

// getting support chat messages

export const getSupportChatMessages = (userId: string, chatId: string) => {
  socket.emit('getChatSupportMessages', {
    userId: userId,
    chatId: chatId,
    page: 1,
  });
};

// sending messages

export const sendMessageToSupport = (
  userId: string,
  chatId: string,
  message: any,
  name: string,
) => {
  socket.emit('createSupportMessage', {
    senderId: userId,
    chatId: chatId,
    messageBody: message,
    name: name,
  });
};

export const sendMediaToSupport = async (
  senderId: string,
  chatId: string,
  mediaFile: FileData,
  messageBody?: string,
) => {
  let formData = new FormData();
  formData.append('senderId', senderId);
  formData.append('chatId', chatId);
  formData.append('mediaFile', mediaFile);
  if (messageBody) {
    formData.append('messageBody', messageBody);
  }

  const response = await api.post(`media/send-media`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
