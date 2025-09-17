const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const dateInput = document.getElementById("dateInput");

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  saveTask(task);

  renderTask(task);
  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <div class="task-left">
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span>${task.text}</span>
    </div>
    <div class="task-actions">
      <button class="delete">✖</button>
    </div>
  `;

  const checkbox = li.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    updateTask(task);
    li.classList.toggle("completed");
  });

  li.querySelector(".delete").addEventListener("click", () => {
    deleteTask(task);
    li.remove();
  });

  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => renderTask(task));

  const savedDate = localStorage.getItem("todoDate");
  if (savedDate) dateInput.value = savedDate;

  dateInput.addEventListener("input", () => {
    localStorage.setItem("todoDate", dateInput.value);
  });
}

function updateTask(updatedTask) {
  let tasks = getTasks();
  tasks = tasks.map(task =>
    task.text === updatedTask.text ? updatedTask : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskToDelete) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.text !== taskToDelete.text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
