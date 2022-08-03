function openNav() {
  document.getElementById("mySidepanel").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

const tasks = [];
const addTaskButton = document.getElementById("add-task-button");
addTaskButton.addEventListener("click", () => {
  const taskTitle = document.getElementById("task-title").value;
  tasks.push({
    id: tasks.length + 1,
    title: taskTitle,
  });
  console.log(tasks);
});
