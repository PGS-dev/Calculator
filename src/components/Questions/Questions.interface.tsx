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
  answers: Array<IAnswer>;
  name: string;
}

export interface ISelectedAnswer {
  question: string;
  answer: string;
}

interface IQuestionsProps {
  question: IQuestion,
  multipleOptions: Array<number>,
  option: number,
  confirmAnswer: Function,
  handleOption: Function,
  handleMultipleOptions: Function,
  isButtonDisabled: () => boolean,
}

export default IQuestionsProps;