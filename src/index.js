import "./style.css";
import "./template.html";
import { distributeEventId } from "./render.js";

document.addEventListener("DOMContentLoaded", function() {
    const formControls = document.querySelectorAll(".fc");
    formControls.forEach(function(fc) {
        fc.addEventListener("click", function(e) {
            console.log(e.target.id);
            distributeEventId(e.target.id)
        });
    });
});