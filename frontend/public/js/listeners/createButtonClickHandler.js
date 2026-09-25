import { users } from "../render/listUserRender.js";
import userRender from "../render/userRender.js";

export default function createButtonClickHandler(event) {

    event.preventDefault();

    const inputElement = event.currentTarget.parentElement.querySelector("input");

    const value = inputElement.value.trim();

    if (value === "") {
        return;
    }

    const newUser = {
        id: Date.now(),
        name: value,
        email: value
    };

    users.push(newUser);

    const ulElement = document.querySelector("#list-container ul");

    const liElement = userRender(newUser);

    ulElement.append(liElement);

    inputElement.value = "";
}