import {ChatMessageModel} from '../services/ChatMessagingService';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

// TODO дописать комментариев на каждое поле
export interface MessageView {
  date: Date | null;
  dayId: string;
  isUploading?: boolean;
  filesUploadingProgress$?: Observable<{ uploadingLoaded?: number; uploadingTotal?: number }[]>;
  onServerId?: BehaviorSubject<string | null>;
  sendingFailed?: BehaviorSubject<boolean>;
  cancel?: Subject<void>;
  message: ChatMessageModel;
}
