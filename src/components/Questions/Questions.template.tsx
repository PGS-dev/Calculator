import React, { useEffect, useState } from 'react';
import classes from './Questions.module.scss';
import IQuestionsProps from './Questions.interface';
import classNames from 'classnames';

import { default as guiClass } from '../../styles/classes.module.scss';
import { default as bigCloudSrc } from '../../assets/cloud_big.png';
import { default as smallCloudPrimarySrc } from '../../assets/cloud_small_a.png';
import { default as smallCloudSecondarySrc } from '../../assets/cloud_small_b.png';

const AnswerTemplate: React.FC<{
  index: number,
  isActive: boolean,
  handleOptions: Function,
  answer: string
}> = ({
  index,
  isActive,
  handleOptions,
  answer
}) => (
  <span
    onClick={() => handleOptions(index)}
    className={
      classNames(
        classes.answer,
        isActive ? classes.active : null,
      )
    }
  >
    {answer}
  </span>
);

const TitleImage: React.FC<{ questionNumber: number }> = ({ questionNumber }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const images = [
    { src: bigCloudSrc, pos: classes.bigCloudPos }, 
    { src: smallCloudPrimarySrc, pos: classes.smallCloudPos },
    { src: smallCloudSecondarySrc, pos: classes.smallCloudPosLeft },
  ];
  
  useEffect(() =>{
    setImageIndex(Math.floor(Math.random() * 3));
  }, [questionNumber]);

  return <img className={classNames(classes.cloudImg, images[imageIndex].pos)} src={images[imageIndex].src} alt="" />;
}

const QuestionsTemplate: React.FC<IQuestionsProps> = ({
  question,
  option,
  totalQuestions,
  questionNumber,
  multipleOptions,
  confirmAnswer,
  handleOption,
  handleMultipleOptions,
  handlePrevQuestion,
  isNextButtonDisabled,
  isBackButtonDisabled,
}) => (
  <div className={classes.question}>
    <h2 className={classes.title}>
      <span>{question.name}</span>
      <TitleImage questionNumber={questionNumber} />
    </h2>
    <div className={classNames(classes.answerContainer, question.multipleAnswer ? classes.twoColumns : undefined)}>
      {question.rangeAnswer &&
        <div className={classes.rangeAnswer}>
          <input
            onClick={(e) => { e.persist(); return handleOption(e.currentTarget.value)}}
            type="range" 
            min="0" 
            max={question.answers.length - 1}
            step="1"
          />
          <div className={classes.rangeLabels}>
            {question.answers.map(({ answer }, key) =>
              <span key={key}>{answer}</span>
            )}
          </div>
        </div>
      }
      {!question.rangeAnswer && !question.multipleAnswer && question.answers.map(({ answer }, key) =>
        <AnswerTemplate
          key={key}
          index={key}
          answer={answer}
          isActive={option === key}
          handleOptions={handleOption}
        />
      )}
      {!question.rangeAnswer && question.multipleAnswer && question.answers.map(({ answer }, key) =>
        <AnswerTemplate
          key={key}
          index={key + 1}
          answer={answer}
          isActive={multipleOptions.some((option) => option === key + 1)}
          handleOptions={handleMultipleOptions}
        />
      )}
    </div>
    
    {question.multipleAnswer && <p className={classes.greyedLabel}>You can choose many*</p>}
    <div className={classes.buttonsContainer}>
      <button 
        className={classNames(guiClass.button, guiClass.primary)}
        disabled={isBackButtonDisabled()} 
        onClick={() => handlePrevQuestion()}
      >
        back
      </button>
      <button 
        className={classNames(guiClass.button, guiClass.primary)}
        disabled={question.rangeAnswer ? false : isNextButtonDisabled()} 
        onClick={() => confirmAnswer()}
      >
        next
      </button>
    </div>
    <p className={classes.greyedLabel}>question {questionNumber} of {totalQuestions}</p>
  </div>
);

export default QuestionsTemplate;
