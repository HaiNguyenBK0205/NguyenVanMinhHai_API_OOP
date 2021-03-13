var service = new TaskService();
var validation = new Validation();

getListTaskService();

function displayLoader(isLoader) {
    if (isLoader) {
        getEle("loader").style.display = "flex";
        getEle("card-todo").style.display = "none";
    } else {
        getEle("loader").style.display = "none";
        getEle("card-todo").style.display = "block";
    }
}

function displayListTasks(array) {
    var contentToDo = "";
    var contentComplete = "";
    for (var i = 0; i < array.length; i++) {
        if (array[i].TaskStatus) {
            contentComplete += addContent(array[i].id, array[i].TaskName, "fas");
        } else {
            contentToDo += addContent(array[i].id, array[i].TaskName, "far");
        }
    }
    getEle("todo").innerHTML = contentToDo;
    getEle("completed").innerHTML = contentComplete;
}

function addContent(id, name, icon) {
    return `
    <li>
        <span>${name}</span>
        <span class="buttons">
            <button class="remove">
                <i class="fas fa-trash-alt" onclick="deleteTaskService(${id})"></i>
            </button>
            <button class="complete">
                <i class="${icon} fa-check-circle" onclick="updateTaskStatus(${id})"></i>
            </button>
        </span>
    </li>
    `
}

function getListTaskService() {
    service.getListTasks()
        .then(function(result) {
            displayLoader(false);
            displayListTasks(result.data);
        })
        .catch(function(err) {
            console.log(err);
        })
}

getEle("addItem").addEventListener("click", function(event) {
    event.preventDefault();
    var nameTask = getEle("newTask").value;
    var newTask = new Task("", nameTask, false);
    service.getListTasks()
        .then(function(result) {
            var isValid = true;
            isValid &= validation.checkEmpty(nameTask, "notiInput", "(*)Please enter activity!") && validation.checkContain(nameTask, result.data, "notiInput", "(*)Duplicate task name!");
            if (isValid) {
                displayLoader(true);
                service.addTask(newTask)
                    .then(function(res) {
                        getEle("newTask").value = "";
                        getListTaskService();
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            }
        })
        .catch(function(err) {
            console.log(err);
        })
})

function deleteTaskService(id) {
    displayLoader(true);
    service.deleteTask(id)
        .then(function(result) {
            getListTaskService();
        })
        .catch(function(err) {
            console.log(err);
        })
}

function updateTaskStatus(id) {
    displayLoader(true);
    service.getTaskById(id)
        .then(function(result) {
            var newStatus = !result.data.TaskStatus;
            var newTask = new Task(id, result.data.TaskName, newStatus);
            service.updateTask(id, newTask)
                .then(function() {
                    getListTaskService();
                })
                .catch(function(err) {
                    console.log(err);
                })
        })
        .catch(function(err) {
            console.log(err);
        })
}

function getEle(id) {
    return document.getElementById(id);
}