const reqs = getElements(".required-section");
const expected = getElements(".expected-pigments");
const extra = getElements(".extraneous-pigments");
const shopping = getElements(".shopping-section");

createInputEle = (id,type,initV) => {
 let input = createElement("input")("some-input")
 input.id = id
 input.type=type
 input.value = initV
 return input
}



//#######   KOD TEKRARI ##########\\
function createRequiredSection(inkList) {

console.log(inkList);
  inkList.map((ink) => {
    const item = createItemDivIn(reqs, "items");
    const itemName = createItemDivIn(item, "item-name");
    addChild(itemName, createTextNode(ink));
  //  let input =  createInputEle(`req-${ink}`,"text","0")
    item.id = "r-" + ink;
    const input = document.createElement("input");
    input.type = "text";
    input.value = "0";

    item.appendChild(input);
  })
  // for (let i = 0; i < 3; i++) {
    
  // }
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

createItemsLayout(extra, pigmentList);
createItemsLayout(expected, pigmentList);

createShoppingList();
createRequiredSection(inkList);
