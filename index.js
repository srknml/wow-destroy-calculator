const electron = require("electron");
const { ipcRenderer } = electron;

const NAME_OF_ITEMS = [
  "Death Blossom",
  "Marrowroot",
  "Rising Glory",
  "Vigil's Torch",
  "Widowbloom",
  "Nightshade",
  "Luminous Pigment",
  "Umbral Pigment",
  "Tranquil Pigment",
  "Luminous Ink",
  "Umbral Ink",
  "Tranquil Ink",
  "Aerated Water",
  "Rune Etched Vial",
];
const itemContainer = document.querySelector(".item-list");

for (let i = 0; i < NAME_OF_ITEMS.length; i++) {
  const item = document.createElement("div");
  item.classList.add("item-list-items");
  itemContainer.appendChild(item);
  let itemName = document.createElement("div");
  itemName.classList.add("item-name");
  let text = document.createTextNode(NAME_OF_ITEMS[i]);
  itemName.appendChild(text);
  item.appendChild(itemName);
  const inputs = document.createElement("input");
  item.appendChild(inputs);
}

const totalContainer = document.querySelector(".total-cost");

for (let i = 0; i < 3; i++) {
  const container = document.createElement("div");
  container.classList.add("total-cost-container");

  const title = document.createElement("h4");
  title.classList.add("container-title");
  let titleText = document.createTextNode("titleText");
  title.appendChild(titleText);
  container.appendChild(title);

  for (let i = 9; i < 13; i++) {
    const items = document.createElement("div");
    items.classList.add("total-cost-items");

    const itemName = document.createElement("div");
    itemName.classList.add("item-name");
    itemName.appendChild(document.createTextNode(NAME_OF_ITEMS[i]));
    items.appendChild(itemName);

    const itemCost = document.createElement("div");
    itemCost.classList.add("item-cost");
    items.appendChild(itemCost);
    container.appendChild(items);
  }

  totalContainer.appendChild(container);
}
