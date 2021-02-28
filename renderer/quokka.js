const itemData = [
  { id: 169701, name: "DeathBlossom", price: 4.9 },
  { id: 168589, name: "Marrowroot", price: 51.93 },
  { id: 168586, name: "Rising Glory", price: 26 },
  { id: 170554, name: "Vigil's Torch", price: 47 },
  { id: 168583, name: "Widowbloom", price: 49.99 },
  { id: 171315, name: "Nightshade", price: 37.69 },
  { id: 173057, name: "Luminous Pigment", price: 88.69 },
  { id: 173056, name: "Umbral Pigment", price: 592.18 },
  { id: 175788, name: "Tranquil Pigment", price: 1600 },
  { id: 173059, name: "Luminous Ink", price: 50.05 },
  { id: 173058, name: "Umbral Ink", price: 199.75 },
  { id: 175970, name: "Tranquil Ink", price: 250 },
  { id: 1, name: "Aerated Water", price: "0.5" },
  { id: 2, name: "Rune Etched Vial", price: "1" },
];
const DeathRates = {
  169701: itemData[0].name,
  rates: [{ 0: 0.15 }, { 1: 0.14 }, { 2: 0.005 }],
};
const MarrowRates = {
  168589: itemData[1].name,
  rates: [{ 0: 0.091 }, { 1: 0.204 }, { 2: 0.004 }],
};
const RisingRates = {
  168586: itemData[2].name,
  rates: [{ 0: 0.202 }, { 1: 0.092 }, { 2: 0.004 }],
};
const VigilRates = {
  170554: itemData[3].name,
  rates: [{ 0: 0.205 }, { 1: 0.097 }, { 2: 0.004 }],
};
const WidowRates = {
  168583: itemData[4].name,
  rates: [{ 0: 0.096 }, { 1: 0.194 }, { 2: 0.005 }],
};
const NightRates = {
  171315: itemData[5].name,
  rates: [{ 0: 0.232 }, { 1: 0.263 }, { 2: 0.305 }],
};

const Rates = [];

Rates.push(DeathRates);
Rates.push(MarrowRates);
Rates.push(RisingRates);
Rates.push(VigilRates);
Rates.push(WidowRates);
Rates.push(NightRates);

const asd = [];
for (let i = 0; i < Rates.length; i++) {
  const price = itemData[i].price;
  const id = itemData[i].id;
  const Herb = {};
  Herb[id] = [];
  for (let j = 0; j < 3; j++) {
    const rate = Rates[i].rates[j][j];
    const GoldPigment = (1 / rate) * price;
    Herb[id].push(GoldPigment);
  }

  const lum = Herb[id][0];
  const umb = Herb[id][1];
  const tra = Herb[id][2];

  asd[i] = { id, lum, umb, tra };

}

function findMinCost() {
  let minCostsPerPigment = [];
  let minCostForLum = asd.reduce((prev, curr) =>
    prev.lum < curr.lum ? prev : curr
  );
  let minCostForUmb = asd.reduce((prev, curr) =>
    prev.umb < curr.umb ? prev : curr
  );
  let minCostForTra = asd.reduce((prev, curr) =>
    prev.tra < curr.tra ? prev : curr
  );

  minCostsPerPigment.push(minCostForLum);
  minCostsPerPigment.push(minCostForUmb);
  minCostsPerPigment.push(minCostForTra);

  return minCostsPerPigment;
}
const currents = findMinCost();
console.log(currents);
