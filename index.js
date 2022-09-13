const sideMenuContainer = document.getElementById("side-menu-container");
const openNavButton = document.getElementById("open-nav-button");
const closeNavButton = document.getElementById("close-nav-button");
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");
const taskList = document.getElementById("task-list");
// const sortTaskDropdown = document.getElementById("sort-tasks");
const sreachInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const timeFilterDropdown = document.getElementById("filter-by-time-tasks");

const sideMenuContainerWidth = "200px";

let tasks = [];

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

  renderTasks(tasks);
});

searchButton.addEventListener("click", () => {
  filterTasksByTitle(sreachInput.value);
});

// sortTaskDropdown.addEventListener("change", () => {
//   const sortType =
//     sortTaskDropdown.options[sortTaskDropdown.selectedIndex].value;

//   sortTasks(sortType);
// });

timeFilterDropdown.addEventListener("change", () => {
  const selectedTime =
    timeFilterDropdown.options[timeFilterDropdown.selectedIndex].value;

  filterTasksByTime(selectedTime);
});

function renderTasks(listOfTasks) {
  let tasksHtml = "";

  listOfTasks.forEach((task, index) => {
    index += 1;
    tasksHtml += createTaskItem(task, index);
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

// function sortTasks(sortType) {
//   if (sortType == "byTitle") {
//     renderTasks(sortTasksByTitle());
//   } else {
//     renderTasks(unsortTasks());
//   }
// }

// function sortTasksByTitle() {
//   const collator = new Intl.Collator("en", {
//     numeric: true,
//   });

//   return tasks.sort((randomTask1, randomTask2) =>
//     collator.compare(
//       randomTask1.title.toUpperCase(),
//       randomTask2.title.toUpperCase()
//     )
//   );
// }

// function unsortTasks() {
//   return tasks.sort((task1, task2) => (task1.id > task2.id ? 1 : -1));
// }

function filterTasksByTitle(text) {
  renderTasks(tasks.filter((task) => task.title.includes(text)));
}

function filterTasksByTime(time) {
  if (time == "") {
    renderTasks(tasks);
  }
  if (time == "today") {
    renderTasks(filterTodayTasks());
  } else if (time == "last-day") {
    renderTasks(filterLastDayTasks());
  } else if (time == "last-7-days") {
    renderTasks(filterLast7DaysTasks());
  } else if (time == "last-30-days") {
    renderTasks(filterLast30DaysTasks());
  }
}

function filterTodayTasks() {
  let filteredTasks = [];

  tasks.forEach((task) => {
    const taskTime = new Date(task.createdAt).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    if (taskTime == today) {
      filteredTasks.push(task);
    }
  });
  return filteredTasks;
}

function filterLastDayTasks() {
  let filteredTasks = [];

  tasks.forEach((task) => {
    const taskTime = new Date(task.createdAt).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    if (taskTime == today - 1 * 24 * 60 * 60 * 1000) {
      filteredTasks.push(task);
    }
  });
  return filteredTasks;
}

function filterLast7DaysTasks() {
  let filteredTasks = [];

  tasks.forEach((task) => {
    const taskTime = new Date(task.createdAt).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    if (taskTime > today - 7 * 24 * 60 * 60 * 1000) {
      filteredTasks.push(task);
    }
  });
  return filteredTasks;
}

function filterLast30DaysTasks() {
  let filteredTasks = [];

  tasks.forEach((task) => {
    const taskTime = new Date(task.createdAt).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    if (taskTime > today - 30 * 24 * 60 * 60 * 1000) {
      filteredTasks.push(task);
    }
  });
  return filteredTasks;
}
