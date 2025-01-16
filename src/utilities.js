import { List, Todo } from "./classes.js";
import { displayListValidationAlert, displayTodoValidationAlert, addList, addTodo } from "./render.js";

export const lists = [];
export const todos = [];
let listName = document.querySelector("#list-name");
let todoName = document.querySelector("#todo-name");
let todoDesc = document.querySelector("#todo-desc");
let todoDueDate = document.querySelector("#todo-due-date");
let todoPriority = document.querySelector("#todo-priority");

export function createList() {
    validateList();
    lists.push(new List(listName.value));
    removeListInputs();
    addList();
}

export function createTodo() {
    validateTodo();
    todos.push(new Todo(todoName.value, todoDesc.value, todoDueDate.value, todoPriority.value));
    console.log(todos);
    removeTodoInputs();
    addTodo();
}

export function generateId() {
    return crypto.randomUUID();
}

export function removeListInputs() {
    listName.value = "";
}

export function removeTodoInputs() {
    todoName.value = "";
    todoDesc.value = "";
    todoDueDate.value = "";
    todoPriority.value = "";
}

function validateList() {
    if (listName.value == "") {
        displayListValidationAlert.showModal();
    }
}

function validateTodo() {
    if (todoName.value == ""
        || todoDesc.value == ""
        || todoDueDate.value == ""
        || todoPriority.value == "") {
            displayTodoValidationAlert.showModal();
        }
}