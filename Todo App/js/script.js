let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let message = document.getElementById("message");
let dateError = document.getElementById("dateError");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {   // 1st condition task must not be empty
    message.innerHTML = "Task cannot be blank";
  }

  else if (dateInput.value === "") {
    console.log("failure");
    dateError.innerHTML = "Due Date cannot be blank";  // 2nd condition date must not be empty
  } else {
    // where conditions the above conditions is met success would be recorded
    message.innerHTML = "";
    dateError.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    //This Immediately-invoked Function Expression (IIFE) would dismiss the form after adding the data to the screen
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];  //collected data would be stored in this array

let acceptData = () => {
  data.push({             // would push data to empty array above
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  // To store our data locally in the browser the function below was used

  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
};

let createTasks = () => {     /*Object or data stored in the empty array would be collected here &          
                                displayed on screen */

  tasks.innerHTML = "";     // would clear previously added tasks
  data.map((x, y) => {     // This would map our data and make X target each added element/object while Y                         would create unique id(index no) and variable space
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small">${x.date}</span>
          <p>${x.description}</p>

    
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

// function to delete stored task

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));

};

// function to edit stored task

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

// function to reset form

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// To retrieve our data locally in the browser the Immediately-invoked Function Expression (IIFE) below was used

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  createTasks();
})();