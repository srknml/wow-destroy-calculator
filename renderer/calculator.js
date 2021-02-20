const DeathRates = [0.15, 0.14, 0.005];
const MarrowRates = [0.091, 0.204, 0.004];
const RisingRates = [0.202, 0.92, 0.004];
const VigilRates = [0.205, 0.097, 0.004];
const WidowRates = [0.096, 0.194, 0.005];
const NightRates = [0.232, 0.263, 0.305];
console.log("calculator çalışıyor");

const Rates = [];

Rates.push(DeathRates);
Rates.push(MarrowRates);
Rates.push(RisingRates);
Rates.push(VigilRates);
Rates.push(WidowRates);
Rates.push(NightRates);

const LIST_OF_GOLD_PER_PIGMENTS = [];

for (let i = 0; i < 6; i++) {
  const Herb = {};
  const name = itemData[i].name;
  const price = itemData[i].price;
  const id = itemData[i].id;
  Herb[id] = [];
  for (let j = 0; j < Rates[i].length; j++) {
    const rate = Rates[i][j];
    let GoldPigment = (1 / rate) * price;
    Herb[id].push(GoldPigment);
  }
  LIST_OF_GOLD_PER_PIGMENTS.push(Herb);
}
console.log(LIST_OF_GOLD_PER_PIGMENTS);

//************************************* */
const minPrices = [];
for (let i = 0; i < LIST_OF_GOLD_PER_PIGMENTS.length; i++) {
  const pigment = LIST_OF_GOLD_PER_PIGMENTS[i][itemData[i].id];
  for (let i = 0; i < pigment.length; i++) {
    const minCost = Math.min(...pigment);
    minPrices.push(minCost)
    console.log(minCost);
  }
}
