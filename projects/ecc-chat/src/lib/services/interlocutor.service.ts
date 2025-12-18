import { Inject, Injectable, Optional } from '@angular/core';
import { UserInChatModel } from './ChatService';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { LoginService } from 'croco-generic-app-logic';
import { EccChatOptions, EccChatOptionsToken } from '../options';

@Injectable({ providedIn: 'root' })
export class InterlocutorService {
  private currentUserId$ = this.loginService.getLoginDataCached().pipe(
    map((loginData) => loginData?.userId),
    shareReplay(1),
  );

  private readonly options: EccChatOptions;

  constructor(
    @Optional() @Inject(EccChatOptionsToken) options: EccChatOptions | null,
    private loginService: LoginService,
  ) {

    if (options) {
      this.options = options;
    } else {
      const getSizedImageFilePath = (fileId: number, sizeName: string): string | null => {
        if (!fileId) {
          return null;
        }

        return `/FileCopies/Images/${sizeName}/${fileId}.png`;
      };

      this.options = {
        ...this.options,
        getSizedImageFilePath,
      };
    }
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
          ? of(this.options.getSmallImageFilePath(avatarFileId))
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
