const DeathRates = [0.15, 0.14, 0.005];
const MarrowRates = [0.091, 0.204, 0.004];
const RisingRates = [0.202, 0.092, 0.004];
const VigilRates = [0.205, 0.097, 0.004];
const WidowRates = [0.096, 0.194, 0.005];
const NightRates = [0.232, 0.263, 0.305];

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

//************************************* */
const costsForAllPigments = [];

for (let i = 0; i < LIST_OF_GOLD_PER_PIGMENTS.length; i++) {
  const pigment = LIST_OF_GOLD_PER_PIGMENTS[i][itemData[i].id];
  const obj = { id: itemData[i].id };
  const obj2 = { id: itemData[i].id };

  obj.lum = pigment[0];
  obj.umb = pigment[1];
  obj.tra = pigment[2];
  costsForAllPigments.push(obj);
}
function findMinCost() {
  let minCostsPerPigment = [];
  let minCostForLum = costsForAllPigments.reduce((prev, curr) =>
    prev.lum < curr.lum ? prev : curr
  );
  let minCostForUmb = costsForAllPigments.reduce((prev, curr) =>
    prev.umb < curr.umb ? prev : curr
  );
  let minCostForTra = costsForAllPigments.reduce((prev, curr) =>
    prev.tra < curr.tra ? prev : curr
  );

  minCostsPerPigment.push(minCostForLum);
  minCostsPerPigment.push(minCostForUmb);
  minCostsPerPigment.push(minCostForTra);

  return minCostsPerPigment;
}

const requires = document.querySelectorAll(
  ".required-section > .items > input "
);

const shoppingSec = document.querySelectorAll(
  ".shopping-section > .items > .item-name"
);





// Amount ve Cost Hesaplamaları Yapılacak

function shop(i) {
  const currents = findMinCost();
  console.log(currents);

  //TERS MATRIS GEREKIYOR:..............
  
  //Lum Pigment için
  if(i === 0){
    const gerekenHerbForLum = itemData.find((herb) => herb.id === currents[i].id).name
    const amountOfHerb =  currents[i].lum /itemData.find((herb) => herb.id === currents[i].id).price 
    const costAll = amountOfHerb * itemData.find((herb) => herb.id === currents[i].id).price
    console.log(gerekenHerbForLum,amountOfHerb,costAll);
  }
  else if(i === 1){
    
  //Umbra Pigment için
    const gerekenHerbForUmb = itemData.find((herb) => herb.id === currents[i].id).name
    const amountOfHerbforUmb =  currents[i].umb /itemData.find((herb) => herb.id === currents[i].id).price 
    const costAllforUmb = amountOfHerbforUmb * itemData.find((herb) => herb.id === currents[i].id).price
    console.log(gerekenHerbForUmb, amountOfHerbforUmb,costAllforUmb);
  }
  else {
      //Tranquil için
  const traNeeded = itemData.find((herb) => herb.id === currents[i].id).name
  const AmountforTra = currents[i].tra /itemData.find((herb) => herb.id === currents[i].id).price
  const costAllforTra = AmountforTra * itemData.find((herb) => herb.id === currents[i].id).price
  console.log(traNeeded,AmountforTra,costAllforTra);
  }



  const requiredValue = requires[i].value;
  if (requiredValue > 0) {
    const herbName = itemData.find((herb) => herb.id === currents[i].id).name;

    if (shoppingSec[1].innerText === "Test") {
      shoppingSec[1].innerText = herbName;
    }

    if (herbName !== shoppingSec[1].innerText) {
      shoppingSec[2].innerText = herbName;
    }
  }
}








//Total Sections
const t1 = document.querySelectorAll("#totalcost-1 > .items > .item-price");
const t2 = document.querySelectorAll("#totalcost-2 > .items > .item-price");
const t3 = document.querySelectorAll("#totalcost-3 > .items > .item-price");
function millingCost() {
  let xx = [];
  const currents = findMinCost();
  xx.push(currents[0].lum);
  xx.push(currents[1].umb);
  xx.push(currents[2].tra);
  let total = 0;
  for (let i = 0; i < t1.length - 1; i++) {
    const requiredValue = requires[i].value;
    t1[i].innerText = Number(
      ((parseInt(xx[i] * 100 + 1.5 * 100) / 100) * requiredValue).toFixed(2)
    );
    total += parseInt(t1[i].innerText * 100) / 100;
  }
  t1[3].innerText = Number(total.toFixed(2));
}
function setTotalCosts(t) {
  let total = 0;
  for (let i = 0; i < t.length - 1; i++) {
    const requiredValue = requires[i].value;
    if (t === t2) {
      t[i].innerText = Number(
        (
          (parseInt(itemData[i + 6].price * 100 + 1.5 * 100) / 100) *
          requiredValue
        ).toFixed(2)
      );
      total += parseInt(t[i].innerText * 100) / 100;
    } else if (t === t3) {
      t[i].innerText = Number(
        ((parseInt(itemData[i + 9].price * 100) / 100) * requiredValue).toFixed(
          2
        )
      );
      total += parseInt(t[i].innerText * 100) / 100;
    }
  }
  t[3].innerText = Number(total.toFixed(2));
}

for (let i = 0; i < requires.length; i++) {
  requires[i].addEventListener("change", () => {
    setTotalCosts(t2);
    setTotalCosts(t3);
    millingCost();
    shop(i);
  });
}

