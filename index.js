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
  return `<ul class="table-box-row">
            ${createTaskTitle(task.title)}
            ${createTaskCreatedAt(task.createdAt)}
            ${createTaskCheckBox()}
          </ul>`;
}

function createTaskTitle(taskTitle) {
  return `<li class="table-box-title"> 
            ${taskTitle} 
          </li>`;
}

function createTaskCreatedAt(taskCreatedAt) {
  const normalizedCreatedAt = taskCreatedAt.match(/\d\d:\d\d:\d\d/);

  return `<li class="table-box-title"> 
            ${normalizedCreatedAt} 
          </li>`;
}

function createTaskCheckBox() {
  return `<li class="table-box-check-box"> 
            <input
              type="checkbox"
              class="checkbox-done"
              name="checkbox-done"
            /> 
          </li>`;
}
