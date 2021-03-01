const reqs = document.querySelector(".required-section");
const expected = document.querySelector(".expected-pigments");
const extra = document.querySelector(".extraneous-pigments");
const shopping = document.querySelector(".shopping-section");

function createRequiredSection() {
  for (let i = 0; i < 3; i++) {
    const item = document.createElement("div");
    item.classList.add("items");
    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    itemName.appendChild(document.createTextNode(itemData[i + 9].name));
    item.appendChild(itemName);
    item.id = "r-" + itemData[i + 9].id;
    const input = document.createElement("input");
    input.type = "text";
    
    item.appendChild(input);
    reqs.appendChild(item);
  }
}
function createExtraSection(params) {
  for (let i = 0; i < 3; i++) {
    const item = document.createElement("div");
    item.classList.add("items");
    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    itemName.appendChild(document.createTextNode(itemData[i + 6].name));
    item.appendChild(itemName);
    const span = document.createElement("span");
    item.appendChild(span);

    expected.appendChild(item);
  }
}
function createExpectedSection() {
  for (let i = 0; i < 3; i++) {
    const item = document.createElement("div");
    item.classList.add("items");
    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    itemName.appendChild(document.createTextNode(itemData[i + 6].name));
    item.appendChild(itemName);
    const span = document.createElement("span");
    item.appendChild(span);
    extra.appendChild(item);
  }
}

function createShoppingList() {
  for (let i = 0; i < 4; i++) {
    const item = document.createElement("div");
    item.classList.add("items");
    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    const span = document.createElement("span");
    const span2 = document.createElement("span");

    if (i === 0) {
      itemName.appendChild(document.createTextNode("Herb"));
      span.appendChild(document.createTextNode("Amount"));
      span2.appendChild(document.createTextNode("Cost"));
    } else {
      itemName.appendChild(document.createTextNode("Test"));
    }

    item.appendChild(itemName);
    item.appendChild(span);
    item.appendChild(span2);

    shopping.appendChild(item);
  }
}
createShoppingList();
createExtraSection();
createExpectedSection();
createRequiredSection();
