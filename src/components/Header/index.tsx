import React from 'react';
import src from '../../assets/logo.svg';
import classes from './Header.module.scss'

const Header: React.FC = () => (
  <header className={classes.headerContainer}>
    <a href="https://www.pgs-soft.com/" title="PGS Software">
      <img src={src} alt="logo"/>
    </a>
    <span className={classes.title}>ds calc</span>
  </header>
);

export default Header;
