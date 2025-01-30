import { loadDisplay, displayLocalStorageAlert } from "./render.js";

export let lists = [];

if (storageAvailable("localStorage")) {
    retrieveData();
} else {
    displayLocalStorageAlert.showModal();
}

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

export function storeData() {
    localStorage.setItem("lists", JSON.stringify(lists));
}

function retrieveData() {
    const storedData = localStorage.getItem("lists");
    const parsedData = JSON.parse(storedData);
    lists = parsedData;
    if (!parsedData) {
        lists = [];
    } else {
        loadDisplay(lists);
    }
}