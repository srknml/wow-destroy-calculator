const TOTAL_COST_SECTIONS = [
  "Luminous Ink",
  "Umbral Ink",
  "Tranquil Ink",
  "Total Cost",
];
const totalContainer = getElements(".container-item")[1];

getInkNames = (items) => {
  let inks = [];
  items.map((item) => {
    if (item.name.search("Ink") !== -1) {
      inks = [...inks, item.name];
    }
  });

  return inks;
};
createSubTitle = (title) => {
  let subTitle = createElement("h4")("sub-title");
  addChild(subTitle, createTextNode(title));
  return subTitle;
};
const inkList = getInkNames(itemData);

createItemDivIn = (parent, classname) =>
  addChild(parent, createElement("div")(classname));

createSection = (section) => {
  let subTitle = createSubTitle("Milling (Average)");
  const subC = createItemDivIn(section, "total-cost-container");
  addChild(subC, subTitle);
  createLayout(subC, inkList);
  // inkList.map((ink) => {
  //   let items = createItemDivIn(subC, "items");

  //   addChild(createItemDivIn(items, "item-name"), createTextNode(ink));
  //   addChild(createItemDivIn(items, "item-price"), createTextNode("0"));
  // });

  let total = createItemDivIn(subC, "items");

  addChild(createItemDivIn(total, "item-name"), createTextNode("Total Cost"));
  addChild(createItemDivIn(total, "item-price"), createTextNode("0"));
};

const millingContainer = createSection(totalContainer);
const pigmentContainer = createSection(totalContainer);
const InkContainer = createSection(totalContainer);

// for (let i = 0; i < 3; i++) {
//   const container = document.createElement("div");
//   container.classList.add("total-cost-container");
//   container.id = "totalcost-" + (i + 1);
//   const title = document.createElement("h4");
//   title.classList.add("sub-title");
//   container.appendChild(title);

//   for (let j = 0; j < TOTAL_COST_SECTIONS.length; j++) {
//     const items = document.createElement("div");
//     items.classList.add("items");

//     const itemName = document.createElement("div");
//     itemName.classList.add("item-name");
//     itemName.appendChild(document.createTextNode(TOTAL_COST_SECTIONS[j]));
//     itemName.id = "t-" + TOTAL_COST_SECTIONS[j] + "-n";
//     items.appendChild(itemName);

//     const itemCost = document.createElement("div");
//     itemCost.classList.add("item-price");
//     itemCost.id = "t-" + TOTAL_COST_SECTIONS[j] + "-p";
//     itemCost.appendChild(document.createTextNode(0));
//     items.appendChild(itemCost);
//     container.appendChild(items);
//   }

//   totalContainer.appendChild(container);
// }
// function setSubTitles() {
//   const subTitles = document.querySelectorAll(".sub-title");

//   subTitles[0].innerHTML = "Milling (Average)";
//   subTitles[1].innerHTML = "Pigment Purchase";
//   subTitles[2].innerHTML = "Ink Purchase";
// }
// setSubTitles();
