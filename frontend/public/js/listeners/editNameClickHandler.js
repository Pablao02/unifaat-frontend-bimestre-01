import { userUpdateApi } from "../api/userUpdateApi.js";
import listUserRender from "../render/listUserRender.js";

export default function editNameClickHandler(event) {

    const liElement = event.currentTarget.parentElement.parentElement;
    const userId = liElement.dataset.userId;

    const infoElement = liElement.querySelector("div");

    const nameElement = infoElement.querySelector("span");
    const emailElement = infoElement.querySelector("small");

    if (!nameElement || !emailElement) {
        return;
    }

    const oldName = nameElement.innerText;
    const oldEmail = emailElement.innerText;

    const nameInputElement = document.createElement("input");
    nameInputElement.type = "text";
    nameInputElement.value = oldName;
    nameInputElement.classList.add("form-control", "form-control-sm", "mb-1");

    const emailInputElement = document.createElement("input");
    emailInputElement.type = "email";
    emailInputElement.value = oldEmail;
    emailInputElement.classList.add("form-control", "form-control-sm");

    const buttonsElement = liElement.querySelector("div:last-child");

    const buttonSaveElement = document.createElement("button");
    buttonSaveElement.type = "button";
    buttonSaveElement.classList.add("btn", "btn-success", "btn-sm");
    buttonSaveElement.innerText = "Salvar";

    const buttonCancelElement = document.createElement("button");
    buttonCancelElement.type = "button";
    buttonCancelElement.classList.add("btn", "btn-secondary", "btn-sm");
    buttonCancelElement.innerText = "Cancelar";

    nameElement.remove();
    emailElement.remove();

    infoElement.prepend(
        emailInputElement
    );

    infoElement.prepend(
        nameInputElement
    );

    buttonsElement.innerHTML = "";

    buttonsElement.append(
        buttonSaveElement,
        buttonCancelElement
    );

    async function saveEdit() {

        const newName = nameInputElement.value.trim();
        const newEmail = emailInputElement.value.trim();

        if (newName === "" || newEmail === "") {
            alert("Nome e e-mail não podem ficar vazios.");
            return;
        }

        buttonSaveElement.disabled = true;
        buttonCancelElement.disabled = true;

        try {
            await userUpdateApi(userId, {
                name: newName,
                email: newEmail
            });

            const currentPage = document.querySelector(
                "#list-container"
            ).dataset.currentPage || 1;

            await listUserRender(Number(currentPage));

        } catch (error) {
            console.error(error);
            alert("Não foi possível atualizar o usuário.");

            buttonSaveElement.disabled = false;
            buttonCancelElement.disabled = false;
        }
    }

    buttonSaveElement.addEventListener("click", saveEdit);

    buttonCancelElement.addEventListener("click", () => {
        listUserRender(
            Number(
                document.querySelector("#list-container").dataset.currentPage || 1
            )
        );
    });

    nameInputElement.focus();
}
