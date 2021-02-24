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
let herbTypes = new Set ()
const twoDArr = []
function shop(i) {
  const currents = findMinCost();
  console.log(currents);
  const requiredValue = requires[i].value;
  //TERS MATRIS GEREKIYOR:..............

  //Lum Pigment için
  if(i === 0){
    //herbin rateini alıcaz
    const gerekenHerbForLum = itemData.find((herb) => herb.id === currents[i].id).name
    const amountOfHerb =  currents[i].lum /itemData.find((herb) => herb.id === currents[i].id).price 
    const costAll = amountOfHerb * itemData.find((herb) => herb.id === currents[i].id).price
    console.log(gerekenHerbForLum,amountOfHerb,costAll);
    herbTypes.add(gerekenHerbForLum)
    twoDArr.push(["Lum",requiredValue,gerekenHerbForLum,amountOfHerb,costAll])
  }
  else if(i === 1){
    //herbin rateini alıcaz
  //Umbra Pigment için
    const gerekenHerbForUmb = itemData.find((herb) => herb.id === currents[i].id).name
    const amountOfHerbforUmb =  currents[i].umb /itemData.find((herb) => herb.id === currents[i].id).price 
    const costAllforUmb = amountOfHerbforUmb * itemData.find((herb) => herb.id === currents[i].id).price
    console.log(gerekenHerbForUmb, amountOfHerbforUmb,costAllforUmb);
    herbTypes.add(gerekenHerbForUmb)
    twoDArr.push(["Umbra",requiredValue,gerekenHerbForUmb,amountOfHerbforUmb,costAllforUmb])
  }
  else {
      //Tranquil için
    //herbin rateini alıcaz
  const traNeeded = itemData.find((herb) => herb.id === currents[i].id).name
  const AmountforTra = currents[i].tra /itemData.find((herb) => herb.id === currents[i].id).price
  const costAllforTra = AmountforTra * itemData.find((herb) => herb.id === currents[i].id).price
  console.log(traNeeded,AmountforTra,costAllforTra);
  herbTypes.add(traNeeded)
  twoDArr.push(["Tra",requiredValue,traNeeded,AmountforTra,costAllforTra])
  }
  //Gereken Herb Tipi Sayısını Bul ve miktarları
  const y = [[1],[1]]
  //2D array oluştur

twoDArr.sort(function(a, b) {
    return b[3] - a[3];
});
console.log(twoDArr);
const y = [[1],[1]]
  //Bu arrayin Çarpımına göre ters Matrisini Al
  const invertedRates = matrix_invert([[DeathRates[1] ,NightRates[1]],[DeathRates [2], NightRates[2]]])

  // Herb Tipleriyle Ters Matrisi Çarp


const iki = multiplyMatrices(invertedRates,y)

 console.log(iki);





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
function matrix_invert(M){
  // I use Guassian Elimination to calculate the inverse:
  // (1) 'augment' the matrix (left) by the identity (on the right)
  // (2) Turn the matrix on the left into the identity by elemetry row ops
  // (3) The matrix on the right is the inverse (was the identity matrix)
  // There are 3 elemtary row ops: (I combine b and c in my code)
  // (a) Swap 2 rows
  // (b) Multiply a row by a scalar
  // (c) Add 2 rows
  
  //if the matrix isn't square: exit (error)
  if(M.length !== M[0].length){return;}
  
  //create the identity matrix (I), and a copy (C) of the original
  var i=0, ii=0, j=0, dim=M.length, e=0, t=0;
  var I = [], C = [];
  for(i=0; i<dim; i+=1){
      // Create the row
      I[I.length]=[];
      C[C.length]=[];
      for(j=0; j<dim; j+=1){
          
          //if we're on the diagonal, put a 1 (for identity)
          if(i==j){ I[i][j] = 1; }
          else{ I[i][j] = 0; }
          
          // Also, make the copy of the original
          C[i][j] = M[i][j];
      }
  }
  
  // Perform elementary row operations
  for(i=0; i<dim; i+=1){
      // get the element e on the diagonal
      e = C[i][i];
      
      // if we have a 0 on the diagonal (we'll need to swap with a lower row)
      if(e==0){
          //look through every row below the i'th row
          for(ii=i+1; ii<dim; ii+=1){
              //if the ii'th row has a non-0 in the i'th col
              if(C[ii][i] != 0){
                  //it would make the diagonal have a non-0 so swap it
                  for(j=0; j<dim; j++){
                      e = C[i][j];       //temp store i'th row
                      C[i][j] = C[ii][j];//replace i'th row by ii'th
                      C[ii][j] = e;      //repace ii'th by temp
                      e = I[i][j];       //temp store i'th row
                      I[i][j] = I[ii][j];//replace i'th row by ii'th
                      I[ii][j] = e;      //repace ii'th by temp
                  }
                  //don't bother checking other rows since we've swapped
                  break;
              }
          }
          //get the new diagonal
          e = C[i][i];
          //if it's still 0, not invertable (error)
          if(e==0){return}
      }
      
      // Scale this row down by e (so we have a 1 on the diagonal)
      for(j=0; j<dim; j++){
          C[i][j] = C[i][j]/e; //apply to original matrix
          I[i][j] = I[i][j]/e; //apply to identity
      }
      
      // Subtract this row (scaled appropriately for each row) from ALL of
      // the other rows so that there will be 0's in this column in the
      // rows above and below this one
      for(ii=0; ii<dim; ii++){
          // Only apply to other rows (we want a 1 on the diagonal)
          if(ii==i){continue;}
          
          // We want to change this element to 0
          e = C[ii][i];
          
          // Subtract (the row above(or below) scaled by e) from (the
          // current row) but start at the i'th column and assume all the
          // stuff left of diagonal is 0 (which it should be if we made this
          // algorithm correctly)
          for(j=0; j<dim; j++){
              C[ii][j] -= e*C[i][j]; //apply to original matrix
              I[ii][j] -= e*I[i][j]; //apply to identity
          }
      }
  }
  
  //we've done all operations, C should be the identity
  //matrix I should be the inverse:
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
