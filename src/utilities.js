import { List, Todo } from "./classes.js";

import { storeData, lists } from "./data-storage.js";

import { displayListValidationAlert, displayTodoValidationAlert, addList, displayTodos, shiftCompletedTodo, removeList, removeTodo, renderDefaultList } from "./render.js";

let listName = document.querySelector("#list-name");
let defaultList = document.querySelector("#new-make-default");

let todoName = document.querySelector("#todo-name");
let todoDesc = document.querySelector("#todo-desc");
let todoDueDate = document.querySelector("#todo-due-date");
let todoPriority = document.querySelector("#todo-priority");

let editTodoName = document.querySelector("#edit-todo-name");
let editTodoDesc = document.querySelector("#edit-todo-desc");
let editTodoDueDate = document.querySelector("#edit-todo-due-date");
let editTodoPriority = document.querySelector("#edit-todo-priority");

export function createList() {
    if (validateNewList() === "validated") {
        lists.push(new List(listName.value, defaultList.checked));
        storeData();
        addList();
        if (defaultList.checked === true) {
            setDefaultList(lists[lists.length - 1].listId);
        }
        removeListInputs();
    }
}

export function createTodo() {
    if (validateNewTodo() === "validated") {
        let [list, listGuid] = retrieveList();
        let todo = new Todo(todoName.value, todoDesc.value, todoDueDate.value, todoPriority.value, listGuid);
        list.todos.push(todo);
        storeData();
        removeTodoInputs();
        displayTodos(list.todos, list.name, list.defaultList);
    }
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
    if (validateEditTodo() === "validated") {
        let [list, listGuid] = retrieveList();
        let todo = retrieveTodo(list, todoGuid);
        todo.name = editTodoName.value;
        todo.description = editTodoDesc.value;
        todo.dueDate = editTodoDueDate.value;
        todo.priority = editTodoPriority.value;
        storeData();
        displayTodos(list.todos, list.name, list.defaultList);
    }
}

export function deleteList(listGuid) {
    lists.splice(lists.findIndex(index => index.listId === listGuid), 1);
    removeList(listGuid);
    let defaultList = getDefaultList();
    if (defaultList !== undefined) {
        setTabs("pass", defaultList.listId);
        console.log(defaultList);
        console.log(defaultList.name);
        console.log(defaultList.defaultList);
        displayTodos(defaultList.todos, defaultList.name, defaultList.defaultList);
    } else {
        if (lists.length !== 0) {
            let lastList = lists[lists.length - 1];
            setTabs("pass", lastList.listId);
            console.log(lastList);
            console.log(lastList.name);
            console.log(lastList.defaultList);
            displayTodos(lastList.todos, lastList.name, lastList.defaultList);
        }
    }
    storeData();
} 

export function deleteTodo(todoGuid) {
    let [list, listGuid] = retrieveList();
    list.todos.splice(list.todos.findIndex(index => index.todoId === todoGuid), 1);
    storeData();
    removeTodo(todoGuid);
}

export function setId(action, guid) {
    if (action == "show-edit-todo") {
        const element = document.querySelector('[id ^= "update-edit-todo"]');
        element.id = `update-edit-todo_${guid}`;
    } else if (action == "show-delete-list") {
        const element = document.querySelector('[id ^= "delete-delete-list"]');
        element.id = `delete-delete-list_${guid}`;
    } else if (action == "show-delete-todo") {
        const element = document.querySelector(`[id ^= "delete-delete-todo"]`);
        element.id = `delete-delete-todo_${guid}`;
    }
}

export function updateCompleteStatus(guid) {
    let [list, listGuid] = retrieveList();
    let todo = list.todos.find(({todoId}) => todoId === guid);
    if (todo.complete == "not complete") {
        todo.complete = "complete";
        shiftCompletedTodo(todo);
    } else if (todo.complete == "complete") {
        todo.complete = "not complete";
        displayTodos(list.todos, list.name, list.defaultList);
    }
    storeData();
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

export function setTabs(event, guid) {
    const listTabs = document.getElementsByClassName("list-tab");
    for (let i = 0; i < listTabs.length; i++) {
        listTabs[i].className = listTabs[i].className.replace(" active-tab", "");
    }
    if (event === "pass") {
        let listTab = document.querySelector(`#show-list_${guid}`);
        listTab.className += " active-tab";
    } else {
        event.target.className += " active-tab";
    }
    updateDeleteButton(guid);
    updateDefaultCheckbox(guid);
}

export function updateDeleteButton(listGuid) {
    const deleteBtn = document.querySelector(".delete-list-button");
    deleteBtn.id = `show-delete-list_${listGuid}`;
}

export function updateDefaultCheckbox (listGuid) {
    const defaultCb = document.querySelector(".make-default-checkbox");
    defaultCb.id = `make-displayed-list-default_${listGuid}`;
}

export function setDefaultList(listGuid) {
    let currentDefaultList = lists.find(({defaultList}) => defaultList === true);
    if (currentDefaultList !== undefined) {
        currentDefaultList.defaultList = false;
        let newDefaultList = lists.find(({listId}) => listId === listGuid);
        newDefaultList.defaultList = true;
        renderDefaultList(listGuid, currentDefaultList.listId);
    } else {
        let newDefaultList = lists.find(({listId}) => listId === listGuid);
        newDefaultList.defaultList = true;
        renderDefaultList(listGuid, undefined);
    }
    storeData();
}

export function getDefaultList() {
    let defaultList = lists.find(({defaultList}) => defaultList === true);
    return defaultList;
}

export function generateId() {
    return crypto.randomUUID();
}

export function removeListInputs() {
    listName.value = "";
    defaultList.checked = false;
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

function validateNewList() {
    if (listName.value == "") {
        displayListValidationAlert.showModal();
    } else {
        return "validated";
    }
}

function validateNewTodo() {
    if (todoName.value == "") {
            displayTodoValidationAlert.showModal();
        } else {
            return "validated";
        }
}

function validateEditTodo() {
    if (editTodoName.value == "") {
            displayTodoValidationAlert.showModal();
        } else {
            return "validated";
        }
}