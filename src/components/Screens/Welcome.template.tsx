import React from 'react';
import classNames from 'classnames';
import classes from './../App.module.scss'
import { default as guiClass } from '../../styles/classes.module.scss';
import { default as blocksSrc } from '../../assets/gfx_blocks.png';

const WelcomeScreen: React.FC<{
  handleScreen: Function,
}> = ({ handleScreen }) => (
  <div className={classes.helloMessage}>
    <div>
      <h1>
        Is Design System worth it?
        <p className={classes.subTitle}>Is it suitable for you?</p>
      </h1>
      <button 
          onClick={() => handleScreen(false)} 
          className={classNames(guiClass.button, guiClass.primary)}
      >
          Find Out
      </button>
    </div>
    <img src={blocksSrc} alt=""/>
  </div>
);

export default WelcomeScreen;
