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
    createdAt: "2022-09-06T11:45:05.267Z",
  },
  {
    id: 225633,
    title: "totooooday",
    isDone: false,
    createdAt: "2022-09-07T11:45:05.267Z",
  },
  {
    id: 2256733,
    title: "lastWeeeeekkk",
    isDone: false,
    createdAt: "2022-09-02T11:45:05.267Z",
  },
  {
    id: 57533,
    title: "lastMonnni",
    isDone: false,
    createdAt: "2022-08-16T11:45:05.267Z",
  },
  {
    id: 22433,
    title: "day day past",
    isDone: false,
    createdAt: "2022-09-06T11:45:05.267Z",
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

  if (time == "no-exact-time") {
    renderTasks();
  }
  if (time == "today") {
    filterTodayTasks(peresentTime);
  } else if (time == "last-day") {
    filterLastDayTasks(peresentTime);
  } else if (time == "last-7-days") {
    filterLast7DaysTasks(peresentTime);
  } else if (time == "last-30-days") {
    filterLast30DaysTasks(peresentTime);
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
    // is it important?
  });
}

function filterLastDayTasks(time) {
  let filteredTasks = [];

  tasks.forEach((task) => {
    CalculateLastDaysTasks(time, 1).forEach((date) => {
      if (task.createdAt.substring(0, 10) == date) {
        filteredTasks.push(task);
      }

      tasks = filteredTasks;
      renderTasks();
      tasks = allTasks;
    });
  });
}

function filterLast7DaysTasks(time) {
  const peresentTime = time.substring(0, 10);
  let filteredTasks = [];

  tasks.forEach((task) => {
    CalculateLastDaysTasks(time, 7).forEach((date) => {
      if (task.createdAt.substring(0, 10) == date) {
        filteredTasks.push(task);
      }
    });

    if (task.createdAt.substring(0, 10) == peresentTime) {
      filteredTasks.push(task);
    }

    tasks = filteredTasks;
    renderTasks();
    tasks = allTasks;
  });
}

function filterLast30DaysTasks(time) {
  const peresentTime = time.substring(0, 10);
  let filteredTasks = [];

  tasks.forEach((task) => {
    CalculateLastDaysTasks(time, 30).forEach((date) => {
      if (task.createdAt.substring(0, 10) == date) {
        filteredTasks.push(task);
      }
    });

    if (task.createdAt.substring(0, 10) == peresentTime) {
      filteredTasks.push(task);
    }

    tasks = filteredTasks;
    renderTasks();
    tasks = allTasks;
  });
}

function CalculateLastDaysTasks(newTime, numberOfDays) {
  const peresentTimeDay = newTime.substring(8, 10);
  const peresentTimeMonth = newTime.substring(5, 7);
  const peresentTimeYear = newTime.substring(0, 4);

  const monthsWhichTheirLastMonthHas31Days = [02, 03, 04, 05, 06, 07];

  let lastDaysDay = peresentTimeDay;
  let lastDaysMonth = peresentTimeMonth;
  let lastDaysYear = peresentTimeYear;

  let filteredDate = [];

  // 3 ta paEni ba 3 ta balaE ta ye jaE yekian okeye k joda neveshtam dg? bazi jaha az ykishun estefade shode.doroste?
  // hes mikonm bazi jaha chon pichide shode shayad az moteghayere dorost estefade nakarde basham :(

  for (let day = peresentTimeDay; day > peresentTimeDay - numberOfDays; day--) {
    if (day == 1) {
      if (monthsWhichTheirLastMonthHas31Days.includes(peresentTimeMonth)) {
        lastDaysDay = 31;
      } else {
        lastDaysDay = 30;
      }

      if (peresentTimeMonth == 1) {
        lastDaysMonth = 12;
        lastDaysYear = peresentTimeYear - 1;
      } else {
        lastDaysMonth -= 1;
        if (lastDaysMonth < 10) {
          lastDaysMonth = `0${lastDaysMonth}`;
        }
      }
    } else {
      lastDaysDay -= 1;
      if (lastDaysDay < 10) {
        lastDaysDay = `0${lastDaysDay}`;
      }
    }

    filteredDate.push(`${lastDaysYear}-${lastDaysMonth}-${lastDaysDay}`);
  }

  return filteredDate;
}
