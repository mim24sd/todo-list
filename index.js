const sideMenuContainer = document.getElementById("side-menu-container");
const openNavButton = document.getElementById("open-nav-button");
const closeNavButton = document.getElementById("close-nav-button");
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");
const taskTable = document.getElementById("task-table");
const TaskItems = document.createElement("tr");
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

  TaskItems.className = "table-box-row";

  tasks.forEach((task) => {
    TaskItems.innerHTML = `<td class="table-box-color-tag-job"> 
      </td> 
      <td class="table-box-task" id="show-task-title"> 
      ${Object.values(task)[1]} 
      </td> 
      <td class="table-box-time" id="show-task-time"> 
      ${Object.values(task)[3]
        .toString()
        .match(/\d\d:\d\d:\d\d/)} 
      </td> 
      <td class="table-box-check-box"> 
      <input
          class="table-box-check"
          type="checkbox"
          id="checkbox-done"
          name="checkbox-done"
        /> 
      </td>`;

    taskTable.append(TaskItems);
  });
});
