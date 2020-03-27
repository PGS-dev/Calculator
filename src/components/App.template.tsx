import React from 'react';
import Questions from './Questions';
import classes from './App.module.scss'
import IAppProps from './App.interface';
import WelcomeScreen from './Screens/Welcome.template';
import { default as logoSrc } from '../assets/logo.svg';

const AppTemplate: React.FC<IAppProps> = (props) => (
  <div className={classes.mainContainer}>
    <div className={classes.headerContainer}>
      <header className={classes.header}>
        <a href="https://www.pgs-soft.com/" title="PGS Software">
          <img src={logoSrc} alt="logo"/>
        </a>
        <p className={classes.title}>Design System <span>Calculator</span></p>
      </header>
    </div>

    <div className={classes.mainContent}>
      { props.welcomeScreen && <WelcomeScreen handleScreen={props.setWelcomeScreen} />}
      { !props.welcomeScreen && <Questions /> }
    </div>
  </div>
);

export default AppTemplate;
