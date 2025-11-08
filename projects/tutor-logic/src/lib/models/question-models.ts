export enum TestQuestionType {
    SelectRightAnswerOrAnswers = 'SelectRightAnswerOrAnswers',
    TypeRightAnswer = 'TypeRightAnswer',
    DetailedAnswer = 'DetailedAnswer',
    TypeAnswerWithErrors = 'TypeAnswerWithErrors',
    ManyAnswersBoxes = 'ManyAnswersBoxes',
    FillGaps = 'FillGaps'
}

export enum GapType {
    Select = 'Select',
    Input = 'Input'
}

export interface GapModel {
    type: GapType;
    correctAnswers: Array<string>;
    answersToSelect: Array<string>;
}

export interface GapsQuestionData {
    gapText: string;
    gaps: Array<GapModel>;
}

export interface TestQuestionModel {
    id: string;
    title: string;
    titleBodyMarkUp: string;
    helpBodyMarkUp: string;
    answerExplanationMarkUp: string;
    versionId: string;
    type: TestQuestionType;
    selectRightAnswerOrAnswersData: SelectRightAnswerOrAnswersQuestionData;
    typeRightAnswerQuestionData: TypeRightAnswerQuestionData;
    typeAnswerWithErrorsData: TypeAnswerWithErrorsQuestionData;
    manyAnswersBoxesData: ManyAnswersBoxesQuestionData;
    gapsData: GapsQuestionData;
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
