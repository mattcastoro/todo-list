import editTodoImage from "./assets/icon--view-todo.svg";
import deleteTodoImage from "./assets/icon--delete-todo.svg"

import { createList, createTodo, removeListInputs, removeTodoInputs, lists, setTabs, retrieveList, updateCompleteStatus, setId, editTodo, showTodoValues, updateDeleteButton, deleteList, deleteTodo, updateDefaultCheckbox, setDefaultList, getDefaultList } from "./utilities";

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
            displayTodos(list.todos, list.name, list.defaultList);
            break;

        //DELETE LIST
        case "show-delete-list":
            if (lists.length === 0) {
            } else {
                setId(action, guid);
                displayDeleteList.showModal();
            }
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
            if (lists.length === 0) {
            } else {
                displayAddTodo.showModal();
            }
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
            setId(action, guid);
            displayDeleteTodo.showModal();
            break;
        case "cancel-delete-todo":
            displayDeleteTodo.close();
            break;
        case "delete-delete-todo":
            deleteTodo(guid);
            displayDeleteTodo.close();
            break;

        //MAKE DISPLAYED LIST DEFAULT
        case "make-displayed-list-default":
            if (lists.length === 0) {
            } else {
                setDefaultList(guid);
                let [list1, listGuid1] = retrieveList();
                displayTodos(list1.todos, list1.name, list1.defaultList);
            }
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
    console.log(lastList);
    lastList.forEach((element) => {
        const listSection = document.querySelector(".lists-section");
        const list = document.createElement("button");
        list.classList.add("fc", "foc", "list-tab", "active-tab");
        list.setAttribute("id", `show-list_${element.listId}`);
        list.textContent = element.name;
        listSection.appendChild(list);
        updateDeleteButton(element.listId);
        updateDefaultCheckbox(element.listId);
        displayTodos(element.todos, element.name, element.defaultList);
    });
}

export function displayTodos(todoList, listName, listDefault) {
    const todoListTitle = document.querySelector(".main--title");
    todoListTitle.textContent = listName;

    const todoSection = document.querySelector(".todos-section");
    todoSection.textContent = "";

    const defaultListCb = document.querySelector('[id ^= "make-displayed-list-default"]');
    const defaultListTitle = document.querySelector("#default-list-title");
    if (listDefault === true) {
        defaultListCb.checked = true;
        defaultListCb.disabled = true;
        defaultListTitle.textContent = "default list";
    } else {
        defaultListCb.checked = false;
        defaultListCb.disabled = false;
        defaultListTitle.textContent = "make default";
    }
    
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
            shiftCompletedTodo(todoList[j]);
        }
    }
}

export function removeList(listGuid) {
    const listsSection = document.querySelector(".lists-section");
    const listContainer = document.querySelector(`#show-list_${listGuid}`);
    listsSection.removeChild(listContainer);

    const todoSection = document.querySelector(".todos-section");
    todoSection.textContent = "";

    const mainTitle = document.querySelector(".main--title");
    mainTitle.textContent = "";
}

export function removeTodo(todoGuid) {
    const todoSection = document.querySelector(".todos-section");
    const todoContainer = document.querySelector(`.todo-container_${todoGuid}`);
    todoSection.removeChild(todoContainer);
}

export function shiftCompletedTodo(todo) {
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

export function renderDefaultList(newListGuid, oldListGuid) {
    if (oldListGuid !== undefined) {
        let oldDefaultListBtn = document.querySelector(`#show-list_${oldListGuid}`);
        oldDefaultListBtn.classList.remove("default-list");
    }
    let listsSection = document.querySelector(".lists-section");
    let newDefaultListBtn = document.querySelector(`#show-list_${newListGuid}`);
    newDefaultListBtn.classList.add("default-list");
    listsSection.insertBefore(newDefaultListBtn, listsSection.firstChild);
}

export function loadDisplay(pulledLists) {
    console.log(pulledLists);
    pulledLists.forEach((element) => {
        const listsSection = document.querySelector(".lists-section");

        const list = document.createElement("button");
        list.classList.add("fc", "foc", "list-tab");
        list.setAttribute("id", `show-list_${element.listId}`);
        list.textContent = element.name;
        listsSection.appendChild(list);
        if (element.defaultList === true) {
            let defaultListBtn = document.querySelector(`#show-list_${element.listId}`);
            list.classList.add("active-tab", "default-list");
            listsSection.insertBefore(defaultListBtn, listsSection.firstChild);
            displayTodos(element.todos, element.listName, element.defaultList);
        }
    })
}