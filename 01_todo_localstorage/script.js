document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTask(task));

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
    });

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.textContent = task.text;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        // Edit / Save functionality
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (editBtn.textContent === "Edit") {
                const input = document.createElement("input");
                input.type = "text";
                input.value = task.text;
                li.insertBefore(input, span);
                li.removeChild(span);
                editBtn.textContent = "Save";
            } else {
                const input = li.querySelector("input");
                task.text = input.value.trim();
                span.textContent = task.text;
                li.insertBefore(span, input);
                li.removeChild(input);
                editBtn.textContent = "Edit";
                saveTasks();
            }
        });

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTasks();
        });

        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
