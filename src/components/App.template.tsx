import React from 'react';
import Header from './Header';
import Questions from './Questions';
import classes from './App.module.scss'
import IAppProps from './App.interface';

const AppTemplate: React.FC<IAppProps> = (props) => (
  <div className={classes.mainContainer}>
    <Header />
    <div className={classes.mainContent}>
      {
        !props.questionsMode &&
        <div className={classes.helloMessage}>
          <h1>Is Design System worth it? Is it suitable for you?</h1>
          <button onClick={() => props.handleSetQuestionsMode()}>Find Out!</button>
        </div>
      }
      { props.questionsMode && <Questions /> }
    </div>
  </div>
);

export default AppTemplate;
