import { List, Todo } from "./classes.js";

const lists = [];

export function createList() {
    let name = document.querySelector("#list-name");
    lists.push(new List(name.value));
    console.log(lists);
    name.value = "";
}

export function createTodo() {
    let name = document.querySelector("#todo-name");
    let desc = document.querySelector("#todo-desc");
    let dueDate = document.querySelector("#todo-due-date");
    let priority = document.querySelector("#todo-priority");
    console.log(name.value, desc.value, dueDate.value, priority.value);
}