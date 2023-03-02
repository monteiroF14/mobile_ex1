document.querySelector("form")?.addEventListener("submit", (e) => {
    const toDoList = document.querySelector(".toDoList");
    const txtBox = document.querySelector("#txtBox");

    e.preventDefault();

    const d = document.createElement("div");
    d.setAttribute("class", "flex");

    const p = document.createElement("p");
    p.innerHTML = txtBox.value;
    p.setAttribute("contentEditable", "true");

    const b = document.createElement("button");
    b.setAttribute("class", "removeBtn");
    b.innerHTML = "X";

    const c = document.createElement("input");
    c.setAttribute("type", "checkBox");

    d?.appendChild(c);
    d?.appendChild(p);
    d?.appendChild(b);

    toDoList?.appendChild(d);

    document.querySelectorAll(".removeBtn")?.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn?.parentElement?.remove();
        });
    });

    document.querySelectorAll('input[type="checkBox"]').forEach((check) => {
        check.addEventListener("change", () => {
            if (this.checked) {
                console.log(check.parentElement);
            }
        });
    });
});
