
// For Displaying Date
const date = new Date();
const dateStr = date.toDateString();
const currentDate = document.getElementById("currDate");
currentDate.innerHTML = dateStr;

/*window.onload = function() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};  */

const newTask = document.querySelector(".newTask");
const taskName = document.querySelector("#name");
const taskTime = document.querySelector("#time");
const overLay = document.querySelector(".overlay");
const todoApp = document.querySelector(".todoapp");


function createTask() {
    overLay.classList.add('active');
    newTask.style.display = "block";  
}

function closeTask(val) {
     
    overLay.classList.remove('active');
    newTask.style.display = "none";
    taskName.value = "";
    taskTime.value = "";
   
}

function addTask() {
    if(taskName.value === '' || taskTime.value === '') {
        let alertTxt = document.createElement("p");
        alertTxt.classList.add("alertText");
        alertTxt.textContent = "Please enter in the input fields!";
        newTask.appendChild(alertTxt);
        alertTxt.addEventListener('animationend', () => {
            alertTxt.style.display = 'none';
        });
    }
}


