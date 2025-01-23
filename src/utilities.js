import { List, Todo } from "./classes.js";
import { displayListValidationAlert, displayTodoValidationAlert, addList, displayTodos, removeTodo } from "./render.js";

export const lists = [];
let listName = document.querySelector("#list-name");
let todoName = document.querySelector("#todo-name");
let todoDesc = document.querySelector("#todo-desc");
let todoDueDate = document.querySelector("#todo-due-date");
let todoPriority = document.querySelector("#todo-priority");

let editTodoName = document.querySelector("#edit-todo-name");
let editTodoDesc = document.querySelector("#edit-todo-desc");
let editTodoDueDate = document.querySelector("#edit-todo-due-date");
let editTodoPriority = document.querySelector("#edit-todo-priority");

export function createList() {
    validateList();
    lists.push(new List(listName.value));
    removeListInputs();
    addList();
}

export function createTodo() {
    // validateTodo(); **interim for testing**
    let [list, listGuid] = retrieveList();
    let todo = new Todo(todoName.value, todoDesc.value, todoDueDate.value, todoPriority.value, listGuid);
    list.todos.push(todo);
    removeTodoInputs();
    displayTodos(list.todos, list.name);
}

export function showTodoValues(todoGuid) {
    let [list, listGuid] = retrieveList();
    let todo = retrieveTodo(list, todoGuid);
    editTodoName.value = todo.name;
    editTodoDesc.value = todo.description;
    editTodoDueDate.value = todo.dueDate;
    editTodoPriority.value = todo.priority;
}

export function editTodo(todoGuid) {
    // validateTodo(); **interim for testing**
    let [list, listGuid] = retrieveList();
    let todo = retrieveTodo(list, todoGuid);
    todo.name = editTodoName.value;
    todo.description = editTodoDesc.value;
    todo.dueDate = editTodoDueDate.value;
    todo.priority = editTodoPriority.value;
    displayTodos(list.todos, list.name);
}

export function setId(action, guid) {
    if (action == "show-edit-todo") {
        const element = document.querySelector('[id ^= "update-edit-todo"]');
        element.id = `update-edit-todo_${guid}`;
    } else if (action == "show-delete-todo") {

    } else if (action == "show-delete-list") {

    }
}

export function updateCompleteStatus(guid) {
    let [list, listGuid] = retrieveList();
    let todo = list.todos.find(({todoId}) => todoId === guid);
    if (todo.complete == "not complete") {
        todo.complete = "complete";
        removeTodo(todo);
    } else if (todo.complete == "complete") {
        todo.complete = "not complete";
        displayTodos(list.todos, list.name);
    }
}

export function retrieveList() {
    let listGuid = document.querySelector('.active-tab').id.split("_")[1];
    let list = lists.find(({listId}) => listId === listGuid);
    return [list, listGuid];
}

function retrieveTodo(list, todoGuid) {
    let todo = list.todos.find(({todoId}) => todoId === todoGuid);
    return todo;
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

    editTodoName.value = "";
    editTodoDesc.value = "";
    editTodoDueDate.value = "";
    editTodoPriority.value = "";
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