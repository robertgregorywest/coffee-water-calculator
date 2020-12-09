import { useState } from "react";
import logo from "./logo.svg";
import GaugeChart from "react-gauge-chart";
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
    tds: 150,
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

  const [displayResults, setDisplayResults] = useState(false);

  const [errors, setErrors] = useState({});

  function handleChange({ target }) {
    setWaterData({
      ...waterData,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!waterData.calcium) _errors.calcium = "Calcium is required";
    if (!waterData.magnesium) _errors.magnesium = "Magnesium is required";
    if (!waterData.bicarbonate) _errors.bicarbonate = "Bicarbonate is required";
    if (!waterData.tds) _errors.tds = "TDS is required";
    if (!waterData.temp) _errors.temp = "Temperature is required";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    const hardness = totalHardnessAsMgPerLitre(
      Number(waterData.calcium),
      Number(waterData.magnesium)
    );
    const alkalinity = totalAlkalinityAsMgPerLitre(
      Number(waterData.bicarbonate)
    );
    const pH = pHeq(alkalinity).toFixed(2);
    const li = langelierIndex(
      Number(waterData.temp),
      hardness,
      alkalinity,
      Number(waterData.tds)
    ).toFixed(2);
    const newLi = newLangelierIndex(
      Number(waterData.temp),
      hardness,
      alkalinity
    ).toFixed(2);
    const maxHardLT50 = maxHardness(Number(waterData.temp), alkalinity).toFixed(
      2
    );
    const maxHardGT50 = maxHardness(
      Number(waterData.temp),
      alkalinity,
      false
    ).toFixed(2);

    setScalingData({
      hardness: hardness.toFixed(2),
      alkalinity: alkalinity.toFixed(2),
      pH,
      li,
      newLi,
      maxHardLT50,
      maxHardGT50,
    });

    setDisplayResults(true);
  }

  function getPercentage(li) {
    // assuming a scale of -5 to + 5
    // https://www.cleanwaterstore.com/resource/calculators/langlier/
    return (Number(li) + 5) / 10;
  }

  function getDescription(li) {
    if (li <= -5) {
      return "Severe corrosion";
    } else if (li <= -2) {
      return "Moderate corrosion";
    } else if (li <= -0.5) {
      return "Mild corrosion";
    } else if (li <= 0.5) {
      return "No scaling";
    } else if (li < 1) {
      return "Some faint scaling";
    } else if (li < 2) {
      return "Mild scaling";
    } else if (li < 4) {
      return "Moderate scaling";
    } else {
      return "Severe scaling";
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Coffee Scaling Calculator</h1>
      </header>
      <section>
        <EntryForm
          waterData={waterData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </section>

      <section className={`scaling-data${displayResults ? `` : ` no-display`}`}>
        <p>Total Hardness: {scalingData.hardness} (aim for 17-85mg/L)</p>
        <p>Alkalinity: {scalingData.alkalinity} (aim for close to 40mg/L)</p>

        <p> pH: {scalingData.pH} (aim for 6.5-7.5)</p>
        {/* <p>Langelier Index: {scalingData.li}</p>
        <p>New Langelier Index: {scalingData.newLi} </p> */}

        <div className="gauge">
          <GaugeChart
            id="gauge-scaling"
            nrOfLevels={5}
            percent={getPercentage(scalingData.newLi)}
            hideText
            colors={["#ff0000", "#ff8f08", "#18c210", "#ff8f08", "#ff0000"]}
          />
        </div>

        <p>{getDescription(scalingData.newLi)}</p>

        {/* <p> Max hardness &lt; 50: {scalingData.maxHardLT50}</p>
        <p> Max hardness &gt; 50: {scalingData.maxHardGT50}</p>
        <p>
          Maximum permissible hardness at the defined temperature and alkalinity
          before scaling occurs.
        </p> */}
      </section>
    </div>
  );
}

export default App;
