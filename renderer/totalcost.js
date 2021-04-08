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
function setSubTitles() {
  const subTitles = document.querySelectorAll(".sub-title");

  subTitles[0].innerHTML = "Milling (Average)";
  subTitles[1].innerHTML = "Pigment Purchase";
  subTitles[2].innerHTML = "Ink Purchase";
}
setSubTitles();