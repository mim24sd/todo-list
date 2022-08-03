function openNav() {
  document.getElementById("mySidepanel").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

const tasks = [];

console.log(tasks);

const addTaskButton = document.getElementById("add-task-button");

const taskTitle = document.getElementById("task-title").value;

addTaskButton.addEventListener("click", () => {
  tasks.push({
    id: tasks.length + 1,
    title: taskTitle,
  });

  console.log(tasks);
});
