import listUserRender from "./render/listUserRender.js";
import createButtonClickHandler from "./listeners/createButtonClickHandler.js";

window.addEventListener("DOMContentLoaded", () => {

    listUserRender();

    document
        .querySelector("#add-section > button")
        .addEventListener("click", createButtonClickHandler);
});