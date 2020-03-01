import React from 'react';
import Questions from './Questions';
import classes from './App.module.scss'
import IAppProps from './App.interface';
import src from '../assets/logo.svg';

const AppTemplate: React.FC<IAppProps> = (props) => (
  <div className={classes.mainContainer}>
    <header className={classes.headerContainer}>
      <a href="https://www.pgs-soft.com/" title="PGS Software">
        <img src={src} alt="logo"/>
      </a>
      <p className={classes.title}>Design System <span>Calculator</span></p>
    </header>

    <div className={classes.mainContent}>
      {
        props.welcomeScreen &&
        <div className={classes.helloMessage}>
          <h1>Is Design System worth it? Is it suitable for you?</h1>
          <button onClick={() => props.setWelcomeScreen(false)} className={classes.buttonPrimary}>Find Out!</button>
        </div>
      }
      { !props.welcomeScreen && <Questions /> }
    </div>
  </div>
);

export default AppTemplate;
