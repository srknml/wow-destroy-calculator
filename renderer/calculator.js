const DeathRates = { 169701: { 0: 0.15, 1: 0.14, 2: 0.005 } };
const MarrowRates = { 168589: { 0: 0.091, 1: 0.204, 2: 0.004 } };
const RisingRates = { 168586: { 0: 0.202, 1: 0.092, 2: 0.004 } };
const VigilRates = { 170554: { 0: 0.205, 1: 0.097, 2: 0.004 } };
const WidowRates = { 168583: { 0: 0.096, 1: 0.194, 2: 0.005 } };
const NightRates = { 171315: { 0: 0.232, 1: 0.263, 2: 0.305 } };
const Rates = [];

Rates.push(DeathRates);
Rates.push(MarrowRates);
Rates.push(RisingRates);
Rates.push(VigilRates);
Rates.push(WidowRates);
Rates.push(NightRates);

const LIST_OF_GOLD_PER_PIGMENTS = [];

for (let i = 0; i < 6; i++) {
  const price = itemData[i].price;
  const id = itemData[i].id;
  const Herb = {};
  Herb[id] = [];
  for (let j = 0; j < 3; j++) {
    const rate = Rates[i][id][j];
    const GoldPigment = (1 / rate) * price;
    Herb[id].push(GoldPigment);
  }

  LIST_OF_GOLD_PER_PIGMENTS.push(Herb);
}
//************************************* */
const costsForAllPigments = [];

for (let i = 0; i < LIST_OF_GOLD_PER_PIGMENTS.length; i++) {
  const pigment = LIST_OF_GOLD_PER_PIGMENTS[i][itemData[i].id];
  const obj = { id: itemData[i].id };

  obj[0] = pigment[0];
  obj[1] = pigment[1];
  obj[2] = pigment[2];
  costsForAllPigments.push(obj);
}

console.log(costsForAllPigments);
function findMinCost() {
  let minCostsPerPigment = [];
  let minCostForLum = costsForAllPigments.reduce((prev, curr) =>
    prev[0] < curr[0] ? prev : curr
  );
  let minCostForUmb = costsForAllPigments.reduce((prev, curr) =>
    prev[1] < curr[1] ? prev : curr
  );
  let minCostForTra = costsForAllPigments.reduce((prev, curr) =>
    prev[2] < curr[2] ? prev : curr
  );

  minCostsPerPigment.push(minCostForLum);
  minCostsPerPigment.push(minCostForUmb);
  minCostsPerPigment.push(minCostForTra);

  return minCostsPerPigment;
}
const currents = findMinCost();

const requires = document.querySelectorAll(
  ".required-section > .items > input "
);

const shoppingSec = document.querySelectorAll(
  ".shopping-section > .items > .item-name"
);

const twoDArrx = {};

function shop(i) {
  const requiredValue = requires[i].value;

  const herbID = itemData.find((herb) => herb.id === currents[i].id).id;
  const amountOfHerb =
    (currents[i][i] /
      itemData.find((herb) => herb.id === currents[i].id).price) *
    requiredValue;
  const totalAmount =
    amountOfHerb * itemData.find((herb) => herb.id === currents[i].id).price;

  twoDArrx[i] = {
    herbID,
    requiredValue,
    amountOfHerb,
    totalAmount,
  };
  let x = [];
  for (var item in twoDArrx) {
    x.push([item, twoDArrx[item]]);
  }

  x.sort(function (a, b) {
    return b[1].amountOfHerb - a[1].amountOfHerb;
  });
  //2D arrayi totalAmount'a göre sırala

  // Duplicate Aranacak
  var uniquedArr = x.reduce((unique, o) => {
    if (!unique.some((obj) => obj[1].herbID === o[1].herbID)) {
      unique.push(o);
    }
    return unique;
  }, []);
  const requiredAmountOfHerbs = [];

  //Gereken Herb Tipi Sayısını Bul ve miktarları !!!!!!
  for (let i = 0; i < uniquedArr.length; i++) {
    requiredAmountOfHerbs.push([uniquedArr[i][1].requiredValue]);
  }
  //For ile Atabiliriz.  ##PROBLEM
  let axx = [];
  let baxx = [];
  for (let i = 0; i < uniquedArr.length; i++) {
    const herbID = uniquedArr[i][1].herbID;
    Rates.forEach((item) => {
      if (item[herbID] !== undefined) {
        axx.push(item[herbID]);
      }
    });
  }

  baxx = axx.map((r) => Object.values(r));

  // Gereken Ink'e göre aynı arrayde topla.

  // Ratesleri Transpose Et
  let transposedRates = baxx[0].map((col, i) => baxx.map((row) => row[i]));
  let necessaryRates = [];
  // required inka göre belirlenecek
  for (let i = 0; i < uniquedArr.length; i++) {
    necessaryRates.push(transposedRates[uniquedArr[i][0]]);
  }

  //Transpose edilmiş rateslerin çarpımına göre matrisini al
  const invertedRates = matrix_invert(necessaryRates);

  // Transpose edilmiş Ratesler ile Gereken Herb Tipi ve sayısının matris çarpımını al.
  const iki = multiplyMatrices(invertedRates, requiredAmountOfHerbs);

  let shopList = [];
  iki.forEach((val, i) => {
    if (val > 0) {
      shopList.push([val[0], uniquedArr[i][1].herbID]);
    }
  });
  const shoppingList = millingCost(shopList);
  setShoppingList(shoppingList, i);
}

//Total Sections
const t1 = document.querySelectorAll("#totalcost-1 > .items > .item-price");
const t2 = document.querySelectorAll("#totalcost-2 > .items > .item-price");
const t3 = document.querySelectorAll("#totalcost-3 > .items > .item-price");

function millingCost(shoppingList) {
  let axx = [];
  for (let i = 0; i < shoppingList.length; i++) {
    const reqValue = shoppingList[i][0];
    const herbName = itemData.find((herb) => herb.id === shoppingList[i][1])
      .name;
    const herbPrice = itemData.find((herb) => herb.id === shoppingList[i][1])
      .price;
    const totalCostperHeb = herbPrice * reqValue;
    axx.push([herbName, reqValue, totalCostperHeb]);
  }

  return axx;
}
function setShoppingList(shopList) {
  const itemSec = document.querySelectorAll(".shopping-section > .items ");
  const shoppingList = shopList;
  resetShoppingList();
  for (let i = 0; i < shoppingList.length; i++) {
    const a = itemSec[i + 1].querySelectorAll("span");

    let name = shoppingList[i][0];
    let reqV = shoppingList[i][1];
    let totalC = shoppingList[i][2];
    a[0].innerText = name;
    a[1].innerText = Number(reqV.toFixed(2));
    a[2].innerText = Number(totalC.toFixed(2));
  }
}
function resetShoppingList() {
  const itemSec = document.querySelectorAll(".shopping-section > .items ");

  for (let i = 0; i < 3; i++) {
    const a = itemSec[i + 1].querySelectorAll("span");
    a[0].innerText = " ";
    a[1].innerText = " ";
    a[2].innerText = " ";
  }
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

    shop(i);
    // setShoppingList(i);
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
