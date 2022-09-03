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

  selectTasks(selectedTask);
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

function selectTasks(selectedfilter) {
  if (selectedfilter == "noFilter") {
    renderTasks();
  } else if (selectedfilter == "isDone") {
    return null;
  } else if (selectedfilter == "title") {
    filterTasksByTitle();
  } else if (selectedfilter == "date") {
    return null;
  }
}

function filterTasksByTitle() {
  tasks.sort((randomTask1, randomTask2) => {
    const randomTask1Title = randomTask1.title.toUpperCase();
    const randomTask2Tile = randomTask2.title.toUpperCase();

    let comparisonResult = 0;

    if (randomTask1Title > randomTask2Tile) {
      comparisonResult = 1;
    } else if (randomTask1Title < randomTask2Tile) {
      comparisonResult = -1;
    }
    return comparisonResult;
  });

  renderTasks();
}
