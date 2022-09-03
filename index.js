const sideMenuContainer = document.getElementById("side-menu-container");
const openNavButton = document.getElementById("open-nav-button");
const closeNavButton = document.getElementById("close-nav-button");
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");
const taskList = document.getElementById("task-list");
const taskSelection = document.getElementById("filter-tasks");

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

taskSelection.addEventListener("change", () => {
  const taskSelection = document.getElementById("filter-tasks");
  const selectedTask = taskSelection.options[taskSelection.selectedIndex].value;

  console.log(selectedTask);

  selectTask(selectedTask);
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

function selectTask(selectedfilter) {
  if (selectedfilter == "noFilter") {
    return null;
  } else if (selectedfilter == "isDone") {
    return null;
  } else if (selectedfilter == "title") {
    return null;
  } else if (selectedfilter == "date") {
    return null;
  }
}
