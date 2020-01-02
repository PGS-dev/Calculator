import React, {useState} from 'react';
import QuestionsTemplate from './Questions.template';

import questionsData from '../../data/questions.json';
import { IValues, IQuestion} from "./Questions.interface";
import Report from "../Report";

const Questions: React.FC = () =>  {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [singleOption, setSingleOption] = useState<number>(-1);
  const [need, setNeed] = useState<number>(0);
  const [maturity, setMaturity] = useState<number>(0);
  const [isReportReady, setIsReportReady] = useState<boolean>(false);
  const [multipleOptions, setMultipleOptions] = useState<Array<number>>([]);
  const [question, setQuestion] = useState<IQuestion>(questionsData[questionIndex]);

  const handleSingleOption = (selectedOption: number) => {
    setSingleOption(selectedOption);
  }

  const handleMultipleOptions = (selectedOption: number) => {
    if (multipleOptions.find((option) => option === selectedOption)) {
      const filteredArray = multipleOptions.filter((option) => option !== selectedOption);
      setMultipleOptions(filteredArray);
    } else {
      setMultipleOptions((prevState) => [...prevState, selectedOption]);
    }
  }

  const confirmAnswer = () => {
    if (question.multipleAnswer) {
      multipleOptions.map((option) => {
        const returnedData: IValues | IQuestion = question.answers[option - 1].returnedData;
        updateValues(returnedData as IValues);
      });
      updateValues(updateValuesFromSilos(multipleOptions.length));
      setMultipleOptions([]);
      goToNextQuestion();
    } else {
      const returnedData: IValues | IQuestion = question.answers[singleOption].returnedData;

      if ((returnedData as IQuestion).name) {
        setQuestion(returnedData as IQuestion);
      } else {
        updateValues(returnedData as IValues);
        goToNextQuestion();
      }

      setSingleOption(-1);
    }
  }

  const updateValues = (values: IValues) => {
    setNeed(prevState => prevState + values.need);
    setMaturity(prevState => prevState + values.maturity);
  }

  const goToNextQuestion = () => {
    const nextIndex = questionIndex + 1;

    if (questionsData[nextIndex] !== undefined) {
      setQuestion(questionsData[nextIndex]);
      setQuestionIndex(nextIndex);
    } else {
      setIsReportReady(true);
    }
  }

  const isButtonDisabled = (): boolean => {
    return question.multipleAnswer ? multipleOptions === [] : singleOption === -1;
  }

  const updateValuesFromSilos = (length: number): IValues => {
    if (length === 1) {
      return { need: -6, maturity: 0 }
    }
    if (length === 2) {
      return { need: 2, maturity: 0 }
    }
    if (length === 3) {
      return { need: 6, maturity: 0 }
    }
    if (length >= 4) {
      return { need: 10, maturity: 0 }
    }
    return { need: 0, maturity: 0 }
  }

  const props = {
    question,
    singleOption,
    multipleOptions,
    confirmAnswer,
    handleSingleOption,
    handleMultipleOptions,
    isButtonDisabled,
  }

  return isReportReady ? <Report need={need > 0 ? need: 0} maturity={maturity > 0 ? maturity: 0} /> : <QuestionsTemplate {...props} />;
}

export default Questions;
