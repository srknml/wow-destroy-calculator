getPigmentsAndInks = (items, val) => {
  let listOf = [];
  items.map(item => {
    if (item.name.search(val) !== -1) {
      listOf = [...listOf, item.name];
    }
  });

  return listOf;
};
setText = (element, text) => {
  element.innerText = text
  return element;
};

createSection = section => {
  let subTitle = test("h4", "sub-title", "Test");
  let subC = test("div", "total-cost-container");
  let total = test("div", "items");
  let name = test("div", "item-name", "Total-Cost");
  let price = test("div", "item-price");
  createItem(total, name, price);

  let items = createItemsLayout(inkList);

  createItem(section, createItem(subC, subTitle, ...items, total));
  return subC;
};

const totalContainer = getElements(".container-item")[1];
const inkList = getPigmentsAndInks(itemData, "Ink");
const pigmentList = getPigmentsAndInks(itemData, "Pigment");

const millingContainer = createSection(totalContainer);
const pigmentContainer = createSection(totalContainer);

const InkContainer = createSection(totalContainer);
millingContainer.id = "totalcost-1";
pigmentContainer.id = "totalcost-2";
InkContainer.id = "totalcost-3";
setText(millingContainer.querySelector(".sub-title"), "Milling  (Average)");
setText(pigmentContainer.querySelector(".sub-title"), "Pigment Purchase");
setText(InkContainer.querySelector(".sub-title"), "Ink Purchase");
