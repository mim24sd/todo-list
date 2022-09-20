const sideMenuContainer = document.getElementById("side-menu-container");
const openNavButton = document.getElementById("open-nav-button");
const closeNavButton = document.getElementById("close-nav-button");
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");
const titleError = document.getElementById("title-error");
const taskList = document.getElementById("task-list");
const sreachInput = document.getElementById("search-input");
const timeFilterDropdown = document.getElementById("filter-by-time-tasks");
const isDoneFilterDropdown = document.getElementById("filter-by-is-done-tasks");

const sideMenuContainerWidth = "200px";

let tasks = [];

openNavButton.addEventListener("click", () => {
  sideMenuContainer.style.width = sideMenuContainerWidth;
});

closeNavButton.addEventListener("click", () => {
  sideMenuContainer.style.width = "0";
});

addTaskButton.addEventListener("click", () => {
  const taskTitle = taskTitleInput.value.trim();

  if (taskTitle === "") {
    titleError.innerHTML = "Task title can not be empty!";
    titleError.classList.add("title-error");
  } else if (taskTitle.length < 3) {
    titleError.innerHTML = "Task title is too short!";
    titleError.classList.add("title-error");
  } else {
    titleError.innerHTML = "";
    titleError.classList.remove("title-error");

    tasks.push({
      id: tasks.length + 1,
      title: taskTitle,
      isDone: false,
      createdAt: new Date().toISOString(),
    });

    renderTasks(tasks);

    taskTitleInput.value = "";
  }
});

sreachInput.addEventListener("keypress", function (button) {
  if (button.key === "Enter") {
    filterTasksByTitle(sreachInput.value);
  }
});

timeFilterDropdown.addEventListener("change", (selectedTime) => {
  filterTasksByTime(selectedTime.target.value);
});

isDoneFilterDropdown.addEventListener("change", (selectedItem) => {
  filterTasksByIsDone(selectedItem.target.value);
});

function renderTasks(listOfTasks) {
  let tasksHtml = "";

  listOfTasks.forEach((task, index) => {
    index += 1;
    tasksHtml += createTaskItem(task, index);
  });

  taskList.innerHTML = tasksHtml;

  addCheckBoxEvent();
}

function createTaskItem(task, numberOfTask) {
  let liClassName = task.isDone ? "checked-table-box-row" : "table-box-row";

  return `<li class=${liClassName} id=task-${numberOfTask}>
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

function createTaskCheckBox(isDone) {
  return `<input
    type="checkbox"
    name="checkbox"
    class="check-box"
    ${handelCheckBox(isDone)}
  /> `;
}

function filterTasksByTitle(text) {
  renderTasks(tasks.filter((task) => task.title.includes(text)));
}

function filterTasksByTime(time) {
  switch (time) {
    case "today":
      renderTasks(filterTodayTasks());
      break;
    case "last-7-days":
      renderTasks(filterLastDaysTasks(7));
      break;
    case "last-30-days":
      renderTasks(filterLastDaysTasks(30));
      break;
    default:
      renderTasks(tasks);
  }
}

function filterTodayTasks() {
  return tasks.reduce((filteredTasks, task) => {
    if (new Date(task.createdAt) > new Date().setHours(0, 0, 0, 0)) {
      filteredTasks.push(task);
    }
    return filteredTasks;
  }, []);
}

function filterLastDaysTasks(days) {
  return tasks.reduce((filteredTasks, task) => {
    if (new Date(task.createdAt) > new Date() - days * 24 * 60 * 60 * 1000) {
      filteredTasks = [...filteredTasks, task];
    }
    return filteredTasks;
  }, []);
}

function handelCheckBox(isDone) {
  return isDone === true ? "checked = true" : "";
}

function addCheckBoxEvent() {
  const checkboxs = document.getElementsByClassName("check-box");
  const checkboxesArray = Array.from(checkboxs);

  tasks.forEach((task, indexOfTask) => {
    checkboxesArray.forEach((checkbox, indexOfCheckbox) => {
      if (indexOfTask == indexOfCheckbox) {
        checkbox.addEventListener("change", function () {
          if (this.checked) {
            checkbox.parentElement.classList.remove("table-box-row");
            checkbox.parentElement.classList.add("checked-table-box-row");

            task.isDone = true;
          } else {
            checkbox.parentElement.classList.remove("checked-table-box-row");
            checkbox.parentElement.classList.add("table-box-row");

            task.isDone = false;
          }
        });
      }
    });
  });
}

function filterTasksByIsDone(selectedItem) {
  let tasksForRender =
    selectedItem === "done"
      ? tasks.filter((task) => task.isDone === true)
      : tasks;

  renderTasks(tasksForRender);
}
