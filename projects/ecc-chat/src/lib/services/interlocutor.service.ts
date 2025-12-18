import { Inject, Injectable } from '@angular/core';
import { UserInChatModel } from './ChatService';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { LoginService } from 'croco-generic-app-logic';
import { EccChatOptions, EccChatOptionsToken } from '../options';

function createImagePath(format: string, fileId: number, sizeType: string = 'Small'): string | null {
  if (fileId === null || fileId === undefined) {
    return null;
  }

  return format
    .replace('{sizeType}', sizeType)
    .replace('{fileId}', fileId.toString());
}

@Injectable({ providedIn: 'root' })
export class InterlocutorService {
  private currentUserId$ = this._loginService.getLoginDataCached().pipe(
    map((loginData) => loginData?.userId),
    shareReplay(1),
  );


  constructor(
    @Inject(EccChatOptionsToken) private readonly _options: EccChatOptions,
    private readonly _loginService: LoginService,
  ) {
  }

  public getChatName(users: UserInChatModel[], chatName: string | undefined): Observable<string | undefined> {
    return chatName
      ? of(chatName)
      : this.getInterlocutor(users).pipe(
        map((interlocutor) =>
          interlocutor !== undefined && interlocutor !== null ? [interlocutor.user.name, interlocutor.user.surname].filter(Boolean).join(' ') : '',
        ),
      );
  }

  public getInterlocutorAvatar(users: UserInChatModel[]): Observable<string | null> {
    return this.getInterlocutor(users).pipe(
      switchMap((interlocutor) => {
        const avatarFileId = interlocutor?.user?.avatarFileId;

        return avatarFileId !== null && avatarFileId !== undefined
          ? of(createImagePath(this._options.fileIdAndSizeImageFormat, avatarFileId, 'Small'))
          : of(null);
      }),
    );
  }

  private getInterlocutor(users: UserInChatModel[]): Observable<UserInChatModel | undefined> {
    return this.currentUserId$.pipe(
      map((currentUserId) => {
        return users.find((user) => user.user.id !== currentUserId);
      }),
    );
  }
}
