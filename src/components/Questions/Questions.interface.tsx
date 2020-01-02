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

interface IQuestionsProps {
  question: IQuestion,
  multipleOptions: Array<number>,
  singleOption: number,
  confirmAnswer: Function,
  handleSingleOption: Function,
  handleMultipleOptions: Function,
  isButtonDisabled: () => boolean,
}

export default IQuestionsProps;