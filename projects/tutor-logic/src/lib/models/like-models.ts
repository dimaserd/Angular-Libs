/**
 * Модель для добавления запроса в избранное
 */
export interface ChangeQuestionLike {
    /**
     * Идентификатор вопроса
     */
    questionId: string;

    /**
     * Добавлен ли данный вопрос в избранное
     */
    hasLike: boolean;
}