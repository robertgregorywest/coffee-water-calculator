import { useState } from "react";
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
import EntryForm from "./components/EntryForm";

// https://github.com/Martin36/react-gauge-chart

function App() {
  const [waterData, setWaterData] = useState({
    calcium: 26,
    magnesium: 6,
    bicarbonate: 61,
    tds: 101,
    temp: 125,
  });

  const [scalingData, setScalingData] = useState({
    hardness: 0,
    alkalinity: 0,
    pH: 0,
    li: 0,
    newLi: 0,
    maxHardLT50: 0,
    maxHardGT50: 0,
  });

  const [errors, setErrors] = useState({});

  function handleChange({ target }) {
    setWaterData({
      ...waterData,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};
    if (!waterData.calcium) _errors.title = "Calcium is required";
    if (!waterData.magnesium) _errors.category = "Magnesium is required";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    const hardness = totalHardnessAsMgPerLitre(
      waterData.calcium,
      waterData.magnesium
    );
    const alkalinity = totalAlkalinityAsMgPerLitre(waterData.bicarbonate);
    const pH = pHeq(alkalinity);
    const li = langelierIndex(
      waterData.temp,
      hardness,
      alkalinity,
      waterData.tds
    );
    const newLi = newLangelierIndex(waterData.temp, hardness, alkalinity);
    const maxHardLT50 = maxHardness(waterData.temp, alkalinity);
    const maxHardGT50 = maxHardness(waterData.temp, alkalinity, false);

    setScalingData({
      hardness,
      alkalinity,
      pH,
      li,
      newLi,
      maxHardLT50,
      maxHardGT50,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section>
        <EntryForm
          waterData={waterData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </section>

      <section>
        <p>Total Hardness: {scalingData.hardness}</p>
        <p>
          Alkalinity: {scalingData.alkalinity} {waterData.temp}
        </p>

        <p> pHeq: {scalingData.pH}</p>
        <p>Langelier Index: {scalingData.li}</p>
        <p>
          New Langelier Index: {scalingData.newLi} (A positive number indicates
          scaling potential; A negative number indicates corrosion potential.)
        </p>

        <p> Max hardness &lt; 50: {scalingData.maxHardLT50}</p>
        <p> Max hardness &gt; 50: {scalingData.maxHardGT50}</p>
        <p>
          Maximum permissible hardness at the defined temperature and alkalinity
          before scaling occurs.
        </p>
      </section>
    </div>
  );
}

export default App;
