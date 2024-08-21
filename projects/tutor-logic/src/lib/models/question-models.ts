export enum TestQuestionType {
    SelectRightAnswerOrAnswers = 'SelectRightAnswerOrAnswers',
    TypeRightAnswer = 'TypeRightAnswer',
    DetailedAnswer = 'DetailedAnswer',
    TypeAnswerWithErrors = 'TypeAnswerWithErrors',
    ManyAnswersBoxes = 'ManyAnswersBoxes'
}

export interface TestQuestionModel {
    id: string;
    title: string;
    titleBodyMarkUp: string;
    helpBodyMarkUp: string;
    answerExplanationMarkUp: string;
    titleBodyMarkUpMobile: string;
    helpBodyMarkUpMobile: string;
    answerExplanationMarkUpMobile: string;
    versionId: string;
    type: TestQuestionType;
    selectRightAnswerOrAnswersData: SelectRightAnswerOrAnswersQuestionData;
    typeRightAnswerQuestionData: TypeRightAnswerQuestionData;
    typeAnswerWithErrorsData: TypeAnswerWithErrorsQuestionData;
    manyAnswersBoxesData: ManyAnswersBoxesQuestionData;
}

export interface ManyAnswersBoxesQuestionData {
    answerBoxes: Array<QuestionAnswerBox>;
}

export interface QuestionAnswerBox {
    label: string;
    rightAnswer: string;
}

export interface TypeAnswerWithErrorsQuestionData {
    rightAnswer: string;
    ignoreTextOrder: boolean;
}


export interface SelectRightAnswerOrAnswersQuestionData {
    selectRightAnswerTitle: string;
    rightAnswersCount: number;
    answers: Array<Answer>;
}

export interface Answer {
    text: string;
    isRightAnswer: boolean;
}

export interface TypeRightAnswerQuestionData {
    caseInSensitive: boolean;
    rightAnswers: Array<string>;
}
