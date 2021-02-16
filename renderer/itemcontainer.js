const electron = require("electron");
const { ipcRenderer } = electron;

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

const itemContainer = document.querySelector(".item-list");

function handleUpdate() {
  const btn = document.querySelector("#updatePrices");
  btn.addEventListener("click", async () => {
    console.log("veriler alınıyor.");
    await getPrices();
    displayPrices();
  });
}

async function getPrices() {
  const prices = await ipcRenderer.sendSync("updatePrices");
  setPrices(prices);
}

function setPrices(prices) {
  for (let i = 0; i < itemData.length; i++) {
    itemData[i].price = prices[itemData[i].id];
  }
}
function displayPrices() {
  const pricesSpans = document.querySelectorAll(".item-list-items");
  for (let i = 0; i < pricesSpans.length; i++) {
    if (pricesSpans[i].id == itemData[i].id) {
      pricesSpans[i].lastElementChild.innerText = itemData[i].price;
    }
  }
}
function createItemsLayout() {
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
    price.classList.add("item-price");

    item.appendChild(price);
  }
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("update-btn");
  updateBtn.id = "updatePrices";
  updateBtn.appendChild(document.createTextNode("Update Prices"));
  itemContainer.appendChild(updateBtn);
}

async function __init__() {
  createItemsLayout();
  // await getPrices();
  // await displayPrices();
  handleUpdate();
}

__init__();
