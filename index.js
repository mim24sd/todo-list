const sideMenuContainer = document.getElementById("side-menu-container");
const openNavButton = document.getElementById("open-nav-button");
const closeNavButton = document.getElementById("close-nav-button");
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");
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

  console.log(tasks);

  for (let taskIndex in tasks) {
    for (
      let taskDetailIndex = 0;
      taskDetailIndex < Object.values(tasks[taskIndex]).length;
      taskDetailIndex++
    ) {
      // console.log(Object.values(tasks[taskIndex])[taskDetailIndex]);

      // document.getElementById("show-task-title") = Object.values(tasks[taskIndex])[1];
      // document.getElementById("show-task-time")= Object.values(tasks[taskIndex])[2];

      '<td class="table-box-color-tag-job">' +
        "" +
        "</td>" +
        '<td class="table-box-task" id="show-task-title">' +
        Object.values(tasks[taskIndex])[1] +
        "</td>";
      '<td class="table-box-time" id="show-task-time">' +
        Object.values(tasks[taskIndex])[2] +
        "</td>";

      document.getElementById("ma-table").appendChild(tr);
    }
  }
});
