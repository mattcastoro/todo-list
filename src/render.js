import { createList, createTodo, removeListInputs, removeTodoInputs, lists, setTabs, findList } from "./utilities";

import editTodoImage from "./assets/icon--view-todo.svg";
import deleteTodoImage from "./assets/icon--delete-todo.svg"

export const displayAddList = document.getElementById("dialog--new-list");
export const displayDeleteList = document.getElementById("dialog--delete-list");
export const displayAddTodo = document.getElementById("dialog--new-todo");
export const displayEditTodo = document.getElementById("dialog--edit-todo");
export const displayDeleteTodo = document.getElementById("dialog--delete-todo");
export const displayListValidationAlert = document.getElementById("dialog--validation-list-alert");
export const displayTodoValidationAlert = document.getElementById("dialog--validation-todo-alert");

export function distributeEventId (action, guid, event) {
    switch (action) {
        case "show-list":
            setTabs(event);
            let [list, listGuid] = findList();
            displayTodos(list.todos);
            break;
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

export function addList() {
    let lastList = lists.slice(-1);
    lastList.forEach((element) => {
        const listSection = document.querySelector(".lists-section");
        
        const list = document.createElement("button");
        list.classList.add("fc", "foc", "list-tab");
        list.setAttribute("id", `show-list_${element.listId}`);
        list.textContent = element.name;
        listSection.appendChild(list);
    });
}

export function displayTodos(todoList) {
    const todoSection = document.querySelector(".todos-section");
    todoSection.textContent = "";
    for (let i = 0; i < todoList.length; i++) {
        const todo = document.createElement("div");
        todo.classList.add("todo-container");
        todoSection.appendChild(todo);

        const todoComplete = document.createElement("input");
        todoComplete.setAttribute("type", "checkbox");
        todoComplete.setAttribute("id", `todo-checkbox_${todoList[i].todoId}`);
        todoComplete.setAttribute("name", "complete-status");
        todoComplete.classList.add("fc", "checkbox", "todo-checkbox");
        todo.appendChild(todoComplete);

        const todoName = document.createElement("div");
        todoName.classList.add("todo-name");
        todoName.textContent = todoList[i].name;
        todo.appendChild(todoName);

        const todoDueDate = document.createElement("div");
        todoDueDate.classList.add("todo-due-date");
        todoDueDate.textContent = todoList[i].dueDate;
        todo.appendChild(todoDueDate);

        const todoPriority = document.createElement("div");
        todoPriority.classList.add("todo-priority");
        todoPriority.textContent = todoList[i].priority;
        todo.appendChild(todoPriority);

        const todoEditBtn = document.createElement("button");
        todoEditBtn.setAttribute("type", "button");
        todoEditBtn.classList.add("fc", "imgBtn");
        todo.appendChild(todoEditBtn);

        const todoEditBtnImg = document.createElement("img");
        todoEditBtnImg.src = editTodoImage;
        todoEditBtnImg.setAttribute("alt", "oo"),
        todoEditBtnImg.setAttribute("title", "edit");
        todoEditBtnImg.setAttribute("id", `show-edit-todo_${todoList[i].todoId}`);
        todoEditBtnImg.classList.add("fc");
        todoEditBtn.appendChild(todoEditBtnImg);

        const todoDeleteBtn = document.createElement("button");
        todoDeleteBtn.setAttribute("type", "button");
        todoDeleteBtn.classList.add("fc", "imgBtn");
        todo.appendChild(todoDeleteBtn);

        const todoDeleteBtnImg = document.createElement("img");
        todoDeleteBtnImg.src = deleteTodoImage;
        todoDeleteBtnImg.setAttribute("alt", "x"),
        todoDeleteBtnImg.setAttribute("title", "delete");
        todoDeleteBtnImg.setAttribute("id", `show-delete-todo_${todoList[i].todoId}`);
        todoDeleteBtnImg.classList.add("fc");
        todoDeleteBtn.appendChild(todoDeleteBtnImg);
    }
}