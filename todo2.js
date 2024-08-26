var input = document.getElementById("ip");
var ul = document.getElementById("list-cnt");

// Fetch and display tasks on page load
window.onload = function() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                var listitem = document.createElement("li");
                listitem.setAttribute('data-id', task._id);
                listitem.innerHTML = task.name + 
                    "<button onclick='dlt(event)'>Delete</button> " +
                    "<button class='st-btn'>" + (task.completed ? "Done" : "Completed") + "</button>";
                ul.append(listitem);
                
                listitem.querySelector('.st-btn').addEventListener('click', function() {
                    toggleComplete(task._id, this);
                });
            });
        });
};

function addtask() {
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input.value })
    })
    .then(response => response.json())
    .then(task => {
        var listitem = document.createElement("li");
        listitem.setAttribute('data-id', task._id);
        listitem.innerHTML = task.name + 
            "<button onclick='dlt(event)'>Delete</button> " +
            "<button class='st-btn'>Completed</button>";
        ul.append(listitem);
        
        listitem.querySelector('.st-btn').addEventListener('click', function() {
            toggleComplete(task._id, this);
        });
    });
}

function dlt(event) {
    var taskId = event.target.parentElement.getAttribute('data-id');
    
    fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(() => {
        event.target.parentElement.remove();
    });
}

function toggleComplete(taskId, button) {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: button.innerHTML !== "Done" })
    })
    .then(response => response.json())
    .then(updatedTask => {
        button.innerHTML = updatedTask.completed ? "Done" : "Completed";
    });
}
