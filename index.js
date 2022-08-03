function openNav() {
  document.getElementById("mySidepanel").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

const tasks = [];
const addTaskButton = document.getElementById("add-task-button");

addTaskButton.addEventListener("click", () => {
  const taskTitleInput = document.getElementById("task-title-input").value;
  tasks.push({
    id: tasks.length + 1,
    title: taskTitleInput,
  });
  console.log(tasks);
});
