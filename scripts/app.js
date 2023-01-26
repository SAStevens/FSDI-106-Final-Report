var importantIcon = "fa-regular fa-thumbs-up important";
var nonImportantIcon = "fa-regular fa-thumbs-down";
var isImportant = false;

function toggleImportant() {
    if (isImportant) {
        $("#iImportant")
            .removeClass(importantIcon)
            .addClass(nonImportantIcon);
        isImportant = false;
    }
    else {
        $("#iImportant")
            .removeClass(nonImportantIcon)
            .addClass(importantIcon);
        isImportant = true;
    }
}

function toggleForm() {
    console.log("Button clicked!");
    $(".form-container").toggle();
}

function saveTask() {
    console.log("Saving task!");
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let dueDate = $("#selDueDate").val();
    let category = $("#selCategory").val();
    let contact = $("#txtContact").val();
    let status = $("#selStatus").val();
    let iImportant = $("#seliImportant").val();

    let task = new Task(title, description, dueDate, category, contact, status, iImportant);

    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/", // slash at end is required for this server
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(res) {
            console.log(res);

            displayTask(task);
        },
        error: function(error) {
            console.log(error);
            alert("Unexpected Error");
        }
    });
}

function displayTask(task) {
    let syntax = `<div class="task">
        <div class="col1">
            <h3>${task.title}</h3>
            <p>${task.description}</p>
        </div>

        <div class="col2">
            <label>${task.dueDate}</label>
            <label>${task.category}</label>
        </div>

        <div class="col3">
            <label>${task.contact}</label>
            <label>${task.status}</label>
        </div>  

        <div class="icon">
        <label>${task.iImportant}</label>
        </div>

    </div>`;

    $(".list-container").append(syntax);
}

// function testRequest() {
//     $.ajax({
//         type: "GET",
//         url: "https://fsdiapi.azurewebsites.net/",
//         success: function(response) {
//             console.log(response);

//         },
//         error: function(error) {
//             console.log(error);

//         }
//     });
// }

function loadTasks() {
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks", 
        success: function(res) {
            let data = JSON.parse(res);
            console.log(data);
            for(let i=0; i<data.length; i++) {
                let task = data[i];
                    if(task.name == "Scott S") {
                        displayTask(task);
                    }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function init(){
    console.log("Task Manager");

    loadTasks();

    $("#iImportant").click(toggleImportant);
    $("#btnToggleForm").click(toggleForm);
    $("#btnSave").click(saveTask);
} 

window.onload = init;