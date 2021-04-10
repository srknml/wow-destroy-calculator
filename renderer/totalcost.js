getPigmentsAndInks = (items,val) => {
  let listOf = [];
  items.map((item) => {
    if (item.name.search(val) !== -1) {
      listOf = [...listOf, item.name];
    }
  });

  return listOf;
};
createSubTitle = (title) => {
  let subTitle = createElement("h4")("sub-title");
  addChild(subTitle, createTextNode(title));
  return subTitle;
};

createSection = (section) => {
  let subTitle = createSubTitle("Milling (Average)");
  const subC = createItemDivIn(section, "total-cost-container");
  addChild(subC, subTitle);
  createItemsLayout(subC, inkList);

  let total = createItemDivIn(subC, "items");

  addChild(createItemDivIn(total, "item-name"), createTextNode("Total Cost"));
  addChild(createItemDivIn(total, "item-price"), createTextNode("0"));
  return subC
};


const totalContainer = getElements(".container-item")[1];
const inkList = getPigmentsAndInks(itemData,"Ink");
const pigmentList = getPigmentsAndInks(itemData,"Pigment");

const millingContainer = createSection(totalContainer);
const pigmentContainer = createSection(totalContainer);
const InkContainer = createSection(totalContainer);
millingContainer.id = "totalcost-1"
pigmentContainer.id = "totalcost-2"
InkContainer.id = "totalcost-3"