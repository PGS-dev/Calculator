import React from 'react';
import classNames from 'classnames';
import classes from './../App.module.scss'
import { default as guiClass } from '../../styles/classes.module.scss';
import { default as blocksSrc } from '../../assets/gfx_bulb.png';

const ReportReadyScreen: React.FC<{
  handleScreen: Function,
}> = ({ handleScreen }) => (
  <div className={classes.helloMessage}>
    <div>
      <h1>
        Maturity vs Need
        <p className={classes.subTitle}>You are...<span>Ready!</span></p>
      </h1>
      <button 
        onClick={() => handleScreen(true)} 
        className={classNames(guiClass.button, guiClass.primary)}
      >
        Read the Report
      </button>
    </div>
    <img src={blocksSrc} alt=""/>
  </div>
);

export default ReportReadyScreen;
