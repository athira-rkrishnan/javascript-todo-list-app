
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
const tabsSec = document.querySelector(".tabs");
const listContainer = document.querySelector(".listContainer");
const tListName = document.getElementById("tName");
const tListTime = document.getElementById("tTime");


const creEditText = document.getElementById("creEditText");
const taskBtn = document.getElementById("taskBtn");
let editTask = null;

   
function createTask() {
    overLay.classList.add('active');
    newTask.style.display = "block"; 
    creEditText.style.color = "white"; 
}

function closeTask() {
    overLay.classList.remove('active');
    newTask.style.display = "none";
    inputName.value = "";
    inputTime.value = ""; 
}

function addTask() {
    const inNameValue = inputName.value;
    const inTimeValue = inputTime.value;
      

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
        if(editTask) {
            editTask.querySelector("#tName").textContent = inputName.value;
            editTask.querySelector("#tTime").innerHTML =
                    `<i class="fa-regular fa-clock"></i>${inputTime.value}`;
            editTask = null;
        }
        else {
            const tasksContainer = `
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
                            <span class = "edit">Edit</span>
                            <span class = "del">Delete</span>
                        </div>
                    </div>
                </div> `;
                      
        listContainer.innerHTML += tasksContainer;
        if(listContainer.childElementCount > 0) {
            tabsSec.style.display = "block";
            }  
        }

        creEditText.textContent = "Create";
        taskBtn.textContent = "Add";
        closeTask();
             
             
    }
}

listContainer.addEventListener("click", function(e) {
    if(e.target.classList.contains("edit")) {    
        const list = e.target.closest(".list");
        const taskName = list.querySelector("#tName").textContent;
        const taskTime = list.querySelector("#tTime").textContent;
        inputName.value = taskName;
        inputTime.value = taskTime;
        editTask = list;
        createTask();
        creEditText.textContent = "Edit";
        taskBtn.textContent = "Save";
    } 
    else if(e.target.classList.contains("del")) {
        const list = e.target.closest(".list");
        list.remove();
    }

});

