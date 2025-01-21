import "./style.css";
import "./template.html";
import { renderEvents } from "./render.js";

const container = document.querySelector("body");
container.addEventListener("click", function(event) {
    if (event.target.classList.contains("fc")) {
        let actionGuid = event.target.id.split("_");
        console.log(`ACTION: ${actionGuid[0]}`, `GUID: ${actionGuid[1]}`);
        renderEvents(actionGuid[0], actionGuid[1], event);
    }
});