const reqs = document.querySelector(".required-section");
const expected = document.querySelector(".expected-pigments");
const extra = document.querySelector(".extraneous-pigments");
const shopping = document.querySelector(".shopping-section");
const itemNames = ["Luminous ", "Umbral ", "Tranquil "];

function createLayout(elem, node) {
  for (let i = 0; i < itemNames.length; i++) {
    const item = document.createElement("div");
    item.classList.add("item-list-items");
    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    if (elem !== shopping) {
      itemName.appendChild(document.createTextNode(itemNames[i] + "Pigment"));
      item.appendChild(itemName);
    } else {
      itemName.appendChild(document.createTextNode("Test"));
      item.appendChild(itemName);
    }
    const reqInput = document.createElement(node);
    item.appendChild(reqInput);
    //Shopping 2 tane span oluştur
    if (elem === shopping) {
      const reqInput = document.createElement(node);
      item.appendChild(reqInput);
    }
    elem.appendChild(item);
  }
}
createLayout(extra, "span");
createLayout(expected, "span");
createLayout(reqs, "input");
createLayout(shopping, "span");
