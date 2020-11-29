import LandingPageContainer from './modules/landing-page/containers/LandingPageContainer';
import './Styles/App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Upload a GCODE file</h1>
      <LandingPageContainer />

    </div>
  );
}

export default App;
