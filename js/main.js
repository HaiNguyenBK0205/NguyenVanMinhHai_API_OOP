function getEle(id) {
    return document.getElementById(id);
}

// Khai báo đối tượng
var service = new TaskService();

// Lấy đối tượng từ API
function importTasks() {
    document.querySelector(".loader").style.display = "flex";

    service.getListTasks()
        .then(function(result) {
            document.querySelector(".loader").style.display = "none";
            document.querySelector(".contain").style.display = "block";
            displayTasks(result.data);
        })
        .catch(function(err) {
            console.log(err);
        })
}
importTasks();

// Hiển thị đối tượng
function displayTasks(Array) {
    var contentTodo = "";
    var contentComplete = "";
    for (var i = 0; i < Array.length; i++) {
        if (Array[i].TaskStatus) {
            contentComplete += `
            <li>
                <span class="title${i}">${Array[i].TaskName}</span>
                <div class="buttons">
                    <button class="remove" onclick="deleteTaskTodo(${Array[i].id})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" onclick="updateTaskTodo(${Array[i].id},${i},false)">
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>
            `;
        } else {
            contentTodo += `
            <li>
                <span class="title${i}">${Array[i].TaskName}</span>
                <div class="buttons">
                    <button class="remove" onclick="deleteTaskTodo(${Array[i].id})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" onclick="updateTaskTodo(${Array[i].id},${i},true)">
                        <i class="far fa-check-circle"></i>
                    </button>
                </div>
            </li>
            `;
        }
    }
    getEle("todo").innerHTML = contentTodo;
    getEle("completed").innerHTML = contentComplete;
}

// Thêm Task
getEle("addItem").addEventListener("click", function() {
    if (checkEmpty(getEle("newTask").value, "spanAlert", "(*)Please enter activity!")) {
        return;
    }

    var newTask = new Task("", getEle("newTask").value, false);

    document.querySelector(".loader").style.display = "flex";

    service.getListTasks()
        .then(function(result) {
            if (checkContain(result.data, newTask)) {
                document.querySelector(".loader").style.display = "none";
                getEle("spanAlert").innerHTML = "(*)Duplicate task name!";
                return;
            } else {
                getEle("spanAlert").innerHTML = "";
                service.addTask(newTask)
                    .then(function(item) {
                        document.querySelector(".loader").style.display = "none";
                        importTasks();
                        alert("Add success!");
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            }
        })
        .catch(function(err) {
            console.log(err);
        })
})

// Xóa Task
function deleteTaskTodo(id) {
    document.querySelector(".loader").style.display = "flex";
    service.deleteTask(id)
        .then(function(results) {
            document.querySelector(".loader").style.display = "none";
            importTasks();
            alert("Delete success!");
        })
        .catch(function(err) {
            console.log(err);
        })
}

// Lấy Task với ID - Chưa sử dụng
function getTaskID(id) {
    document.querySelector(".loader").style.display = "flex";
    service.getTaskById(id)
        .then(function(item) {
            document.querySelector(".loader").style.display = "none";
            console.log(item.data);
        })
        .catch(function(err) {
            console.log(err);
        })
}

// Update Task
function updateTaskTodo(id, i, status) {
    var name = document.querySelector(`.title${i}`).innerHTML;
    var task = new Task(id, name, status);
    document.querySelector(".loader").style.display = "flex";
    service.updateTask(id, task)
        .then(function(item) {
            document.querySelector(".loader").style.display = "flex";
            importTasks();
            alert("Change status success!");
        })
        .catch(function(err) {
            console.log(err);
        })
}

// Validation
function checkEmpty(input, spanId, mess) {
    if (input === "") {
        getEle(spanId).innerHTML = mess;
        return true;
    } else {
        getEle(spanId).innerHTML = "";
        return false;
    }
}

function checkContain(Array, Task) {
    console.log(Array);
    console.log(Task);
    for (var i = 0; i < Array.length; i++) {
        if (Task.TaskName === Array[i].TaskName) {
            console.log(1);
            return true;
        }
    }
    return false;
}