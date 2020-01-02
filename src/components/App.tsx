import React, {useState} from 'react';
import AppTemplate from './App.template';
import IAppProps from './App.interface';

const App: React.FC = () => {
  const [questionsMode, setQuestionsMode] = useState(false);

  const handleSetQuestionsMode = () => {
    setQuestionsMode(true);
  };

  const props: IAppProps = {
    questionsMode,
    handleSetQuestionsMode,
  };

  return <AppTemplate {...props} />;
}

export default App;
