// DOM selection
const heading = document.getElementById("heading");
const changeBtn = document.getElementById("changeBtn");
const colorBtn = document.getElementById("colorBtn");

const nameInput = document.getElementById("nameInput");
const displayText = document.getElementById("displayText");

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const keyInput = document.getElementById("keyInput");
const keyOutput = document.getElementById("keyOutput");


// 1. Button click event
changeBtn.addEventListener("click", function () {
    heading.textContent = "Welcome to My Interactive Task List!";
});


// 2. Toggle style using button click
colorBtn.addEventListener("click", function () {
    heading.classList.toggle("highlight");
});


// 3. Input event - display text in real time
nameInput.addEventListener("input", function () {
    if (nameInput.value === "") {
        displayText.textContent = "Your name will appear here.";
    } else {
        displayText.textContent = "Hello, " + nameInput.value + "!";
    }
});


// 4. Add new task
addBtn.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task !== "") {

        const li = document.createElement("li");

        li.textContent = task + " ";

        const removeBtn = document.createElement("button");

        removeBtn.textContent = "Remove";
        removeBtn.className = "removeBtn";

        removeBtn.addEventListener("click", function () {
            li.remove();
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        taskInput.value = "";
    }
});


// 5. Keyboard event
keyInput.addEventListener("keydown", function (event) {
    keyOutput.textContent =
        "You pressed: " + event.key;
});


// 6. Remove existing list items
const removeButtons = document.querySelectorAll(".removeBtn");

removeButtons.forEach(function (button) {

    button.addEventListener("click", function () {
        button.parentElement.remove();
    });

});
