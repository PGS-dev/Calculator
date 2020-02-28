import React, {useState} from 'react';
import AppTemplate from './App.template';
import IAppProps from './App.interface';

const App: React.FC = () => {
  const [welcomeScreen, setWelcomeScreen] = useState(true);

  const props: IAppProps = {
    welcomeScreen,
    setWelcomeScreen,
  };

  return <AppTemplate {...props} />;
}

export default App;
