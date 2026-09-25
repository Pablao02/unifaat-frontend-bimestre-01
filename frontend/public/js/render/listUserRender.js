import userRender from "./userRender.js";

export const users = [
    {
        id: 1,
        name: "João",
        email: "joao@email.com"
    },
    {
        id: 2,
        name: "Maria",
        email: "maria@email.com"
    },
    {
        id: 3,
        name: "Pedro",
        email: "pedro@email.com"
    }
];

export default function listUserRender() {

    const sectionListElement = document.querySelector("#list-container");

    while (sectionListElement.firstChild) {
        sectionListElement.firstChild.remove();
    }

    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");

    sectionListElement.append(ulElement);

    users.forEach((user) => {
        const liElement = userRender(user);
        ulElement.append(liElement);
    });
}