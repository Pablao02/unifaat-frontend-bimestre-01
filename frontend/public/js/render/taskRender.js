import taskToggleHandler from "../listeners/taskToggleHandler.js";
import taskDeleteHandler from "../listeners/taskDeleteHandler.js";
import taskEditHandler from "../listeners/taskEditHandler.js";

export default function taskRender(task, idUser) {
    const liElement = document.createElement("li");
    liElement.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );

    liElement.taskId = task.id;
    liElement.userId = idUser;

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.classList.add("form-check-input", "me-2");
    checkboxElement.checked = task.is_done;
    checkboxElement.addEventListener("change", taskToggleHandler);

    const nameElement = document.createElement("span");
    nameElement.innerText = task.name;
    nameElement.classList.add("flex-grow-1", "task-name");

    if (task.is_done) {
        nameElement.classList.add(
            "text-decoration-line-through",
            "text-muted"
        );
    }

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.innerText = "Editar";
    editButton.classList.add("btn", "btn-warning", "btn-sm", "me-2");
    editButton.addEventListener("click", taskEditHandler);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.innerText = "Excluir";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.addEventListener("click", taskDeleteHandler);

    liElement.append(
        checkboxElement,
        nameElement,
        editButton,
        deleteButton
    );

    return liElement;
}