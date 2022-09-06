const sideMenuContainer = document.getElementById("side-menu-container");
const openNavButton = document.getElementById("open-nav-button");
const closeNavButton = document.getElementById("close-nav-button");
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");
const taskList = document.getElementById("task-list");
const taskSortSection = document.getElementById("sort-tasks");
const sreachInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const timeFilterSection = document.getElementById("filter-by-time-tasks");

const sideMenuContainerWidth = "200px";

let tasks = [
  {
    id: 22333,
    title: "lastDaaaay",
    isDone: false,
    createdAt: "2022-09-05T11:45:05.267Z",
  },
  {
    id: 225633,
    title: "totooooday",
    isDone: false,
    createdAt: "2022-09-06T11:45:05.267Z",
  },
  {
    id: 2256733,
    title: "lastWeeeeekkk",
    isDone: false,
    createdAt: "2022-09-01T11:45:05.267Z",
  },
  {
    id: 57533,
    title: "lastMonnni",
    isDone: false,
    createdAt: "2022-08-15T11:45:05.267Z",
  },
  {
    id: 22433,
    title: "day day past",
    isDone: false,
    createdAt: "2022-09-05T11:45:05.267Z",
  },
];
let allTasks = [];

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

  allTasks = tasks;

  renderTasks();
});

searchButton.addEventListener("click", () => {
  searchTitle(sreachInput.value);
});

taskSortSection.addEventListener("change", () => {
  const sortType = taskSortSection.options[taskSortSection.selectedIndex].value;

  sortTasks(sortType);
});

timeFilterSection.addEventListener("change", () => {
  const selectedTime =
    timeFilterSection.options[timeFilterSection.selectedIndex].value;

  filterTasksByTime(selectedTime);
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

function sortTasks(typeOfSort) {
  if (typeOfSort == "a-to-z") {
    sortTasksAtoZ();
  } else {
    unsortTasks();
  }
}

function sortTasksAtoZ() {
  const collator = new Intl.Collator("en", {
    numeric: true,
  });

  tasks = tasks.sort((randomTask1, randomTask2) =>
    collator.compare(
      randomTask1.title.toUpperCase(),
      randomTask2.title.toUpperCase()
    )
  );

  renderTasks();
}

function unsortTasks() {
  tasks.sort((randomTask1, randomTask2) => {
    const randomTask1ID = randomTask1.id;
    const randomTask2ID = randomTask2.id;
    let comparisonResult = 0;
    if (randomTask1ID > randomTask2ID) {
      comparisonResult = 1;
    } else if (randomTask1ID < randomTask2ID) {
      comparisonResult = -1;
    }
    return comparisonResult;
  });

  renderTasks();
}

function searchTitle(text) {
  if (text != null || "") {
    tasks = tasks.filter((task) => task.title.includes(text));
    renderTasks();
    tasks = allTasks;
  } else {
    renderTasks();
  }
}

function filterTasksByTime(time) {
  const peresentTime = new Date().toISOString();

  if (time == "today") {
    filterTodayTasks(peresentTime);
  } else if (time == "last-day") {
    filterLastDaysTasks(peresentTime, 1);
  } else if (time == "last-7-days") {
    filterLastDaysTasks(peresentTime, 7);
  } else if (time == "last-30-days") {
    filterLastDaysTasks(peresentTime, 30);
  }
}

function filterTodayTasks(newTime) {
  const peresentTime = newTime.substring(0, 10);
  let filteredTasks = [];

  tasks.forEach((task) => {
    if (task.createdAt.substring(0, 10) == peresentTime) {
      filteredTasks.push(task);
    }

    tasks = filteredTasks;
    renderTasks();
    tasks = allTasks;
  });
}

function filterLastDaysTasks(newTime, numberOfDays) {
  const peresentTimeDay = newTime.substring(8, 10);
  const peresentTimeMonth = newTime.substring(5, 7);
  const peresentTimeYear = newTime.substring(0, 4);

  const monthsWhichTheirLastMonthHas31Days = [02, 03, 04, 05, 06, 07];

  let lastDayDay = peresentTimeDay;
  let lastDayMonth = peresentTimeMonth;
  let lastDayYear = peresentTimeYear;
  let lastDaysDate = "";
  let filteredTasks = [];

  for (let day = peresentTimeDay; day > peresentTimeDay - numberOfDays; day--) {
    console.log(day);
    if (day == 1) {
      if (monthsWhichTheirLastMonthHas31Days.includes(peresentTimeMonth)) {
        lastDayDay = 31;
      } else {
        lastDayDay = 30;
      }

      if (peresentTimeMonth == 1) {
        lastDayMonth = 12;
        lastDayYear = peresentTimeYear - 1;
      } else {
        lastDayMonth -= 1;
        if (lastDayMonth < 10) {
          lastDayMonth = `0${lastDayMonth}`;
        }
      }
    } else {
      lastDayDay -= 1;
      if (lastDayDay < 10) {
        lastDayDay = `0${lastDayDay}`;
      }
    }
    tasks.forEach((task) => {
      if (
        task.createdAt.substring(0, 10) ==
        `${lastDayYear}-${lastDayMonth}-${lastDayDay}`
      ) {
        filteredTasks.push(task);
        console.log(
          task.createdAt.substring(0, 10),
          `${lastDayYear}-${lastDayMonth}-${lastDayDay}`
        );
      }

      tasks = filteredTasks;
      renderTasks();
      tasks = allTasks;
    });
  }
}
