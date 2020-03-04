import React, { useState } from 'react';
import QuestionsTemplate from './Questions.template';

import questionsData from '../../data/questions.json';
import { IValues, IQuestion, ISelectedAnswer } from './Questions.interface';
import Report from '../Report';

const Questions: React.FC = () =>  {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [need, setNeed] = useState<number>(0);
  const [maturity, setMaturity] = useState<number>(0);
  const [isReportReady, setIsReportReady] = useState<boolean>(false);
  const [multipleOptions, setMultipleOptions] = useState<Array<number>>([]);
  const [question, setQuestion] = useState<IQuestion>(questionsData[questionIndex]);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<ISelectedAnswer>>([]);

  const handleOption = (selectedOption: number) => {
    confirmAnswer(selectedOption);
  }

  const handleMultipleOptions = (selectedOption: number) => {
    if (multipleOptions.find((option) => option === selectedOption)) {
      const filteredArray = multipleOptions.filter((option) => option !== selectedOption);
      setMultipleOptions(filteredArray);
    } else {
      setMultipleOptions((prevState) => [...prevState, selectedOption]);
    }
  }

  const confirmAnswer = (option: number = 0) => {
    if (question.multipleAnswer) {
      multipleOptions.forEach((option) => {
        const returnedData: IValues | IQuestion = question.answers[option - 1].returnedData;

        setSelectedAnswers((prevState) => [...prevState, {
          question: question.name,
          answer: question.answers[option - 1].answer,
        }]);

        updateValues(returnedData as IValues);
      });
      updateValues(updateValuesFromSilos(multipleOptions.length));
      setMultipleOptions([]);
      goToNextQuestion();
    } else {
      const returnedData: IValues | IQuestion = question.answers[option].returnedData;

      setSelectedAnswers((prevState) => [...prevState, {
        question: question.name,
        answer: question.answers[option].answer,
      }]);

      if ((returnedData as IQuestion).name) {
        setQuestion(returnedData as IQuestion);
      } else {
        updateValues(returnedData as IValues);
        goToNextQuestion();
      }
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
    return multipleOptions === [];
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
    multipleOptions,
    confirmAnswer,
    handleOption,
    handleMultipleOptions,
    isButtonDisabled,
  }

  return isReportReady 
    ? <Report 
        selectedAnswers={selectedAnswers} 
        need={need > 0 ? need: 0} 
        maturity={maturity > 0 ? maturity: 0} 
      /> 
    : <QuestionsTemplate {...props} />;
}

export default Questions;
