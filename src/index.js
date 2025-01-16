import "./style.css";
import "./template.html";
import { distributeEventId } from "./render.js";

// document.addEventListener("DOMContentLoaded", function() {
//     const formControls = document.querySelectorAll(".fc");
//     formControls.forEach(function(fc) {
//         fc.addEventListener("click", function(e) {
//             console.log(e.target.id);
//             distributeEventId(e.target.id)
//         });
//     });
// });

const container = document.querySelector("body");
container.addEventListener("click", function(e) {
    if (e.target.classList.contains("fc")) {
        let actionGuid = e.target.id.split("_");
        console.log(`ACTION: ${actionGuid[0]}`, `GUID: ${actionGuid[1]}`);
        distributeEventId(actionGuid[0], actionGuid[1]);
    }
});