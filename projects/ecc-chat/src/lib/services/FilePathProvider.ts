import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilePathProvider {

  getFileDownloadUrl(fileId: number): string {
    if (!fileId) {
      return null;
    }

    return `/Api/Files/Download?fileId=${fileId}`;
  }

  getMediumImageFilePath(fileId: number): string {
    return this.getSizedImageFilePath(fileId, 'Medium');
  }

  getOriginalImageFilePath(fileId: number): string {
    return this.getSizedImageFilePath(fileId, 'Original');
  }

  getSmallImageFilePath(fileId: number): string {
    return this.getSizedImageFilePath(fileId, 'Small');
  }

  getIconImageFilePath(fileId: number): string {
    return this.getSizedImageFilePath(fileId, 'Icon');
  }

  getSizedImageFilePath(fileId: number, sizeName: string): string {
    if (!fileId) {
      return null;
    }

    return `/FileCopies/Images/${sizeName}/${fileId}.png`;
  }
}
