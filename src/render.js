import { createList, createTodo, removeListInputs, removeTodoInputs, lists } from "./utilities";

export const displayAddList = document.getElementById("dialog--new-list");
export const displayDeleteList = document.getElementById("dialog--delete-list");
export const displayAddTodo = document.getElementById("dialog--new-todo");
export const displayEditTodo = document.getElementById("dialog--edit-todo");
export const displayDeleteTodo = document.getElementById("dialog--delete-todo");
export const displayListValidationAlert = document.getElementById("dialog--validation-list-alert");
export const displayTodoValidationAlert = document.getElementById("dialog--validation-todo-alert");

export function distributeEventId (id) {
    switch (id) {
        case "show-add-list":
            displayAddList.showModal();
            break;
        case "add-add-list":
            createList();
            displayAddList.close();
            break;
        case "cancel-add-list":
            removeListInputs();
            displayAddList.close();
            break;
        case "show-delete-list":
            displayDeleteList.showModal();
            break;
        case "cancel-delete-list":
            displayDeleteList.close();
            break;
        case "show-add-todo":
            displayAddTodo.showModal();
            break;
        case "add-add-todo":
            createTodo();
            displayAddTodo.close();
            break;
        case "cancel-add-todo":
            removeTodoInputs();
            displayAddTodo.close();
            break;
        case "show-edit-todo":
            displayEditTodo.showModal();
            break;
        case "cancel-edit-todo":
            removeTodoInputs();
            displayEditTodo.close();
            break;
        case "show-delete-todo":
            displayDeleteTodo.showModal();
            break;
        case "cancel-delete-todo":
            displayDeleteTodo.close();
            break;
        case "alert-list-ok":
            displayListValidationAlert.close();
            displayAddList.showModal();
            break;
        case "alert-todo-ok":
            displayTodoValidationAlert.close();
            displayAddTodo.showModal();
            break;
    }
}

export function displayList() {
    let lastList = lists.slice(-1);
    lastList.forEach((element) => {
        const listSection = document.querySelector(".lists-section");
        const list = document.createElement("button");
        list.classList.add("fc", "foc", "list-container");
        list.setAttribute("id", "show-list-tab");
        listSection.appendChild(list);
        const listName = document.createElement("div");
        listName.classList.add("list-name");
        list.appendChild(listName);
        listName.textContent = element.name;
        const listCount = document.createElement("div");
        listCount.classList.add("list-count");
        list.appendChild(listCount);
        listCount.textContent = "1";
    });

    // console.log("displaying lists from render.js");
    // console.log(lists);
}