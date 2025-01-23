import { createList, createTodo, removeListInputs, removeTodoInputs, lists, setTabs, retrieveList, updateCompleteStatus, setId, editTodo, showTodoValues, updateDeleteButton, deleteList } from "./utilities";

import editTodoImage from "./assets/icon--view-todo.svg";
import deleteTodoImage from "./assets/icon--delete-todo.svg"

export const displayAddList = document.getElementById("dialog--new-list");
export const displayDeleteList = document.getElementById("dialog--delete-list");
export const displayAddTodo = document.getElementById("dialog--new-todo");
export const displayEditTodo = document.getElementById("dialog--edit-todo");
export const displayDeleteTodo = document.getElementById("dialog--delete-todo");
export const displayUncompleteTodo = document.getElementById("dialog--uncomplete-todo");
export const displayListValidationAlert = document.getElementById("dialog--validation-list-alert");
export const displayTodoValidationAlert = document.getElementById("dialog--validation-todo-alert");

export function renderEvents(action, guid, event) {
    switch (action) {

        //ADD LIST
        case "show-add-list":
            displayAddList.showModal();
            break;
        case "cancel-add-list":
            removeListInputs();
            displayAddList.close();
            break;
        case "add-add-list":
            createList();
            displayAddList.close();
            break;

        //SHOW LIST
        case "show-list":
            setTabs(event, guid);
            let [list, listGuid] = retrieveList();
            displayTodos(list.todos, list.name);
            break;

        //DELETE LIST
        case "show-delete-list":
            setId(action, guid);
            displayDeleteList.showModal();
            break;
        case "cancel-delete-list":
            displayDeleteList.close();
            break;
        case "delete-delete-list":
            deleteList(guid);
            displayDeleteList.close();
            break;

        //ADD TODO
        case "show-add-todo":
            displayAddTodo.showModal();
            break;
        case "cancel-add-todo":
            removeTodoInputs();
            displayAddTodo.close();
            break;
        case "add-add-todo":
            createTodo();
            displayAddTodo.close();
            break;

        //EDIT TODO
        case "show-edit-todo":
            setId(action, guid);
            displayEditTodo.showModal();
            showTodoValues(guid);
            break;
        case "cancel-edit-todo":
            removeTodoInputs();
            displayEditTodo.close();
            break;
        case "update-edit-todo":
            editTodo(guid);
            removeTodoInputs();
            displayEditTodo.close();
            break;

        //DELETE TODO
        case "show-delete-todo":
            displayDeleteTodo.showModal();
            break;
        case "cancel-delete-todo":
            displayDeleteTodo.close();
            break;

        //COMPLETE CHECKBOX
        case "todo-checkbox":
            updateCompleteStatus(guid);
            break;

        //VALIDATIONS
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
    const listTabs = document.getElementsByClassName("list-tab");
    for (let i = 0; i < listTabs.length; i++) {
        listTabs[i].classList.remove("active-tab");
    }
    let lastList = lists.slice(-1);
    lastList.forEach((element) => {
        const listSection = document.querySelector(".lists-section");
        const list = document.createElement("button");
        list.classList.add("fc", "foc", "list-tab", "active-tab");
        list.setAttribute("id", `show-list_${element.listId}`);
        list.textContent = element.name;
        listSection.appendChild(list);
        updateDeleteButton(element.listId);
        displayTodos(element.todos, element.name);
    });
}

export function displayTodos(todoList, listName) {
    const todoListTitle = document.querySelector(".main--title");
    todoListTitle.textContent = listName;

    const todoSection = document.querySelector(".todos-section");
    todoSection.textContent = "";
    
    for (let i = 0; i < todoList.length; i++) {
        const todo = document.createElement("div");
        todo.classList.add(`todo-container_${todoList[i].todoId}`);
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
        todoEditBtn.setAttribute("id", `edit-btn_${todoList[i].todoId}`);
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
        todoDeleteBtn.setAttribute("id", `delete-btn_${todoList[i].todoId}`);
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
    for (let j = 0; j < todoList.length; j++) {
        if (todoList[j].complete == "complete") {
            removeTodo(todoList[j]);
        }
    }
}

export function removeTodo(todo) {
    const id = todo.todoId;
    const todoSection = document.querySelector(".todos-section");

    const todoContainer = document.querySelector(`.todo-container_${id}`);
    const todoCheckbox = document.querySelector(`#todo-checkbox_${id}`);
    const editBtnContainer = document.querySelector(`#edit-btn_${id}`);
    const editBtn = document.querySelector(`#show-edit-todo_${id}`);
    const deleteBtnContainer = document.querySelector(`#delete-btn_${id}`);
    const deleteBtn = document.querySelector(`#show-delete-todo_${id}`);

    todoSection.removeChild(todoContainer);

    todoContainer.classList.add("complete");
    todoCheckbox.classList.add("complete");
    todoSection.appendChild(todoContainer);
    editBtnContainer.removeChild(editBtn);
    deleteBtnContainer.removeChild(deleteBtn);
}

