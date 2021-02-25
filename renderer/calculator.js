const DeathRates = { 169701: [0.15, 0.14, 0.005] };
const MarrowRates = { 168589: [0.091, 0.204, 0.004] };
const RisingRates = { 168586: [0.202, 0.092, 0.004] };
const VigilRates = { 170554: [0.205, 0.097, 0.004] };
const WidowRates = { 168583: [0.096, 0.194, 0.005] };
const NightRates = { 171315: [0.232, 0.263, 0.305] };

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
  const price = itemData[i].price;
  const id = itemData[i].id;

  Herb[id] = [];
  for (let j = 0; j < 3; j++) {
    const rate = Rates[i][id][j];
    let GoldPigment = (1 / rate) * price;
    Herb[id].push(GoldPigment);
  }
  LIST_OF_GOLD_PER_PIGMENTS.push(Herb);
}
console.log(Rates[0][169701][0]);
//************************************* */
const costsForAllPigments = [];

for (let i = 0; i < LIST_OF_GOLD_PER_PIGMENTS.length; i++) {
  const pigment = LIST_OF_GOLD_PER_PIGMENTS[i][itemData[i].id];
  const obj = { id: itemData[i].id };

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
let herbTypes = new Set();
const twoDArr = [];

function shop(i) {
  const currents = findMinCost();

  const requiredValue = requires[i].value;

  //Lum Pigment için
  if (i === 0) {
    //herbin rateini alıcaz
    const gerekenHerbForLum = itemData.find(
      (herb) => herb.id === currents[i].id
    ).id;
    const amountOfHerb =
      (currents[i].lum /
        itemData.find((herb) => herb.id === currents[i].id).price) *
      requiredValue;
    const costAll =
      amountOfHerb * itemData.find((herb) => herb.id === currents[i].id).price;
    // console.log(gerekenHerbForLum,amountOfHerb,costAll);
    herbTypes.add(gerekenHerbForLum);
    twoDArr.push([
      "Lum",
      requiredValue,
      gerekenHerbForLum,
      amountOfHerb,
      costAll,
    ]);
  } else if (i === 1) {
    //herbin rateini alıcaz
    //Umbra Pigment için
    const gerekenHerbForUmb = itemData.find(
      (herb) => herb.id === currents[i].id
    ).id;
    const amountOfHerbforUmb =
      (currents[i].umb /
        itemData.find((herb) => herb.id === currents[i].id).price) *
      requiredValue;
    const costAllforUmb =
      amountOfHerbforUmb *
      itemData.find((herb) => herb.id === currents[i].id).price;
    // console.log(gerekenHerbForUmb, amountOfHerbforUmb,costAllforUmb);
    herbTypes.add(gerekenHerbForUmb);
    twoDArr.push([
      "Umbra",
      requiredValue,
      gerekenHerbForUmb,
      amountOfHerbforUmb,
      costAllforUmb,
    ]);
  } else {
    //Tranquil için
    //herbin rateini alıcaz
    const traNeeded = itemData.find((herb) => herb.id === currents[i].id).id;
    const AmountforTra =
      (currents[i].tra /
        itemData.find((herb) => herb.id === currents[i].id).price) *
      requiredValue;
    const costAllforTra =
      AmountforTra * itemData.find((herb) => herb.id === currents[i].id).price;
    // console.log(traNeeded,AmountforTra,costAllforTra);
    herbTypes.add(traNeeded);
    twoDArr.push([
      "Tra",
      requiredValue,
      traNeeded,
      AmountforTra,
      costAllforTra,
    ]);
  }
  //Gereken Herb Tipi Sayısını Bul ve miktarları
  const y = [[10], [1]];
  //2D arrayi Herb id sine göre sırala              //+++++

  twoDArr.sort(function (a, b) {
    if (b[2] === a[2]) {
    }
    return b[3] - a[3];
  });
  // twoDArr.splice(2,1)     //BUG
  console.log(twoDArr);
  /************************************************************ */
  /************************************************************ */
  //Rateslerin Çarpımına göre ters Matrisini Al+++++++++
  const invertedRates = matrix_invert([
    [NightRates[2], DeathRates[2]],
    [NightRates[1], DeathRates[1]],
  ]);

  let axx = [];
  for (let i = 0; i < twoDArr.length; i++) {
    let id = twoDArr[i][2];
    Rates.forEach((item, ind) => {
      if (item[id] !== undefined) {
        axx.push(item[id]);
      }
    });
  }
  console.log(axx);
  /*********************************************************** */
  /*********************************************************** */

  const iki = multiplyMatrices(invertedRates, y);

  console.log(iki); // Last Herb Amount

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

// Returns the inverse of matrix `M`.
function matrix_invert(M) {
  if (M.length !== M[0].length) {
    return;
  }

  var i = 0,
    ii = 0,
    j = 0,
    dim = M.length,
    e = 0,
    t = 0;
  var I = [],
    C = [];
  for (i = 0; i < dim; i += 1) {
    I[I.length] = [];
    C[C.length] = [];
    for (j = 0; j < dim; j += 1) {
      if (i == j) {
        I[i][j] = 1;
      } else {
        I[i][j] = 0;
      }

      C[i][j] = M[i][j];
    }
  }

  for (i = 0; i < dim; i += 1) {
    e = C[i][i];

    if (e == 0) {
      for (ii = i + 1; ii < dim; ii += 1) {
        if (C[ii][i] != 0) {
          for (j = 0; j < dim; j++) {
            e = C[i][j]; //temp store i'th row
            C[i][j] = C[ii][j]; //replace i'th row by ii'th
            C[ii][j] = e; //repace ii'th by temp
            e = I[i][j]; //temp store i'th row
            I[i][j] = I[ii][j]; //replace i'th row by ii'th
            I[ii][j] = e; //repace ii'th by temp
          }
          break;
        }
      }
      e = C[i][i];
      if (e == 0) {
        return;
      }
    }

    for (j = 0; j < dim; j++) {
      C[i][j] = C[i][j] / e; //apply to original matrix
      I[i][j] = I[i][j] / e; //apply to identity
    }

    for (ii = 0; ii < dim; ii++) {
      if (ii == i) {
        continue;
      }

      e = C[ii][i];
      for (j = 0; j < dim; j++) {
        C[ii][j] -= e * C[i][j]; //apply to original matrix
        I[ii][j] -= e * I[i][j]; //apply to identity
      }
    }
  }

  return I;
}

function multiplyMatrices(m1, m2) {
  var result = [];
  for (var i = 0; i < m1.length; i++) {
    result[i] = [];
    for (var j = 0; j < m2[0].length; j++) {
      var sum = 0;
      for (var k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}
