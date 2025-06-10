import { EccChatSpriteIdsType } from '../../chat-sprite-ids.type';


export interface IChatCustomButton {
  id: string;
  iconType: EccChatSpriteIdsType;
  clickHandler: Function;
}

export interface ChatSettings {
  // частота запросов апи chat для обновления инфо о посещении
  chatInfoInterval: number;
  // частота запроса апи list для получения новых сообщений
  lastMessagesUpdateInterval: number;
  // частота запроса апи list для обновления видимых сообщений
  visibleMessagesUpdateInterval: number;
  // count в апи list для подгрузки сообщений
  listResponseCount: number;
  // для инфинити скрола. индекс сообщения при появлении которого будут подгружаться предыдущие сообщения
  loadPreviousMessagesWhenMessageVisible: number;
  // отображение срепочки
  canSendFiles: boolean;
  // отображение имени отправителя
  useSenderNickName: boolean;

  /**
   * Кастомные кнопки
   */
  customButtons: Array<IChatCustomButton>;
}
