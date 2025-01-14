import { createList, createTodo } from "./utilities";

export function distributeEventId (id) {
    const displayAddList = document.getElementById("dialog--new-list");
    const displayDeleteList = document.getElementById("dialog--delete-list");
    const displayAddTodo = document.getElementById("dialog--new-todo");
    const displayEditTodo = document.getElementById("dialog--edit-todo");
    const displayDeleteTodo = document.getElementById("dialog--delete-todo");
    switch (id) {
        case "show-add-list":
            displayAddList.showModal();
            break;
        case "add-add-list":
            createList();
            displayAddList.close();
            break;
        case "cancel-add-list":
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
            displayAddTodo.close();
            break;
        case "show-edit-todo":
            displayEditTodo.showModal();
            break;
        case "cancel-edit-todo":
            displayEditTodo.close();
            break;
        case "show-delete-todo":
            displayDeleteTodo.showModal();
            break;
        case "cancel-delete-todo":
            displayDeleteTodo.close();
            break;
    }
    return displayAddList;
}

// function showAddList() {

// }