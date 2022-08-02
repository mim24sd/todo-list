function openNav() {
  document.getElementById("mySidepanel").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

const tasks = [];

console.log(task);

let submit = document.getElementById("submit-button");

submit.addEventListener("click", () => {
  task.push({
    id: task.length + 1,
    title: document.getElementById("task-title").value,
  });

  console.log(task);
});
