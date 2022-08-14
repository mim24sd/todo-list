const sideMenuContainer = document.getElementById("side-menu-container");
const openNavButton = document.getElementById("open-nav-button");
const closeNavButton = document.getElementById("close-nav-button");
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");
const taskTable = document.getElementById("task-table");
const tasks = [];

openNavButton.addEventListener("click", () => {
  sideMenuContainer.style.width = "200px";
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

  tasks.forEach((task) => {
    const taskCreatedAt = Object.values(task)[3]
      .toString()
      .match(/\d\d:\d\d:\d\d/);
    const taskItems = document.createElement("task-table");
    taskItems.className = "table-box-row";

    taskItems.innerHTML = `
      <li class="table-box-task" id="show-task-title"> 
      ${Object.values(task)[1]} 
      </li> 
      <li class="table-box-time" id="show-task-time"> 
      ${taskCreatedAt} 
      </li> 
      <li class="table-box-check-box"> 
      <input
          class="table-box-check"
          type="checkbox"
          id="checkbox-done"
          name="checkbox-done"
        /> 
      </li>`;
    taskTable.append(taskItems);
  });
});
