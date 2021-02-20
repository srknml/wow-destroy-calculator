const DeathRates = [0.15, 0.14, 0.005];
const MarrowRates = [0.91, 0.204, 0.004];
const RisingRates = [0.202, 0.92, 0.004];
const VigilRates = [0.205, 0.097, 0.004];
const WidowRates = [0.096, 0.194, 0.005];
const NightRates = [0.232, 0.263, 0.305];
console.log("calculator çalışıyor");
/**
 * Herbler için 1. index
 * Pigmentler için 2. index
 * Herb Sırası Death-Marrow-Rising-Vigil-Widow-Night
 * Pigment Sırası Lum-Umb-Tra
 **/

const Rates = [];

Rates.push(DeathRates);
Rates.push(MarrowRates);
Rates.push(RisingRates);
Rates.push(VigilRates);
Rates.push(WidowRates);
Rates.push(NightRates);

const goldperPigment = {};

for (let i = 0; i < 6; i++) {
  const name = itemData[i].name;
  const price = itemData[i].price;
  goldperPigment[name] = [];
  for (let j = 0; j < Rates[i].length; j++) {
    const rate = Rates[i][j];
    let GoldPigment = (1 / rate) * price;
    goldperPigment[name].push(GoldPigment);
  }
}

console.log(goldperPigment);
//Rates'i içindeki arrayleri objeye çevirmeyi düşün
