import React from 'react';
import {IReportProps} from './Report.interface';
import classes from './Report.module.scss';
import classNames from 'classnames';

const Report: React.FC<IReportProps> = ({ maturity, need, selectedAnswers }) => (
  <div className={classes.container}>
    <div className={classNames(classes.row, classes.titleContainer)}>
      <div>
        <h1>
          Raport
          <p className={classes.subTitle}>Dojrzały procesowo</p>
        </h1>
      </div>
      <div>
        <p className={classes.subTitle}>Odpowiedzi na pytania</p>
      </div>
    </div>
    <div className={classes.row}>
      <div>
        <div className={classes.chartContainer}>
          <div className={classes.chart}>
            <span
              className={classes.yourPosition}
              style={{bottom: `${maturity}px`, left: `${need}px`}}
            ></span>
            <span className={classNames(classes.label, classes.c)}>c</span>
            <span className={classNames(classes.label, classes.d)}>d</span>
            <span className={classNames(classes.label, classes.a)}>a</span>
            <span className={classNames(classes.label, classes.b)}>b</span>
            <span className={classes.curvedLine}></span>
          </div>
        </div>
      </div>
      <div>
        <div className={classes.answers}>
          {selectedAnswers.map((data, index) => (
            <p key={index}>{index + 1}. {data.question}: <b>{data.answer}</b></p>
          ))}
        </div>
      </div>
    </div>
    {/* <div className={classes.informationContainer}>
      <div className={classes.column}>
        <h2>A: Nie potrzebuje lub nie jest gotowy</h2>
        <ul>
          <li>Za mała firma (za mały zespół IT)</li>
          <li>Brak dojrzałości procesowej</li>
          <li>Brak potrzeby spójności w projektach</li>
          <li>Krótki czas trwania projektów</li>
          <li>Niedoświadczony zespół</li>
        </ul>
      </div>
      <div className={classes.column}>
        <h2>B: Potrzebuje ale nie jest gotowy</h2>
        <ul>
          <li>Brak dojrzałości procesowej</li>
          <li>Brak doświadczonego zespołu</li>
          <li>Długi czas trwania projektów</li>
          <li>Niedoświadczony zespół</li>
        </ul>
      </div>
      <div className={classes.column}>
        <h2>C: Jest gotowy ale nie widzi potrzeby</h2>
        <ul>
          <li>Doświadczony zespół i procesy</li>
          <li>Nie patrzy na UX i spójność</li>
        </ul>
      </div>
      <div className={classes.column}>
        <h2>D: Dojrzały procesowo</h2>
        <ul>
          <li>Niezaspokojona potrzeba spójności</li>
          <li>Projekty długotrwałe</li>
          <li>Doświadczony zespół</li>
        </ul>
      </div>
    </div> */}
  </div>
);

export default Report;
