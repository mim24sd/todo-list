//side panel style

function openNav() {
  document.getElementById("mySidepanel").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

//task

let task = { title: "" };

document.getElementById("add-task-title").value = task.title;

//show add or edit view

if (Object.values(task).every((x) => x === null || x === "")) {
  document.getElementById("edit-task-header").style.display = "none";
  document.getElementById("edit-task-button").style.display = "none";
} else {
  document.getElementById("add-task-header").style.display = "none";
}

//add task

function addNewTask() {
  task.title = document.getElementById("add-task-title").value;
}
