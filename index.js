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
  let countTasks = 0;

  tasks.forEach((task) => {
    countTasks += 1;
    tasksHtml += createTaskItem(task, countTasks);
  });

  taskList.innerHTML = tasksHtml;
}

function createTaskItem(task, numberOfTask) {
  return `<li class="table-box-row" id=task-${numberOfTask}>
            ${createTaskTitle(task.title)}
            ${createTaskCreatedAt(task.createdAt)}
            ${createTaskCheckBox(task.isDone)}
          </li>`;
}

function createTaskTitle(taskTitle) {
  return `<p class="table-box-title"> 
            ${taskTitle} 
          </p>`;
}

function createTaskCreatedAt(taskCreatedAt) {
  const normalizedCreatedAt = taskCreatedAt.match(/\d\d:\d\d:\d\d/);

  return `<time class="table-box-time"> 
            ${normalizedCreatedAt} 
          </time>`;
}

function createTaskCheckBox() {
  return `<input
            type="checkbox"
            name="checkbox-done"
          /> `;
}

console.log(document.getElementById("filter-tasks")); 
