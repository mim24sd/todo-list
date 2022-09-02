const sideMenuContainer = document.getElementById("side-menu-container");
const openNavButton = document.getElementById("open-nav-button");
const closeNavButton = document.getElementById("close-nav-button");
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");
const taskList = document.getElementById("task-list");

const sideMenuContainerWidth = "200px";
const tasks = [];

openNavButton.addEventListener("click", () => {
  sideMenuContainer.style.width = sideMenuContainerWidth;
});

closeNavButton.addEventListener("click", () => {
  sideMenuContainer.style.width = "0";
});

addTaskButton.addEventListener("click", () => {
  tasks.push({
    id: tasks.length + 1,
    title: taskTitleInput.value,
    isDone: false,
    createdAt: new Date().toISOString(),
  });

  renderTasks();
});

function renderTasks() {
  let tasksHtml = "";

  tasks.forEach((task) => {
    tasksHtml += createTaskItem(task);
  });

  taskList.innerHTML = tasksHtml;
}

function createTaskItem(task) {
  return `<li class="table-box-row">
            ${createTaskTitle(task.title)}
            ${createTaskCreatedAt(task.createdAt)}
            ${createTaskCheckBox()}
          </li>`;
}

function createTaskTitle(taskTitle) {
  return `<div class="table-box-title"> 
            ${taskTitle} 
          </div>`;
}

function createTaskCreatedAt(taskCreatedAt) {
  const normalizedCreatedAt = taskCreatedAt.match(/\d\d:\d\d:\d\d/);

  return `<div class="table-box-title"> 
            ${normalizedCreatedAt} 
          </div>`;
}

function createTaskCheckBox() {
  return `<div class="table-box-check-box"> 
            <input
              type="checkbox"
              class="checkbox-done"
              name="checkbox-done"
            /> 
          </div>`;
}
