const electron = require("electron");
const { ipcRenderer } = electron;

const form = document.querySelector(".settings-form");
const USER_DATA = {};

handleSubmit = (event) => {
  event.preventDefault();
  ipcRenderer.send("user-config", USER_DATA);
};
handleChange = (event) => {
  USER_DATA[`${event.target.name}`] = event.target.value;
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("change", handleChange);
