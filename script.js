const toDoList = document.querySelector(".toDoList");
const txtBox = document.querySelector("#txtBox");

document.querySelector("form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const p = document.createElement("p");
    p.innerHTML = txtBox.value;

    toDoList?.appendChild(p);
});
