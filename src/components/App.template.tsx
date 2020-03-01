import React from 'react';
import classNames from 'classnames';
import Questions from './Questions';
import classes from './App.module.scss'
import IAppProps from './App.interface';
import { default as guiClass } from '../styles/classes.module.scss';
import { default as logoSrc } from '../assets/logo.svg';
import { default as blocksSrc } from '../assets/gfx_blocks.png';

const AppTemplate: React.FC<IAppProps> = (props) => (
  <div className={classes.mainContainer}>
    <header className={classes.headerContainer}>
      <a href="https://www.pgs-soft.com/" title="PGS Software">
        <img src={logoSrc} alt="logo"/>
      </a>
      <p className={classes.title}>Design System <span>Calculator</span></p>
    </header>

    <div className={classes.mainContent}>
      {
        props.welcomeScreen &&
        <div className={classes.helloMessage}>
          <div>
            <h1>Is Design System worth it?<span>Is it suitable for you?</span></h1>
            <button 
              onClick={() => props.setWelcomeScreen(false)} 
              className={classNames(guiClass.button, guiClass.primary)}
            >
              Find Out
            </button>
          </div>
          <img src={blocksSrc} alt=""/>
        </div>
      }
      { !props.welcomeScreen && <Questions /> }
    </div>
  </div>
);

export default AppTemplate;
