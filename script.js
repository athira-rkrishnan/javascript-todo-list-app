
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

const overLay = document.querySelector(".overlay");
const newTask = document.querySelector(".newTask");
const inputName = document.querySelector("#name");
const inputTime = document.querySelector("#time");

const todoApp = document.querySelector(".todoapp");
const tListName = document.getElementById("tName");
const tListTime = document.getElementById("tTime");
const listContainer = document.querySelector(".listContainer");

   
function createTask() {
    overLay.classList.add('active');
    newTask.style.display = "block";  
}

function closeTask() {
    overLay.classList.remove('active');
    newTask.style.display = "none";
    inputName.value = "";
    inputTime.value = ""; 
}

function addTask() {
    const inNameValue = inputName.value;
    console.log(inNameValue);
    const inTimeValue = inputTime.value;
    console.log(inTimeValue);
   

    if(inputName.value === '' || inputTime.value === '') {
        let alertTxt = document.createElement("p");
        alertTxt.classList.add("alertText");
        alertTxt.textContent = "Please enter in the input fields!";
        newTask.appendChild(alertTxt);
        alertTxt.addEventListener('animationend', () => {
            alertTxt.style.display = 'none';
        });

    }
    else {    
            closeTask();
          
      const tasksContainer = `<div class = "tabs">
                    <span>All</span>
                    <span>Completed</span>
                    <span>Pending</span>
                </div>
                <div class = "list">
                    <div class="checkbox-wrapper-56">
                        <label class="checkcontainer">
                        <input type="checkbox" id = "myCheckbox">
                        <div class="checkmark"></div>
                        </label>
                    </div>
                    <div class = "task">
                        <label for = "myCheckbox" id = "tName">${inNameValue}</label>
                        <p id = "tTime"><i class="fa-regular fa-clock"></i>${inTimeValue}</p>
                    </div>
                    <div class = "editDelSec">
                        <div class = "actExc">
                            <p class = "activeCir">Active</p>
                            <i class="fa-solid fa-exclamation"></i>
                        </div>
                        <div class = "edDEL">
                            <span>Edit</span>
                            <span class = "del">Delete</span>
                        </div>
                    </div>`;  
                      
        listContainer.innerHTML += tasksContainer;
        const tabsContainer = document.querySelector(".tabs");
        console.log(tabsContainer);

    }
}


                   
