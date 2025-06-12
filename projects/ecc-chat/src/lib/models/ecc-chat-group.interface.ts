export interface ChatGroupUserModel {
  userId: string;
  email: string;
  name: string;
  surname: string;
  unreadMessagesCount: number;
  lastVisitUtcTicks: number;
}
