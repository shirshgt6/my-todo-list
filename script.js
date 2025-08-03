const inputEl  = document.getElementById("new-task");
const addBtn    = document.getElementById("add-btn");
const listEl    = document.getElementById("task-list");
const emptyMsg  = document.getElementById("no-tasks-msg");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.addEventListener("DOMContentLoaded", () => {
  render();
});

addBtn.addEventListener("click", () => {
  const text = inputEl.value.trim();
  if (!text) {
    alert("Please enter a task");
    return;
  }
  tasks.push({ text, done: false });
  inputEl.value = "";
  save();
  render();
});

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  // 🧹 Clear previous items so no duplication
  listEl.innerHTML = "";

  if (tasks.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " completed" : "");
    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""}>
      <span class="task-text">${task.text}</span>
      <div class="task-btns">
        <button class="edit-btn">✏️</button>
        <button class="del-btn">✖️</button>
      </div>
    `;
    listEl.appendChild(li);

    li.querySelector("input").addEventListener("change", () => {
      tasks[i].done = !tasks[i].done;
      save();
      render();
    });
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const updated = prompt("Edit task:", task.text);
      if (updated !== null && updated.trim() && updated.trim() !== task.text) {
        tasks[i].text = updated.trim();
        save();
        render();
      }
    });
    li.querySelector(".del-btn").addEventListener("click", () => {
      tasks.splice(i, 1);
      save();
      render();
    });
  });
}

