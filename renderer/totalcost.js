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

  const title = document.createElement("h4");
  title.classList.add("sub-title");
  let titleText = document.createTextNode("titleText");
  title.appendChild(titleText);
  container.appendChild(title);

  for (let i = 0; i < 4; i++) {
    const items = document.createElement("div");
    items.classList.add("items");

    const itemName = document.createElement("div");
    itemName.classList.add("item-name");
    itemName.appendChild(document.createTextNode(TOTAL_COST_SECTIONS[i]));
    items.appendChild(itemName);

    const itemCost = document.createElement("div");
    itemCost.classList.add("item-price");
    itemCost.appendChild(document.createTextNode("COSTS"));
    items.appendChild(itemCost);
    container.appendChild(items);
  }

  totalContainer.appendChild(container);
}
