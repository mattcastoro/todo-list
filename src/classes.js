import { generateId } from "./utilities";

export class List {
    constructor(name, defaultList) {
        this.name = name;
        this.defaultList = defaultList;
        this.listId = generateId();
        this.todos = [];;
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
        this.complete = "not complete";
    }
};