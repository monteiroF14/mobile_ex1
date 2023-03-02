const toDoListElement = document.querySelector(".toDoList");
const txtBox = document.querySelector("#txtBox");

function createListElement(listItem) {
    const d = document.createElement("div");
    d.classList.add("flex");

    const p = document.createElement("p");
    p.innerHTML = listItem;
    p.setAttribute("contentEditable", "true");

    const b = document.createElement("button");
    b.classList.add("removeBtn");
    b.innerHTML = "X";

    const c = document.createElement("input");
    c.setAttribute("type", "checkBox");

    d?.appendChild(c);
    d?.appendChild(p);
    d?.appendChild(b);

    toDoListElement?.appendChild(d);
}

let toDoList = [];

function loadToDoList() {
    if (!localStorage.getItem("toDoList")) {
        localStorage.setItem("toDoList", JSON.stringify([]));
        toDoList = localStorage.getItem("toDoList");
    } else {
        toDoList = localStorage.getItem("toDoList");
        toDoList = JSON.parse(toDoList);
        toDoList.forEach((item) => {
            createListElement(item.value);
            if (item.isDone === true) {
                makeLineThrough(item);
                checkListItem(item.value);
            }
        });
    }
}

function checkListItem(item) {
    document.querySelectorAll('input[type="checkBox"]').forEach((check) => {
        if (check.parentElement.children[1].innerHTML === item) {
            check.checked = true;
        }
    });
}

function makeLineThrough(item) {
    if (item) {
        document.querySelectorAll('input[type="checkBox"]').forEach((check) => {
            check.parentElement.children[1].style.textDecoration = "line-through";
        });
    }

    document.querySelectorAll('input[type="checkBox"]').forEach((check) => {
        check.addEventListener("change", () => {
            if (check.checked) {
                check.parentElement.children[1].style.textDecoration = "line-through";

                toDoList.find((item) => {
                    if (item.value === check.parentElement.children[1].innerHTML) {
                        item.isDone = true;
                    }
                });
            } else {
                check.parentElement.children[1].style.textDecoration = "none";

                toDoList.find((item) => {
                    if (item.value === check.parentElement.children[1].innerHTML) {
                        item.isDone = false;
                    }
                });
            }

            localStorage.setItem("toDoList", JSON.stringify(toDoList));
        });
    });
}

function removeFromToDoList() {
    document.querySelectorAll(".removeBtn")?.forEach((btn) => {
        btn.addEventListener("click", () => {
            const pos = toDoList.indexOf(btn.parentElement.children[1].innerHTML);

            toDoList = localStorage.getItem("toDoList");
            toDoList = JSON.parse(toDoList);
            toDoList.splice(pos, 1);
            localStorage.setItem("toDoList", JSON.stringify(toDoList));

            btn?.parentElement?.remove();
        });
    });
}

document.querySelector("form")?.addEventListener("submit", (event) => {
    function addToLocalStorage(status = false) {
        toDoList.push({
            value: txtBox.value,
            isDone: status,
        });

        localStorage.setItem("toDoList", JSON.stringify(toDoList));
    }

    event.preventDefault();

    createListElement(txtBox.value);
    addToLocalStorage();

    txtBox.value = "";
});

onload = () => {
    loadToDoList();
    makeLineThrough();
    removeFromToDoList();
};
