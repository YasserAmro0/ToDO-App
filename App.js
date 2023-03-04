let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let ptext;

// Empty Array To Store Tasks

let arrayOfTask = [];

// Check if Theres Tasks In lOcal Storge

if (window.localStorage.getItem("tasks")) {
    arrayOfTask = JSON.parse(window.localStorage.getItem("tasks"));
}
getDataFromLocalStorge();
// add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
}


//  Click On Task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Ele From LocalStorge
        removeFromLocalStorge(e.target.parentElement.getAttribute("id"));
        getDataFromLocalStorge()
    }
    if (e.target.classList.contains("edite")) {
        input.value = e.target.parentElement.firstChild.textContent;

        const result = arrayOfTask.findIndex(ele => {
            return ele.id === +e.target.parentElement.id
        })
        arrayOfTask.splice(result, 1);
    }

    if (e.target.classList.contains("task")) {
        // Toggle Done Class
        e.target.classList.toggle("done");
        togggleStatusTaskWith(e.target.getAttribute("id"));
    }
})


function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTask.push(task);

    // Add Task to Page
    addTaskToPagefrom(arrayOfTask);

    //  Add Tasks To Local Storge
    addDataTolocalStoragefrom(arrayOfTask);
}

function addTaskToPagefrom(addTask) {
    tasksDiv.innerHTML = "";
    // Loop ArrayOFtask
    addTask.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        // Check if Task is Done
        if (task.completed === true) {
            div.className = "task done";
        }

        div.setAttribute("id", task.id);
        ptext = document.createElement("p");
        ptext.textContent = task.title


        let DivSel = document.createElement("div");
        DivSel.appendChild(ptext);
        DivSel.classList = "con";

        let deleteButton = document.createElement("img");
        deleteButton.src = './photos/delete.png'
        deleteButton.style.width = "25px";


        let updateButton = document.createElement("img");
        updateButton.src = './photos/editing.png'
        updateButton.style.width = "20px";
        DivSel.appendChild(updateButton)

        deleteButton.className = "del";
        updateButton.className = "edite";

        div.appendChild(DivSel);
        div.appendChild(deleteButton);



        tasksDiv.appendChild(div);
    });

}

function addDataTolocalStoragefrom(arrayOfTask) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTask));

}

function getDataFromLocalStorge() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTaskToPagefrom(tasks);
    }

}
function removeFromLocalStorge(TaskId) {

    arrayOfTask = arrayOfTask.filter((task) => task.id != TaskId);
    addDataTolocalStoragefrom(arrayOfTask);
}

function togggleStatusTaskWith(TaskId) {
    for (let i = 0; i < arrayOfTask.length; i++) {
        if (arrayOfTask[i].id == TaskId) {
            arrayOfTask[i].completed == false ? (arrayOfTask[i].completed = true) : (arrayOfTask[i].completed = false);
        }
    }
    addDataTolocalStoragefrom(arrayOfTask);
}