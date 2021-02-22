const reqs = document.querySelector(".required-section");
const expected = document.querySelector(".expected-pigments");
const extra = document.querySelector(".extraneous-pigments");
const shopping = document.querySelector(".shopping-section");

function createLayout(elem, node) {
  for (let i = 0; i < 3; i++) {
    const item = document.createElement("div");
    item.classList.add("items");
    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    if (elem !== shopping) {
      itemName.appendChild(document.createTextNode(itemData[i + 9].name));
      item.appendChild(itemName);
      if (elem === reqs) {
        item.id = "r-" + itemData[i + 9].id;
      }
    } else {
      itemName.appendChild(document.createTextNode("Test"));
      item.appendChild(itemName);
    }
    const span = document.createElement(node);
    if (elem === reqs) {
      span.type = "text";
      span.value = 0;
    }
    item.appendChild(span);

    //Shopping 2 tane span oluştur
    if (elem === shopping) {
      const span = document.createElement(node);
      item.appendChild(span);
    }
    elem.appendChild(item);
  }
}
createLayout(extra, "span");
createLayout(expected, "span");
createLayout(reqs, "input");
createLayout(shopping, "span");
