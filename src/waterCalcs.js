const caCO3GramEquivalent = 100.09 / 2;

export function totalAlkalinityAsMgPerLitre(
  bicarbonateMgl,
  carbonateMgl = 0,
  hydroxideMgl = 0,
  citrateMgl = 0
) {
  const totalEquivalent =
    bicarbonateAlkalinity(bicarbonateMgl) +
    carbonateAlkalinity(carbonateMgl) +
    hydroxideAlkalinity(hydroxideMgl) +
    citrateAlkalinity(citrateMgl);
  const totalAsCaCO3 = totalEquivalent * caCO3GramEquivalent;
  return totalAsCaCO3 * 1000;
}

function bicarbonateAlkalinity(bicarbonateMgl) {
  const bicarbonateGramEquivalent = 61.017;
  return bicarbonateMgl / 1000 / bicarbonateGramEquivalent;
}

function carbonateAlkalinity(carbonateMgl) {
  const carbonateGramEquivalent = 60.009 / 2;
  return carbonateMgl / 1000 / carbonateGramEquivalent;
}

function hydroxideAlkalinity(hydroxidrMgl) {
  const hydroxideGramEquivalent = 17.007;
  return hydroxidrMgl / 1000 / hydroxideGramEquivalent;
}

function citrateAlkalinity(citrateMgl) {
  const citrateMglGramEquivalent = 189.1 / 3;
  return citrateMgl / 1000 / citrateMglGramEquivalent;
}

export function totalHardnessAsMgPerLitre(calcium, magnesium) {
  return calciumHardness(calcium) + magnesiumHardness(magnesium);
}

const gPerMolCaCO3 = 100.09;

function calciumHardness(calcium) {
  const gPerMol = 40.08;
  const ratio = gPerMolCaCO3 / gPerMol;
  return calcium * ratio;
}

function magnesiumHardness(magnesium) {
  const gPerMol = 24.305;
  const ratio = gPerMolCaCO3 / gPerMol;
  return magnesium * ratio;
}

export function pHeq(alkalinity) {
  return 1.465 * Math.log10(alkalinity) + 4.54;
}

export function langelierIndex(temp, hardness, alkalinity, tds) {
  return (
    pHeq(alkalinity) +
    13.12 * Math.log10(temp + 273) +
    Math.log10(hardness) +
    Math.log10(alkalinity) -
    Math.log10(tds) / 10 -
    44.15
  );
}

export function newLangelierIndex(temp, hardness, alkalinity) {
  return (
    13.12 * Math.log10(temp + 273) +
    Math.log10(hardness) +
    2.465 * Math.log10(alkalinity) -
    Math.log10(Math.max(hardness, alkalinity)) / 10 -
    39.61
  );
}

export function maxHardness(temp, alkalinity, lessThan50 = true) {
  return lessThan50
    ? Math.pow(
        10,
        44.01 - 14.58 * Math.log10(temp + 273) - 2.739 * Math.log10(alkalinity)
      )
    : Math.pow(
        10,
        39.61 - 13.12 * Math.log10(temp + 273) - 2.365 * Math.log10(alkalinity)
      );
}
