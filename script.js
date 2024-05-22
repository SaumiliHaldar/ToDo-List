const mainTodoElem = document.querySelector(".todoListElem");
const inputValue = document.getElementById("inputValue");

const getTodoListData = () => {
    return JSON.parse(localStorage.getItem("myTodoList")) || [];
}

const addTodoListLocalStorage = (localTodoLists) => {
    localStorage.setItem("myTodoList", JSON.stringify(localTodoLists));
}

let localTodoLists = getTodoListData();

const addTodoDynamicElement = (curElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("mainTodoDiv");
    divElement.innerHTML = `<li>${curElem}</li> <button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(divElement);
}

const addTodoList = (e) => {
    e.preventDefault();
    const todoListValue = inputValue.value.trim();

    inputValue.value = "";

    if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
        localTodoLists.push(todoListValue);
        localTodoLists = [...new Set(localTodoLists)];
        addTodoListLocalStorage(localTodoLists);
        addTodoDynamicElement(todoListValue);
    }
};

const showTodoList = () => {
    localTodoLists.forEach((curElem) => {
        addTodoDynamicElement(curElem);
    });
};

showTodoList();

const removeTodoElem = (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        const todoToRemove = e.target;
        const todoListContent = todoToRemove.previousElementSibling.innerText;
        const parentElem = todoToRemove.parentElement;

        localTodoLists = localTodoLists.filter((curTodo) => {
            return curTodo.toLowerCase() !== todoListContent.toLowerCase();
        });

        addTodoListLocalStorage(localTodoLists);
        parentElem.remove();
    }
};

mainTodoElem.addEventListener("click", (e) => {
    e.preventDefault();
    removeTodoElem(e);
});

document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
});