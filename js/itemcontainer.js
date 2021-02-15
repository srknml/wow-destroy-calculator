const electron = require("electron");
const { ipcRenderer } = electron;

let currentPrices;
const btn = document.getElementById("test");
btn.addEventListener("click", () => {
   currentPrices = ipcRenderer.sendSync("updatePrices");
 
});

// ipcRenderer.on("updatePrices", (event, args) => {
//   const currentPrices = args;
// });

//Sync Data
const itemData = [
  { id: 169701, name: "DeathBlossom" },
  { id: 168589, name: "Marrowroot" },
  { id: 168586, name: "Rising Glory" },
  { id: 170554, name: "Vigil's Torch" },
  { id: 168583, name: "Widowbloom" },
  { id: 171315, name: "Nightshade" },
  { id: 173057, name: "Luminous Pigment" },
  { id: 173056, name: "Umbral Pigment" },
  { id: 175788, name: "Tranquil Pigment" },
  { id: 173059, name: "Luminous Ink" },
  { id: 173058, name: "Umbral Ink" },
  { id: 175970, name: "Tranquil Ink" },
];
//  currentPrices = ipcRenderer.sendSync("updatePrices");


for (let i = 0; i < itemData.length; i++) {
  itemData[i].price = currentPrices[itemData[i].id];
}


const itemContainer = document.querySelector(".item-list");

for (let i = 0; i < itemData.length; i++) {
  const item = document.createElement("div");
  item.classList.add("item-list-items");
  item.id = itemData[i].id;

  itemContainer.appendChild(item);
  let itemName = document.createElement("span");
  itemName.classList.add("item-name");
  let text = document.createTextNode(itemData[i].name);
  itemName.appendChild(text);
  item.appendChild(itemName);
  const price = document.createElement("span");
  let x = document.createTextNode(itemData[i].price+ " gold");
  price.appendChild(x);
  item.appendChild(price);
}
const updateBtn = document.createElement("button");
updateBtn.classList.add("update-btn");
updateBtn.appendChild(document.createTextNode("Update Prices"));
itemContainer.appendChild(updateBtn);
