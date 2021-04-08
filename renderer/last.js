const reqs = document.querySelector(".required-section");
const expected = document.querySelector(".expected-pigments");
const extra = document.querySelector(".extraneous-pigments");
const shopping = document.querySelector(".shopping-section");

//#######   KOD TEKRARI ##########\\
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
    input.value = "0";

    item.appendChild(input);
    reqs.appendChild(item);
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
    span.classList.add("item-amount");
    item.appendChild(span);
    expected.appendChild(item);
  }
}
function createExtraSection() {
  for (let i = 0; i < 3; i++) {
    const item = document.createElement("div");
    item.classList.add("items");
    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    itemName.appendChild(document.createTextNode(itemData[i + 6].name));
    item.appendChild(itemName);
    const span = document.createElement("span");
    span.classList.add("item-amount");
    item.appendChild(span);
    extra.appendChild(item);
  }
}

function createShoppingList() {
  const itema = document.createElement("div");
  itema.classList.add("itemss");
  const itemNamea = document.createElement("span");
  itemNamea.classList.add("item-name");
  const spana = document.createElement("span");
  const spana2 = document.createElement("span");
  itemNamea.appendChild(document.createTextNode("Herb"));
  spana.appendChild(document.createTextNode("Amount"));
  spana2.appendChild(document.createTextNode("Cost"));
  itema.appendChild(itemNamea);
  itema.appendChild(spana);
  itema.appendChild(spana2);
  shopping.appendChild(itema);

  for (let i = 0; i < 3; i++) {
    const item = document.createElement("div");
    item.classList.add("items");
    const itemName = document.createElement("span");
    itemName.classList.add("item-name");
    const span = document.createElement("span");
    const span2 = document.createElement("span");
    itemName.appendChild(document.createTextNode(" "));
    span.classList.add("req-value");
    span2.classList.add("total-C");

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
