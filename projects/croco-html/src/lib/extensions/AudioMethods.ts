export class FileAudioTagDataConsts {
  static readonly TagName = "audio-player";
  static readonly FileIdAttrName = "file-id";
}

export class AudioMethods {

  public static buildUrl(fileId: string, fileName: string): string {
    //TODO заглушка, пока юзаем статичный фапйл
    if (fileId && fileId !== '') {
      if (!isNaN(Number(fileId))) {
        return `/api/PrivateFiles/GetFile?fileId=${fileId}`;
      } else {
        return `/api/PublicFiles/GetFile?fileId=${fileId}`;
      }
    }

    if (fileName && fileName !== '') {
      return fileName;
    }

    return null;
  }

  public static isPrivateFileId(fileId: string): boolean {
    return !isNaN(Number(fileId));
  }

  public static formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) {
      return '0:00';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  public static calculateProgress(currentTime: number, duration: number): number {
    if (duration === 0 || isNaN(duration) || isNaN(currentTime)) {
      return 0;
    }
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }
}
