function openNav() {
  document.getElementById("mySidepanel").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

const tasks = [];

console.log(tasks);

let addTaskButton = document.getElementById("add-task-button");

addTaskButton.addEventListener("click", () => {
  tasks.push({
    id: tasks.length + 1,
    title: document.getElementById("task-title").value,
  });

  console.log(tasks);
});
