function TaskService() {
    this.getListTasks = function() {
        return axios({
            url: "https://6044316ea20ace001728eb9b.mockapi.io/api/Tasks",
            method: 'GET'
        });
    }

    this.addTask = function(Task) {
        return axios({
            url: "https://6044316ea20ace001728eb9b.mockapi.io/api/Tasks",
            method: "POST",
            data: Task
        });
    }

    this.deleteTask = function(id) {
        return axios({
            url: `https://6044316ea20ace001728eb9b.mockapi.io/api/Tasks/${id}`,
            method: "DELETE"
        });
    }

    this.getTaskById = function(id) {
        return axios({
            url: `https://6044316ea20ace001728eb9b.mockapi.io/api/Tasks/${id}`,
            method: "GET"
        })
    }

    this.updateTask = function(id, Task) {
        return axios({
            url: `https://6044316ea20ace001728eb9b.mockapi.io/api/Tasks/${id}`,
            method: "PUT",
            data: Task
        });
    }
}