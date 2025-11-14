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
    correctAnswer: string;
}

export interface TypeAnswerWithErrorsQuestionData {
    rightAnswer: string;
    ignoreTextOrder: boolean;
}

export interface SelectRightAnswerOrAnswersQuestionData {
    selectRightAnswerTitle: string;
    useRadio: boolean;
    itemType: SelectRightAnswerOrAnswersQuestionDataItemType | null;
    answers: Array<Answer>;
}


export interface Answer {
    text: string;
    data: string;
    isRightAnswer: boolean;
}


export enum SelectRightAnswerOrAnswersQuestionDataItemType {
    FileId = 'FileId',
    MarkUp = 'MarkUp'
}

export interface TypeRightAnswerQuestionData {
    caseInSensitive: boolean;
    rightAnswers: Array<string>;
}
