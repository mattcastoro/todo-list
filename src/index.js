import "./style.css";
import "./template.html";

const showAddList = document.getElementById("show--add-list-dialog");
const displayAddList = document.getElementById("dialog--new-list");

showAddList.addEventListener("click", () => {
    displayAddList.showModal();
});
