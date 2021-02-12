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

for (i = 0; i < NAME_OF_ITEMS.length; i++) {
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
