import { Injectable } from '@angular/core';
import { UserInChatModel } from './ChatService';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { LoginService } from 'croco-generic-app-logic';
import { FilePathProvider } from './FilePathProvider';

@Injectable({ providedIn: 'root' })
export class InterlocutorService {
  private currentUserId$ = this.loginService.getLoginDataCached().pipe(
    map((loginData) => loginData?.userId),
    shareReplay(1),
  );

  constructor(
    private filePathProvider: FilePathProvider,
    private loginService: LoginService,
  ) { }

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
        let avatarFileId = interlocutor?.user?.avatarFileId;

        return avatarFileId !== null && avatarFileId !== undefined
          ? this.filePathProvider.getSmallImageFilePath(avatarFileId)
          : [null];
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
