import editNameClickHandler from "../listeners/editNameClickHandler.js";

export default function userRender(user) {

    const liElement = document.createElement("li");

    liElement.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );

    liElement.dataset.userId = user.id;

    const infoElement = document.createElement("div");
    infoElement.classList.add("d-flex", "flex-column");

    const nameElement = document.createElement("span");
    nameElement.innerText = user.name;

    const emailElement = document.createElement("small");
    emailElement.classList.add("text-muted");
    emailElement.innerText = user.email;

    infoElement.append(nameElement, emailElement);
    liElement.append(infoElement);

    const buttonsElement = document.createElement("div");
    buttonsElement.classList.add("d-flex", "gap-2");

    const buttonEditElement = document.createElement("button");

    buttonEditElement.type = "button";
    buttonEditElement.classList.add(
        "btn",
        "btn-warning",
        "btn-sm"
    );

    buttonEditElement.innerText = "Editar";

    buttonEditElement.addEventListener("click", (event) => {
        event.stopPropagation();
        editNameClickHandler(event);
    });

    const buttonDeleteElement = document.createElement("button");

    buttonDeleteElement.type = "button";
    buttonDeleteElement.classList.add(
        "btn",
        "btn-danger",
        "btn-sm"
    );

    buttonDeleteElement.innerText = "Excluir";

    buttonDeleteElement.addEventListener("click", (event) => {
        event.stopPropagation();
        liElement.remove();
    });

    buttonsElement.append(
        buttonEditElement,
        buttonDeleteElement
    );

    liElement.append(buttonsElement);

    return liElement;
}
