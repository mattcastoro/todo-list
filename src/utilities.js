import { List, Todo } from "./classes.js";
import { displayListValidationAlert, displayTodoValidationAlert, addList, displayTodos, removeTodo } from "./render.js";

export const lists = [];
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
    // validateTodo(); **interim for testing**
    let [list, listGuid] = findList();
    let todo = new Todo(todoName.value, todoDesc.value, todoDueDate.value, todoPriority.value, listGuid);
    list.todos.push(todo);
    removeTodoInputs();
    displayTodos(list.todos, list.name);
}

export function updateCompleteStatus(guid) {
    let [list, listGuid] = findList();
    let todo = list.todos.find(({todoId}) => todoId === guid);
    if (todo.complete == "not complete") {
        todo.complete = "complete";
        removeTodo(todo);
    } else if (todo.complete == "complete") {
        todo.complete = "not complete";
        displayTodos(list.todos, list.name);
    }
}

export function findList() {
    let listGuid = document.querySelector('.active-tab').id.split("_")[1];
    let list = lists.find(({listId}) => listId === listGuid);
    return [list, listGuid];
}

export function setTabs(event) {
    const listTabs = document.getElementsByClassName("list-tab");
    for (let i = 0; i < listTabs.length; i++) {
        listTabs[i].className = listTabs[i].className.replace(" active-tab", "");
    }
    event.target.className += " active-tab";
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