import tasksListRender from "../render/tasksListRender.js";
import { taskUpdateApi } from "../api/taskUpdateApi.js";

export default async function taskEditHandler(event) {
    const liElement = event.target.closest("li");
    const idUser = liElement.userId;
    const taskId = liElement.taskId;
    const nameElement = liElement.querySelector(".task-name");

    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = nameElement.innerText;
    inputElement.classList.add("form-control", "me-2");

    nameElement.replaceWith(inputElement);
    inputElement.focus();

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.innerText = "Salvar";
    saveButton.classList.add("btn", "btn-success", "btn-sm");

    event.target.replaceWith(saveButton);

    const saveTask = async () => {
        const name = inputElement.value.trim();

        if (!name) {
            alert("O nome da tarefa não pode ficar vazio.");
            inputElement.focus();
            return;
        }

        try {
            await taskUpdateApi(taskId, { name });
            await tasksListRender(idUser);
        } catch (error) {
            alert("Erro ao alterar tarefa");
            console.error(error);
        }
    };

    saveButton.addEventListener("click", saveTask);

    inputElement.addEventListener("keydown", async (keyboardEvent) => {
        if (keyboardEvent.key === "Enter") {
            await saveTask();
        }
    });
}