import logo from "./logo.svg";
import "./App.css";
import {
  totalAlkalinityAsMgPerLitre,
  totalHardnessAsMgPerLitre,
  pHeq,
  langelierIndex,
  newLangelierIndex,
  maxHardness,
} from "./waterCalcs";

// https://github.com/Martin36/react-gauge-chart

function App() {
  const temp = 125;
  const tds = 122;
  const alkalinity = totalAlkalinityAsMgPerLitre(61);
  const hardness = totalHardnessAsMgPerLitre(20, 6);
  const pH = pHeq(alkalinity);
  const li = langelierIndex(temp, hardness, alkalinity, tds);
  const newLi = newLangelierIndex(temp, hardness, alkalinity);
  const maxHardLT50 = maxHardness(temp, alkalinity);
  const maxHardGT50 = maxHardness(temp, alkalinity, false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Alkalinity: {alkalinity}</p>
        <p>Total Hardness: {hardness}</p>
        <p> pHeq: {pH}</p>
        <p>Langelier Index: {li}</p>
        <p>New Langelier Index: {newLi}</p>
        <p> Max hardness &lt; 50: {maxHardLT50}</p>
        <p> Max hardness &gt; 50: {maxHardGT50}</p>
      </header>
    </div>
  );
}

export default App;
