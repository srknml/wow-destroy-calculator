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

  obj.lum = pigment[0];
  obj.umb = pigment[1];
  obj.tra = pigment[2];
  costsForAllPigments.push(obj);
}

console.log(costsForAllPigments);
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

  //Lum Pigment için
  //BURASI TEMİZ BİR ŞEKİLDE YAZILACAK. (currents'a ayar vericez)
  if (i === 0) {
    console.log("lum değişti");
    //Luminous Pigment için
    const herbID = itemData.find((herb) => herb.id === currents[i].id).id;
    const amountOfHerb =
      (currents[i].lum /
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
  } else if (i === 1) {
    console.log("umbra değişti");
    //Umbra Pigment için
    const herbID = itemData.find((herb) => herb.id === currents[i].id).id;
    const amountOfHerb =
      (currents[i].umb /
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
  } else {
    //Tranquil için
    console.log("tranquil değişti");
    const herbID = itemData.find((herb) => herb.id === currents[i].id).id;
    const amountOfHerb =
      (currents[i].tra /
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
  }
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
  console.log(iki); // Last Herb Amount
console.log(uniquedArr);
  iki.forEach((val,i) => {
    let j = i
    if(val > 0){
      console.log("********Shopping List******\n" + val+ " adet " + " Bu ID deki Herbdan " +uniquedArr[i][1].herbID );
      
    }
    
  })










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
