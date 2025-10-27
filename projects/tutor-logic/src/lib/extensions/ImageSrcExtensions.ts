export class ImageSrcExtensions {

    /**
     * Вовзращает полный путь к изображению по идентификатору файла и типу размера изображения 
     * @param publicImageUrlFormat Форматированная строка содержащая {fileId} и {sizeType} для замены
     * @param imageFileId Идентификатор изображения
     * @param imageType Тип изображения
     * @returns 
     */
    static createImagePath(publicImageUrlFormat: string, imageFileId: number | string, sizeType = 'Medium'): string | null {
        
        if (imageFileId === null || imageFileId === undefined) {
            return null;
        }

        return publicImageUrlFormat.replace('{sizeType}', sizeType).replace('{fileId}', imageFileId.toString())
    }
}
