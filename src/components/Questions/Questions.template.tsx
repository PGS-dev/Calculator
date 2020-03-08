import React, { useRef } from 'react';
import classes from './Questions.module.scss';
import IQuestionsProps from './Questions.interface';
import classNames from 'classnames';

import { default as guiClass } from '../../styles/classes.module.scss';
import { default as bigCloudSrc } from '../../assets/cloud_big.png';
import { default as smallCloudPrimarySrc } from '../../assets/cloud_small_a.png';
import { default as smallCloudSecondarySrc } from '../../assets/cloud_small_b.png';

const AnswerTemplate: React.FC<{
  index: number,
  className: string,
  handleOptions: Function,
  answer: string
}> = ({
  index,
  className,
  handleOptions,
  answer
}) => (
  <span
    onClick={() => handleOptions(index)}
    className={className}
  >
    {answer}
  </span>
);

const TitleImage: React.FC<{ multipleAnswer?: boolean }> = ({ multipleAnswer = false }) => {
  const images = [
    { src: bigCloudSrc, pos: classes.bigCloudPos }, 
    { src: smallCloudPrimarySrc, pos: classes.smallCloudPos },
    { src: smallCloudSecondarySrc, pos: classes.smallCloudPosLeft },
  ];
  const selectedImage = !multipleAnswer ? images[Math.floor(Math.random() * images.length)] : images[1];

  return <img className={classNames(classes.cloudImg, selectedImage.pos)} src={selectedImage.src} alt="" />;
}

const QuestionsTemplate: React.FC<IQuestionsProps> = ({
  question,
  multipleOptions,
  confirmAnswer,
  handleOption,
  handleMultipleOptions,
  isButtonDisabled,
}) => {
  const inputRef: any = useRef();

  return (
    <div className={classes.question}>
      <h2 className={classes.title}>
        <span>{question.name}</span>
        <TitleImage multipleAnswer={question.multipleAnswer} />
      </h2>
      <div className={classes.answerContainer}>
        {question.rangeAnswer &&
          <div className={classes.rangeAnswer}>
            <input
              ref={inputRef}
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
            className={classes.answer}
            handleOptions={handleOption}
          />
        )}
        {!question.rangeAnswer && question.multipleAnswer && question.answers.map(({ answer }, key) =>
          <AnswerTemplate
            key={key}
            index={key + 1}
            answer={answer}
            className={
              classNames(
                classes.answer,
                multipleOptions.find((option) => option === key + 1) ? classes.active : null,
              )
            }
            handleOptions={handleMultipleOptions}
          />
        )}
      </div>
      {
        question.multipleAnswer && 
        <>
          <p className={classes.greyedLabel}>You can choose many*</p>
          <button 
            className={classNames(guiClass.button, guiClass.primary)}
            disabled={isButtonDisabled()} 
            onClick={() => confirmAnswer()}
          >
            next
          </button>
        </>
      }
      {
        question.rangeAnswer && 
        <button 
          className={classNames(guiClass.button, guiClass.primary)}
          onClick={() => handleOption(inputRef.current.value)}
        >
          next
        </button>
      }
    </div>
  );
};

export default QuestionsTemplate;
