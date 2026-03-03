
// For Displaying Date
const date = new Date();
const dateStr = date.toDateString();
const currentDate = document.getElementById("currDate");
currentDate.innerHTML = dateStr;

const newTask = document.querySelector(".newTask");
const taskName = document.querySelector("#name");
const taskTime = document.querySelector("#time");
const overLay = document.querySelector(".overlay");
const todoApp = document.querySelector(".todoapp");


function createTask() {
    overLay.classList.add('active');
    newTask.style.display = "block";  
}

function closeTask() {
    overLay.classList.remove('active');
    newTask.style.display = "none";
}