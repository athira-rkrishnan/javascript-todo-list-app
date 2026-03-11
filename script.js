
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
        finishMsg.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Finish All Tasks
        <i class="fa-solid fa-xmark alertClose"></i>`;
        finishMsg.style.visibility = "visible";
        finishMsg.addEventListener("click", (e) => {
            if(e.target.classList.contains("alertClose")) {
                finishMsg.style.visibility = "hidden";
            }
        });   
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
        updateActiveTasks();
        saveTasksToLocalStorage();
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

function updateActiveTasks() {
    const currentTime = new Date();
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    const lists = document.querySelectorAll(".list");
    lists.forEach(list => {
        const timeText = list.querySelector(".tTime").textContent; 
        const activeCir = list.querySelector(".activeCir");

        const match = timeText.match(/(\d{1,2}\.\d{1,2})\s*(am|pm)\s*-\s*(\d{1,2}\.\d{1,2})\s*(am|pm)/i);
        if (match) {
            const startHourMin = match[1].split('.').map(Number);
            const startAMPM = match[2].toLowerCase();
            const endHourMin = match[3].split('.').map(Number);
            const endAMPM = match[4].toLowerCase();

            let startHour = startHourMin[0];
            let startMin = startHourMin[1];
            if (startAMPM === "pm" && startHour !== 12) startHour += 12;
            if (startAMPM === "am" && startHour === 12) startHour = 0;
            const startTotal = startHour * 60 + startMin;

            let endHour = endHourMin[0];
            let endMin = endHourMin[1];
            if (endAMPM === "pm" && endHour !== 12) endHour += 12;
            if (endAMPM === "am" && endHour === 12) endHour = 0;
            const endTotal = endHour * 60 + endMin;

            if (currentMinutes >= startTotal && currentMinutes <= endTotal) {
                activeCir.style.display = "inline-block"; 
            } else {
                activeCir.style.display = "none"; 
            }
        }
    });
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
        saveTasksToLocalStorage();
    } 
    else if(e.target.classList.contains("del")) {
        const list = e.target.closest(".list");
        list.remove();
        saveTasksToLocalStorage();
    }
    else if(e.target.classList.contains("fa-exclamation")) {
        const list = e.target.closest(".list");
        const taskName = list.querySelector(".tName").textContent;
        if(pendingContainer.childElementCount >=8) {
            selectedPendingTask = list;
            finishMsg.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Finish Pending Tasks<i class="fa-solid fa-xmark alertClose"></i>`;
                finishMsg.style.visibility = "visible";
                finishMsg.addEventListener("click", (e) => {
                    if(e.target.classList.contains("alertClose")) {
                        finishMsg.style.visibility = "hidden";
                    }
                });
                return;  
        }
        const pendingListDiv = document.createElement("div");
        pendingListDiv.classList.add("pendingList");
        pendingListDiv.innerHTML = `<p id = "pendingTask" class = "pendingTask">${taskName}</p>
                                    <button class = "pendingBtn">Return & Finish</button>`;
        pendingListDiv.listRef = list;
        pendingContainer.appendChild(pendingListDiv);
        list.remove();    
    }
    else if(e.target.type === "checkbox") {
        const list = e.target.closest(".list");
        const taskName = list.querySelector(".tName").textContent;
        if(e.target.checked) {

            const completedCount = completedContainer.querySelectorAll(".compLists").length;
            if(completedCount > 7) {
                waitingCompletedTask = list;
                finishMsg.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>Clear Completed Tasks<i class="fa-solid fa-xmark alertClose"></i>`;
                finishMsg.style.visibility = "visible";
                finishMsg.addEventListener("click", (e) => {
                    if(e.target.classList.contains("alertClose")) {
                        finishMsg.style.visibility = "hidden";
                    }
                });
                return;   
            }
            moveToCompleted(list, taskName);
        }
        
        function moveToCompleted(list, taskName) {
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
                        if(waitingCompletedTask) {
                            const taskName = waitingCompletedTask.querySelector(".tName").textContent;
                            moveToCompleted(waitingCompletedTask, taskName);
                            waitingCompletedTask = null;
                        }
                    });   
                }
                list.remove();
            }, 2000);    
            completedContainer.style.display = "none";
            saveTasksToLocalStorage();
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
    else if(e.target.classList.contains("pendingTab")) {
        pendingTab.classList.add("active");
        allTab.classList.remove("active");
        completeTab.classList.remove("active");
        pendingContainer.style.display = "block";
        allContainer.style.display = "none";
        completedContainer.style.display = "none";
        
    }
});

pendingContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("pendingBtn")) {
        const pendingListDiv = e.target.closest(".pendingList");
        const originalTask = pendingListDiv.listRef;
        listContainer.appendChild(originalTask);
        pendingListDiv.remove();
    }
});

function saveTasksToLocalStorage() {
    const tasks = [];
    const lists = document.querySelectorAll(".list");

    lists.forEach(list => {
        const name = list.querySelector(".tName").textContent;
        const time = list.querySelector(".tTime").textContent.trim();
        const completed = list.querySelector('input[type="checkbox"]').checked;

        tasks.push({
            name,
            time,
            completed
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        const tasksContainer = `
            <div class="list">
                <div class="checkbox-wrapper-56">
                    <label class="checkcontainer">
                        <input type="checkbox" ${task.completed ? "checked" : ""}>
                        <div class="checkmark"></div>
                    </label>
                </div>
                <div class="task">
                    <label class="tName">${task.name}</label>
                    <p class="tTime"><i class="fa-regular fa-clock"></i>${task.time}</p>
                </div>
                <div class="editDelSec">
                    <div class="actExc">
                        <p class="activeCir">Active</p>
                        <i class="fa-solid fa-exclamation"></i>
                    </div>
                    <div class="edDEL">
                        <span class="edit">Edit</span>
                        <span class="del">Delete</span>
                    </div>
                </div>
            </div>
        `;
        listContainer.innerHTML += tasksContainer;
    });

    // Update active status after loading tasks
    updateActiveTasks();
}


setInterval(updateActiveTasks, 1000);
updateActiveTasks();
loadTasksFromLocalStorage();



