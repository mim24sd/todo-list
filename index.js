const sideMenuContainer = document.getElementById("side-menu-container");
const openNavButton = document.getElementById("open-nav-button");
const closeNavButton = document.getElementById("close-nav-button");
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");
let taskList = document.getElementById("task-list");
let taskStore = ``;
let taskHtml = ``;
const taskTable = "";
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

  const el = tasks[tasks.length - 1];
  const taskCreatedAt = el.createdAt.match(/\d\d:\d\d:\d\d/);

  taskHtml = `<ul class="table-box-row">
      <li class="table-box-task" id="show-task-title"> 
      ${el.title} 
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
        </li>
        </ul>`;

  taskStore = taskStore + taskHtml;

  taskList.innerHTML = taskStore;
});
