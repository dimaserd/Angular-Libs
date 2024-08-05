export class ImageSrcExtensions {

    /**
     * Вовзращает полный путь к изображению по идентификатору файла и типу размера изображения 
     * @param publicImageUrlFormat Форматированная строка содержащая {fileId} и {sizeType} для замены
     * @param imageId Идентификатор изображения
     * @param imageType Тип изображения
     * @returns 
     */
    static createImagePath(publicImageUrlFormat: string, imageId: number, imageType = 'Medium'): string | null {
        
        if (imageId === null || imageId === undefined) {
            return null;
        }

        return publicImageUrlFormat.replace('{sizeType}', imageType).replace('{fileId}', imageId.toString())
    }
}
