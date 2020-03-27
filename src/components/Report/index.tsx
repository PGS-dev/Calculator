import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {IReportProps} from './Report.interface';
import classes from './Report.module.scss';
import reportData from '../../data/report.json';
import { default as imageSrc } from '../../assets/gfx_idea.png';
import { IValues } from '../Questions/Questions.interface';

const Report: React.FC<IReportProps> = ({ selectedValues, selectedAnswers }) => {
  const radius: number = 100;
  const circuit: number = radius * 2 * Math.PI;
  const [strokeDashoffset, setStrokeDashoffset] = useState<number>(circuit);
  const [strokeDasharray, setStrokeDasharray] = useState<number>(circuit);
  const [impactScore, setImpactScore] = useState<number>(0);
  const [division, setDivision]  = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  
  const loadData = () => {
    const values = getValues();
    const { key, division } = getYourDivision(values);
    const explanation = reportData.explanations.find(e => e.title === key)?.desc;
    const suggestions = reportData.suggestions.filter(e => e.titles.some(title => title === key)).map(e => e.name);
    const impactScore = getImpactScore(values); Math.floor((100 / 110) * (values.maturity + values.need));
    
    setCircleProgress(impactScore);
    setImpactScore(impactScore);
    setExplanation(explanation as string);
    setSuggestions(suggestions as Array<string>);
    setDivision(division);
  }
  
  const getImpactScore = ({ maturity, need }: IValues): number => {
    return Math.floor((100 / 110) * ((maturity > 0 ? maturity : 0) + (need > 0 ? need : 0)));
  }
  
  const getValues = (): IValues => {
    let need: number = 0;
    let maturity: number = 0;
    
    selectedValues.forEach(option => {
      if (Array.isArray(option.values)) {
        option.values.forEach(value => {
          need += value.need;
          maturity += value.maturity;
        })
      } else {
        need += option.values.need;
        maturity += option.values.maturity;
      }
      
      if (option.silos) {
        need += option.silos.need;
        maturity += option.silos.maturity;       
      }
    });
    
    return { need, maturity };
  }
  
  const setCircleProgress = (percent: number) => {
    const offset = circuit - percent / 100 * circuit;
    setStrokeDashoffset(offset);
    setStrokeDasharray(circuit);
  }
  
  const getYourDivision = (values: IValues): {key: string, division: string } => {
    const { need, maturity } = values;
    
    if (need < 33 && maturity < 27) {
      return { key: 'no', division: 'not ready' }
    } else if (need < 33 && maturity > 27) {
      return { key: 'maybeLNHM', division: 'ready to apply' }
    } else if (need > 33 && maturity > 27) {
      return { key: 'yes', division: 'demanded' }
    } 
    
    return { key: 'maybeHNLM', division: 'needed' };
  }
  
  useEffect(() => {
    if (strokeDashoffset === circuit) {
      loadData();
    }
  });
  
  return (
    <div className={classes.container}>
      <div className={classNames(classes.row, classes.titleContainer)}>
        <h1>
          Design System in your company
          <p className={classes.subTitle}>is <span>{division}</span></p>
        </h1>
      </div>
      <div className={classes.row}>
        <div>
          <div className={classes.cardsContainer}>
            <p className={classNames(classes.cardNotReady, division === 'not ready' ? classes.active: undefined)}>Not ready.</p>
            <p className={classNames(classes.cardNeeded, division === 'needed' ? classes.active: undefined)}>Needed.</p>
            <p className={classNames(classes.cardReadyToApply, division === 'ready to apply' ? classes.active: undefined)}>Ready to apply.</p>
            <p className={classNames(classes.cardDemanded, division === 'demanded' ? classes.active: undefined)}>Demanded.</p>
          </div>
        </div>
        <div className={classes.centered}>
          <div className={classes.impactScoreContainer}>
            <h2>Impact score</h2>
            <div className={classes.circle}>
              <span>{impactScore}%</span>
              <svg width="240" height="240">
                <circle stroke="#000" strokeWidth="25" fill="transparent" r={radius} cx="120" cy="120"></circle>
                <circle
                  className={classes.circleProgress}
                  style={{
                    strokeDasharray: `${strokeDasharray} ${strokeDasharray}`, 
                    strokeDashoffset: strokeDashoffset,
                  }}
                  stroke="#ff7626" 
                  strokeWidth="25" 
                  fill="transparent" 
                  r={radius} 
                  cx="120" 
                  cy="120"
                ></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.scrollBaner}>
        <h2>Scroll down to get more informations!</h2>
      </div>
      <h2 className={classes.sectionTitle}>Explanation</h2>
      <div className={classes.row}>
        <div>
          <p className={classes.explanation}>{explanation}</p>
        </div>
        <div className={classes.centered}>
          <img src={imageSrc} alt="idea" className={classes.image} />
        </div>
      </div>
      <h2 className={classes.sectionTitle}>Benefits of Design System</h2>
      <ul className={classes.benefitsContainer}>
        {suggestions.map((suggestion, key) => (
          <li key={key}>{suggestion}</li>
        ))}
      </ul>
      <h2 className={classes.sectionTitle}>Your answers</h2>
      <div className={classes.answers}>
        {selectedAnswers.map((data, index) => (
          <p key={index}>{index + 1}. {data.question}: <b>{data.answer}</b></p>
        ))}
      </div>
    </div>
  );
}

export default Report;
