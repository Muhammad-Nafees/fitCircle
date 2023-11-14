export interface IParticipant {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
}
export interface IReceivedBy {
  createdAt: Date;
  deleted: boolean;
  status: string;
  userId: string;
  _id: string;
}

export interface IMessage {
  body: string;
  createdAt: Date;
  deleted: boolean;
  firstName: string;
  lastName: string;
  mediaUrls: [];
  profileImage: string;
  receivedBy: IReceivedBy[];
  sentBy: string;
  senderId: string;
  _id: string;
}

export interface ISupportChats {
  _id: string;
  chatSupport: number | null;
  participants: IParticipant[];
  lastMessage: IMessage;
  chatType: string;
  groupName: string;
  isChatSupport: boolean;
  isTicketClosed: true;
  ticketStatus: string;
  unReadCount: number;
  totalCount: number;
}
