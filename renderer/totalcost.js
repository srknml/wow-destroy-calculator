const TOTAL_COST_SECTIONS = [
  "Luminous Ink",
  "Umbral Ink",
  "Tranquil Ink",
  "Total Cost",
];

const totalContainer = document.querySelectorAll(".container-item")[1];

for (let i = 0; i < 3; i++) {
  const container = document.createElement("div");
  container.classList.add("total-cost-container");
  container.id = "totalcost-" + (i + 1);
  const title = document.createElement("h4");
  title.classList.add("sub-title");
  let titleText = document.createTextNode("titleText");
  title.appendChild(titleText);
  container.appendChild(title);

  for (let j = 0; j < TOTAL_COST_SECTIONS.length; j++) {
    const items = document.createElement("div");
    items.classList.add("items");

    const itemName = document.createElement("div");
    itemName.classList.add("item-name");
    itemName.appendChild(document.createTextNode(TOTAL_COST_SECTIONS[j]));
    itemName.id = "t-" + TOTAL_COST_SECTIONS[j] + "-n";
    items.appendChild(itemName);

    const itemCost = document.createElement("div");
    itemCost.classList.add("item-price");
    itemCost.id = "t-" + TOTAL_COST_SECTIONS[j] + "-p";
    itemCost.appendChild(document.createTextNode(0));
    items.appendChild(itemCost);
    container.appendChild(items);
  }

  totalContainer.appendChild(container);
}

const requires = document.querySelectorAll(
  ".required-section > .items > input "
);

//Required edilen ink a göre göstereceğiz...
const t2 = document.querySelectorAll("#totalcost-2 > .items > .item-price");
const t3 = document.querySelectorAll("#totalcost-3 > .items > .item-price");

function setTotalCosts(t) {
  let total = 0;
  for (let i = 0; i < t.length - 1; i++) {
    const requiredValue = requires[i].value;
    if (t === t2) {
      t[i].innerText =
        ((parseInt(itemData[i + 6].price * 100) + 1.5 * 100) / 100) *
        requiredValue;
      total += parseInt(t[i].innerText * 100) / 100;
    } else if (t === t3) {
      t[i].innerText =
        (parseInt(itemData[i + 9].price * 100) / 100) * requiredValue;
      total += parseInt(t[i].innerText * 100) / 100;
    }
  }
  t[3].innerText = total;
}

for (let i = 0; i < requires.length; i++) {
  requires[i].addEventListener("change", () => {
    console.log("Değişiyor");
    setTotalCosts(t2);
    setTotalCosts(t3);
  });
}
