
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

const listContainer = document.querySelector(".listContainer");
const tListName = document.querySelector("tName");
const tListTime = document.querySelector("tTime");

const tabsSec = document.querySelector(".tabs");
const allTab = document.querySelector(".allTab");
const completeTab = document.querySelector(".completeTab");
const pendingTab = document.querySelector(".pendingTab");
const allContainer =  document.querySelector(".allContainer");
const completedContainer =  document.querySelector(".completedContainer");
const pendingContainer =  document.querySelector(".pendingContainer");


const creEditText = document.getElementById("creEditText");
const taskBtn = document.getElementById("taskBtn");
let editTask = null;


const finishMsg = document.getElementById("finishMsg");
const alertClose = document.querySelector(".alertClose");
   
function createTask() {
    if(listContainer.childElementCount >= 6 && editTask === null) {
        overLay.classList.remove('active');
        newTask.style.display = "none";
        finishMsg.style.visibility = "visible";
        alertClose.onclick = () => {
            finishMsg.style.visibility = "hidden";
        }       
    }
    else {
        overLay.classList.add('active');
        newTask.style.display = "block"; 
        creEditText.style.color = "white"; 
        finishMsg.style.visibility = "hidden";
    }
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
            editTask.querySelector(".tName").textContent = inputName.value;
            editTask.querySelector(".tTime").innerHTML =
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
                        <label for = "myCheckbox" class = "tName">${inNameValue}</label>
                        <p class = "tTime"><i class="fa-regular fa-clock"></i>${inTimeValue}</p>
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
            allTab.classList.add("active");
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
        const taskName = list.querySelector(".tName").textContent;
        const taskTime = list.querySelector(".tTime").textContent;
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
    else if(e.target.classList.contains("fa-exclamation")) {
        const list = e.target.closest(".list");
    }
    else if(e.target.type === "checkbox") {
        const list = e.target.closest(".list");
        const taskName = list.querySelector(".tName").textContent;
        if(e.target.checked) {

            const completedCount = completedContainer.querySelectorAll(".compLists").length;
            if(completedCount > 7) {
                finishMsg.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Clear Completed Tasks<i class="fa-solid fa-xmark alertClose"></i>`;
                finishMsg.style.visibility = "visible";
                finishMsg.addEventListener("click", (e) => {
                    if(e.target.classList.contains("alertClose")) {
                        finishMsg.style.visibility = "hidden";
                    }
                });
                return;
                if(completedCount === 0) {
                    list.remove();
                }
            }
          
            setTimeout(() => {
                const completeTasks = `<div class = "compLists">
                    <p id = "cTask" class = "compTask"><i class="fa-solid fa-check"></i>${taskName}</p>
                    </div>`; 
                
                completedContainer.innerHTML += completeTasks;
                const newCompletedCount = completedContainer.querySelectorAll(".compLists").length;

                if(newCompletedCount > 7 && !document.querySelector(".clear")) {
                    const clearBtn = document.createElement("button");
                    clearBtn.classList.add("clear");
                    clearBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>Clear All`;
                    completedContainer.appendChild(clearBtn);
                    clearBtn.addEventListener("click", () => {
                        completedContainer.innerHTML = "";
                    });  
                }
                list.remove();
            }, 2000);    
            completedContainer.style.display = "none";
        
    }
            }

            
});


tabsSec.addEventListener("click", function(e) {
    if(e.target.classList.contains("allTab")) {
        allContainer.appendChild(listContainer);
        allTab.classList.add("active");
        completeTab.classList.remove("active");
        pendingTab.classList.remove("active");
        allContainer.style.display = "block";
        completedContainer.style.display = "none";
        pendingContainer.style.display = "none";
    }
    else if(e.target.classList.contains("completeTab")) {
        completeTab.classList.add("active");
        allTab.classList.remove("active");
        pendingTab.classList.remove("active");    
        completedContainer.style.display = "block";
        allContainer.style.display = "none";
        pendingContainer.style.display = "none";   
    }
});

