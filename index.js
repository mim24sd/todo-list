openNavButton.addEventListener("click", () => {
  document.getElementById("mySidepanel").style.width = "200px";
});

closeNavButton.addEventListener("click", () => {
  document.getElementById("mySidepanel").style.width = "0";
});

const tasks = [];
const addTaskButton = document.getElementById("add-task-button");
const taskTitleInput = document.getElementById("task-title-input");

addTaskButton.addEventListener("click", () => {
  tasks.push({
    id: tasks.length + 1,
    title: taskTitleInput.value,
  });

  console.log(tasks);
});
