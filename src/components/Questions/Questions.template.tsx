import React from 'react';
import classes from './Questions.module.scss';
import IQuestionsProps from './Questions.interface';
import classNames from 'classnames';

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

const QuestionsTemplate: React.FC<IQuestionsProps> = ({
  question,
  option,
  multipleOptions,
  confirmAnswer,
  handleOption,
  handleMultipleOptions,
  isButtonDisabled,
}) => (
  <div className={classes.question}>
    <h2 className={classes.title}>{question.name}</h2>
    <div className={classes.answerContainer}>
      {!question.multipleAnswer && question.answers.map(({ answer }, key) =>
        <AnswerTemplate
          key={key}
          index={key}
          answer={answer}
          className={classNames(classes.answer, key === option ? classes.active : null)}
          handleOptions={handleOption}
        />
      )}
      {question.multipleAnswer && question.answers.map(({ answer }, key) =>
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
    <button className={classes.button} disabled={isButtonDisabled()} onClick={() => confirmAnswer()}>next</button>
  </div>
);

export default QuestionsTemplate;
