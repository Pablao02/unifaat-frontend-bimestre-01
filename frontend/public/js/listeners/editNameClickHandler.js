export default function editNameClickHandler(event) {

    const liElement = event.currentTarget;

    if (event.target.tagName !== "SPAN") {
        return;
    }

    const nameElement = liElement.querySelector("span");

    if (!nameElement) {
        return;
    }

    const oldName = nameElement.innerText;

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("value", oldName);
    inputElement.classList.add("form-control", "form-control-sm");

    const buttonAlterElement = document.createElement("button");
    buttonAlterElement.setAttribute("type", "button");
    buttonAlterElement.classList.add("btn", "btn-primary", "btn-sm");
    buttonAlterElement.innerText = "Alterar";

    const buttonDeleteElement = liElement.querySelector(".btn-danger");

    nameElement.remove();

    if (buttonDeleteElement) {
        buttonDeleteElement.remove();
    }

    liElement.querySelector("div").prepend(inputElement, buttonAlterElement);

    function confirmEdit() {

        const newName = inputElement.value.trim();

        if (newName === "") {
            inputElement.focus();
            return;
        }

        const newNameElement = document.createElement("span");
        newNameElement.innerText = newName;

        inputElement.remove();
        buttonAlterElement.remove();

        liElement.querySelector("div").prepend(newNameElement);

        if (buttonDeleteElement) {
            liElement.append(buttonDeleteElement);
        }
    }

    buttonAlterElement.addEventListener("click", (event) => {
        event.stopPropagation();
        confirmEdit();
    });

    inputElement.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            confirmEdit();
        }

    });

    inputElement.focus();
}