const electron = require("electron");
const { ipcRenderer } = electron;
createElement = (el) => {
  const html = document.createElement(el);
  return (classname) => {
    html.classList.add(classname);
    return html;
  };
};

createTextNode = (text) => document.createTextNode(text);
addChild = (parent, child) => parent.appendChild(child);
getElements = (selector) => {
  let el = document.querySelectorAll(selector);
  if (el.length === 1) {
    return el[0];
  } else {
    return el;
  }
};

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
const itemContainer = getElements(".container-item")[0];

function handleUpdate() {
  const btn = getElements("#updatePrices");
  btn.addEventListener("click", async () => {
    const setandDisplayPrices = await getPrices();
    setandDisplayPrices()();
    resetAllSections();
    calculatePigmentCostForAllHerbs();
  });
}
async function getPrices() {
  const prices = await ipcRenderer.sendSync("Prices");
  return function () {
    itemData.map((item) => {
      if (prices[item.id] === undefined) {
        return;
      } else {
        item.price = prices[item.id];
      }
    });
    return function () {
      let itemsElement = getElements(".items > .item-price");
      itemData.map((item, index) => {
        addChild(itemsElement[index], createTextNode(item.price));
      });
    };
  };
}
createItemListLayout = () => {
  itemData.map((item) => {
    let items = createElement("div")("items");
    addChild(itemContainer, items);

    let itemName = createElement("div")("item-name");
    let textNode = createTextNode(item.name);
    addChild(itemName, textNode);
    addChild(items, itemName);

    let itemPrice = createElement("div")("item-price");
    if (item.hasOwnProperty("price")) {
      addChild(itemPrice, createTextNode(item.price));
    }
    addChild(items, itemPrice);
  });
};
setButton = () => {
  getElements(".set-btn").addEventListener("click", () => {
    ipcRenderer.send("set-window");
  });
};
createUpdateBtn = () => {
  let btn = createElement("button")("update-Btn");
  btn.id = "updatePrices";
  addChild(btn, createTextNode("Update"));
  addChild(itemContainer, btn);
};
(async function IIFE() {
  createItemListLayout();
  createUpdateBtn();
  setButton();
  handleUpdate();
})()