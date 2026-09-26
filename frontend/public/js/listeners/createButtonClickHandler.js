import { userCreateApi } from "../api/userCreateApi.js";
import listUserRender from "../render/listUserRender.js";

export default async function createButtonClickHandler(event) {

    event.preventDefault();

    const inputElement = event.currentTarget.parentElement.querySelector("input");

    const value = inputElement.value.trim();

    if (value === "") {
        return;
    }

    try {

        await userCreateApi({
            name: value,
            email: value
        });

        await listUserRender();

        inputElement.value = "";

    } catch (error) {

        console.error(error);

        alert("Não foi possível criar o usuário.");

    }
}
