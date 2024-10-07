/**
 * Роли для модуля Tutor
 */
export class TutorRoles {

    /**
     * Куратор - проверяет домашние задания студентов (учеников).
     */
    static readonly curator: string = 'Tutor.Curator';

    /**
     * Администратор - управляет и настраивает платформу
     */
    static readonly admin: string = 'Tutor.Admin';

    /**
     * Студент (ученик) - проходит курсы, решает тесты, просматривает материалы.
     */
    static readonly student: string = 'Tutor.Student';

    /**
     * Пользователь, который может вносить вопросы
     */
    static readonly testAuthor: string = 'Tutor.TestAuthor';

    /**
     * Администратор конкретной школы
     */
    static readonly schoolAdmin: string = 'Tutor.SchoolAdmin';
}