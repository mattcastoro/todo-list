import "./style.css";
import "./template.html";

document.addEventListener("DOMContentLoaded", function() {
    const formControls = document.querySelectorAll(".fc");
    formControls.forEach(function(fc) {
        fc.addEventListener("click", function(e) {
            console.log(e.target.id);
            distributeEventId(e.target.id)
        });
    });
});

function distributeEventId (id) {
    const displayAddList = document.getElementById("dialog--new-list");
    const displayAddTodo = document.getElementById("dialog--new-todo");
    if (id == "show-add-list") {
        displayAddList.showModal();
    } else if (id == "cancel-add-list") {
        displayAddList.close();
    } else if (id == "show-add-todo") {
        displayAddTodo.showModal();
    } else if (id == "cancel-add-todo") {
        displayAddTodo.close();
    }
}
