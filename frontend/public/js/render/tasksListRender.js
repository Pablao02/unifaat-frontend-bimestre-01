
import taskRender from "./taskRender.js";
import { tasksListApi } from "../api/tasksListApi.js";

export default async function tasksListRender(idUser, page = 1) {
    const container = document.querySelector("#tasks-container");

    container.innerHTML = "";

    const ulElement = document.createElement("ul");
    ulElement.id = "tasks-list";
    ulElement.classList.add("list-group");

    container.append(ulElement);

    try {
        const listApi = await tasksListApi({ page, limit: 10 });

        ulElement.innerHTML = "";

        if (listApi.data.length === 0) {
            const emptyElement = document.createElement("li");
            emptyElement.classList.add("list-group-item", "text-center", "text-muted");
            emptyElement.innerText = "Nenhuma tarefa encontrada. Crie uma nova!";
            ulElement.append(emptyElement);
        } else {
            listApi.data.forEach((task) => {
                const liElement = taskRender(task, idUser);
                ulElement.append(liElement);
            });
        }

        const totalPages = Math.ceil(listApi.total / listApi.limit);

        const paginationElement = document.createElement("div");
        paginationElement.classList.add(
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "mt-3"
        );

        const previousButton = document.createElement("button");
        previousButton.type = "button";
        previousButton.classList.add("btn", "btn-secondary");
        previousButton.innerText = "Anterior";
        previousButton.disabled = listApi.page <= 1;

        previousButton.addEventListener("click", async () => {
            await tasksListRender(idUser, listApi.page - 1);
        });

        const pageElement = document.createElement("span");
        pageElement.innerText = `Página ${listApi.page} de ${totalPages}`;

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.classList.add("btn", "btn-secondary");
        nextButton.innerText = "Próxima";
        nextButton.disabled = listApi.page >= totalPages;

        nextButton.addEventListener("click", async () => {
            await tasksListRender(idUser, listApi.page + 1);
        });

        paginationElement.append(
            previousButton,
            pageElement,
            nextButton
        );

        container.append(paginationElement);
    } catch (error) {
        const errorElement = document.createElement("div");
        errorElement.classList.add("alert", "alert-danger");
        errorElement.innerText = "Erro ao carregar tarefas.";
        container.append(errorElement);

        console.error(error);
    }
}