import { User } from "./User";

export enum MessageStatus {
  Sending = 'sending',
  Sent = 'sent',
  Error = 'error',
}

export interface Message {
  fromUser: User;
  body: string;
  sent: number;
  status: MessageStatus;
  seen: boolean;
}

export interface Thread {
  threadID: string;
  users: User[];
  unread: boolean;
  messages: Message[]
}