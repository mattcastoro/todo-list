export class List {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
};

export class Todo {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
};