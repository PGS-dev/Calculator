import React, { useState } from 'react';
import QuestionsTemplate from './Questions.template';

import questionsData from '../../data/questions.json';
import { IValues, IQuestion, ISelectedAnswer, ISelectedValues } from './Questions.interface';
import Report from '../Report';
import ReportReadyScreen from '../Screens/ReportReady.template';

const Questions: React.FC = () =>  {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isReportReady, setIsReportReady] = useState<boolean>(false);
  const [reportPreview, setReportPreview] = useState<boolean>(false);
  const [option, setOption] = useState<number>(-1);
  const [multipleOptions, setMultipleOptions] = useState<Array<number>>([]);
  const [question, setQuestion] = useState<IQuestion>(questionsData[questionIndex]);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<ISelectedAnswer>>([]);
  const [selectedValues, setSelectedValues] = useState<Array<ISelectedValues>>([]);

  const handleOption = (selectedOption: number) => {
    setOption(selectedOption);
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
      const answers: Array<IValues> = [];
      const options: Array<number> = [];
      
      multipleOptions.forEach((option) => {
        const returnedData: IValues | IQuestion = question.answers[option - 1].returnedData;

        setSelectedAnswers((prevState) => [...prevState, {
          question: question.name,
          answer: question.answers[option - 1].answer,
        }]);
        
        answers.push(returnedData as IValues);
        options.push(option - 1);
      });
      
      const values: ISelectedValues = {
        index: questionIndex,
        values: answers,
        selectedOption: options,
        silos: updateValuesFromSilos(multipleOptions.length)
      };
      
      if (selectedValues[questionIndex]) {
        const updatedValues = selectedValues;
        updatedValues[questionIndex] = values;
        setSelectedValues([...updatedValues]);
      } else {
        setSelectedValues((prevState) => [...prevState, values]); 
      }
      
      goToNextQuestion();
    } else {
      const returnedData: IValues | IQuestion = question.answers[option].returnedData;

      setSelectedAnswers((prevState) => [...prevState, {
        question: question.name,
        answer: question.answers[option].answer,
      }]);
      
      if ((returnedData as IQuestion).name) {
        setOption(-1);
        setQuestion(returnedData as IQuestion);
      } else {
        const values: ISelectedValues = {
          index: questionIndex,
          selectedOption: option,
          values: returnedData as IValues,
        }

        if (selectedValues[questionIndex]) {
          const updatedValues = selectedValues;
          updatedValues[questionIndex] = values;
          setSelectedValues([...updatedValues]);
        } else {
          setSelectedValues((prevState) => [...prevState, values]); 
        }
        
        goToNextQuestion();
      }
    }
  }

  const goToNextQuestion = () => {
    const nextIndex: number = questionIndex + 1;

    if (questionsData[nextIndex] !== undefined) {
      if (selectedValues[nextIndex]) {
        const { selectedOption } = selectedValues[nextIndex];
        
        if (Array.isArray(selectedOption)) {
          setMultipleOptions(selectedOption);
        } else {
          setOption(selectedOption);
        } 
      } else {
        if (questionsData[nextIndex].multipleAnswer) {
          setMultipleOptions([]);
        } else {
          setOption(-1);
        }
      }
      
      setQuestion(questionsData[nextIndex]);
      setQuestionIndex(nextIndex);
    } else {
      setIsReportReady(true);
    }
  }
  
  const goToPrevQuestion = () => {
    const prevIndex: number = questionIndex - 1;
    const { selectedOption } = selectedValues[prevIndex];
    
    if (Array.isArray(selectedOption)) {
      setMultipleOptions(selectedOption);
    } else {
      setOption(selectedOption);
    }
    
    setQuestion(questionsData[prevIndex]);
    setQuestionIndex(prevIndex);
  }

  const isNextButtonDisabled = (): boolean => {
    return question.multipleAnswer ? multipleOptions.length === 0 : option === -1;
  }
  
  const isBackButtonDisabled = (): boolean => {
    return questionIndex === 0;
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
    option,
    multipleOptions,
    totalQuestions: questionsData.length,
    questionNumber: questionIndex + 1,
    confirmAnswer,
    handleOption,
    handleMultipleOptions,
    handlePrevQuestion: goToPrevQuestion,
    isNextButtonDisabled,
    isBackButtonDisabled,
  }

  if (reportPreview) {
    return <Report 
      selectedAnswers={selectedAnswers} 
      selectedValues={selectedValues}
    />;
  }

  if (isReportReady) {
    return <ReportReadyScreen handleScreen={setReportPreview} />
  }

  return <QuestionsTemplate {...props} />;
}

export default Questions;
