export interface IAnswer {
  returnedData: IValues | IQuestion;
  answer: string,
}

export interface IValues {
  need: number,
  maturity: number,
}

export interface IQuestion {
  multipleAnswer?: boolean;
  rangeAnswer?: boolean;
  answers: Array<IAnswer>;
  name: string;
}

export interface ISelectedAnswer {
  question: string;
  answer: string;
}

export interface ISelectedValues {
  index: number;
  selectedOption: number | Array<number>;
  values: IValues | Array<IValues>;
  silos?: IValues;
}

interface IQuestionsProps {
  question: IQuestion,
  option: number;
  totalQuestions: number;
  questionNumber: number;
  multipleOptions: Array<number>,
  confirmAnswer: Function,
  handleOption: Function,
  handleMultipleOptions: Function,
  handlePrevQuestion: Function,
  isNextButtonDisabled: () => boolean,
  isBackButtonDisabled: () => boolean,
}

export default IQuestionsProps;