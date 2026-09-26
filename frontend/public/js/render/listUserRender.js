import { userListApi } from "../api/userListApi.js";
import userRender from "./userRender.js";

let currentPage = 1;

export default async function listUserRender(page = 1) {

    const sectionListElement = document.querySelector("#list-container");

    while (sectionListElement.firstChild) {
        sectionListElement.firstChild.remove();
    }

    const response = await userListApi({ page });

    currentPage = response.page;
    sectionListElement.dataset.currentPage = currentPage;

    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");

    response.data.forEach((user) => {
        const liElement = userRender(user);
        ulElement.append(liElement);
    });

    sectionListElement.append(ulElement);

    const paginationElement = document.createElement("div");

    paginationElement.classList.add(
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "mt-3"
    );

    const previousButton = document.createElement("button");

    previousButton.type = "button";
    previousButton.classList.add("btn", "btn-secondary", "btn-sm");
    previousButton.innerText = "Anterior";

    previousButton.disabled = currentPage <= 1;

    previousButton.addEventListener("click", () => {
        if (currentPage > 1) {
            listUserRender(currentPage - 1);
        }
    });

    const pageElement = document.createElement("span");

    pageElement.innerText = `Página ${response.page} de ${Math.ceil(
        response.total / response.limit
    )}`;

    const nextButton = document.createElement("button");

    nextButton.type = "button";
    nextButton.classList.add("btn", "btn-primary", "btn-sm");
    nextButton.innerText = "Próxima";

    nextButton.disabled = !response.next;

    nextButton.addEventListener("click", () => {
        if (response.next) {
            listUserRender(currentPage + 1);
        }
    });

    paginationElement.append(
        previousButton,
        pageElement,
        nextButton
    );

    sectionListElement.append(paginationElement);
}
