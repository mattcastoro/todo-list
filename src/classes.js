import { generateId } from "./utilities";

export class List {
    constructor(name) {
        this.name = name;
        this.listId = generateId();
        this.todos = [];
    }
    get values() {
        return this.name;
    }
};

export class Todo {
    constructor(name, description, dueDate, priority, listId) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.todoId = generateId();
        this.listId = listId;
    }
};