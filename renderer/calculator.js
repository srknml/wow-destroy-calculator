const DeathBlossom = 6.67;
const Marrowroot = 39.88;
const RisingGlory = 38.91;
const VigilTorch = 50;
const Widowbloom = 78.98;
const Nightshade = 45.47;
const LuminousPigment = 99.7;
const UmbralPigment = 623.39;
const TranquilPigment = 950;
const LuminousInk = 51.3;
const UmbralInk = 145.98;
const TranquilInk = 300;
const AeratedWater = 0.5;
const RuneEtchedVial = 1;

const DeathRates = [0.15, 0.14, 0.005];
const MarrowRates = [0.91, 0.204, 0.004];
const RisingRates = [0.202, 0.92, 0.004];
const VigilRates = [0.205, 0.097, 0.004];
const WidowRates = [0.096, 0.194, 0.005];
const NightRates = [0.232, 0.263, 0.305];

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
const GoldperPigment = (1 / Rates[1][1]) * Marrowroot; // DeathBlossom Pigment

console.log(GoldperPigment);
//Rates'i içindeki arrayleri objeye çevirmeyi düşün