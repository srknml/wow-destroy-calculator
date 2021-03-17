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
  { id: 1, name: "Aerated Water", price: "0.5" },
  { id: 2, name: "Rune Etched Vial", price: "1" },
];

const itemContainer = document.querySelectorAll(".container-item")[0];
function handleUpdate() {
  const btn = document.querySelector("#updatePrices");
  btn.addEventListener("click", async () => {
    await getPrices();
    displayPrices();
    resetAllSections();
    calculatePigmentCostForAllHerbs();
  });
}

async function getPrices() {
  const prices = await ipcRenderer.sendSync("Prices");
  setPrices(prices);
}

function setPrices(prices) {
  for (let i = 0; i < itemData.length - 2; i++) {
    itemData[i].price = prices[itemData[i].id];
  }
}
function displayPrices() {
  const pricesSpans = document.querySelectorAll(".items");
  for (let i = 0; i < itemData.length - 2; i++) {
    if (pricesSpans[i].id == itemData[i].id) {
      pricesSpans[i].lastElementChild.innerText = itemData[i].price;
    }
  }
}

//Vendorları ayrı oluştur.
function createItemsLayout() {
  for (let i = 0; i < itemData.length; i++) {
    const item = document.createElement("div");
    item.classList.add("items");
    item.id = itemData[i].id;
    itemContainer.appendChild(item);

    let itemName = document.createElement("div");
    itemName.classList.add("item-name");
    itemName.id = "i-" + itemData[i].id + "n";
    let text = document.createTextNode(itemData[i].name);
    itemName.appendChild(text);
    item.appendChild(itemName);

    const price = document.createElement("div");
    price.classList.add("item-price");
    price.id = "i-" + itemData[i].id + "p";
    if (itemData[i].hasOwnProperty("price")) {
      price.appendChild(document.createTextNode(itemData[i].price));
    }
    item.appendChild(price);
  }

  createUpdateBtn();
}

async function __init__() {
  createItemsLayout();
  handleUpdate();
}

__init__();

document.querySelector(".set-btn").addEventListener("click", () => {
  ipcRenderer.send("set-window");
});
function createUpdateBtn() {
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("update-btn");
  updateBtn.id = "updatePrices";
  updateBtn.appendChild(document.createTextNode("Update Prices"));
  itemContainer.appendChild(updateBtn);
}
