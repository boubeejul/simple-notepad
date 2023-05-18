var taskList = document.getElementById("todolist-tasklist")
var tasks = document.getElementsByClassName("todolist-task")
var removeTaskButton = document.getElementsByClassName("todolist-task-remove")
var removeListButton = document.getElementById("todolist-options-remove")
var addTaskButton = document.getElementById("todolist-options-add")
var text = document.getElementById("textarea-input")

setInterval(displayTime, 1000)
document.addEventListener("DOMContentLoaded", addEvents)


/* Get from localStorage */
if (window.localStorage.getItem("text") != null)
    text.innerHTML = `${window.localStorage.getItem("text")}`
if (window.localStorage.getItem("tasks") != null)
    taskList.innerHTML = `${window.localStorage.getItem("tasks")}`

/* Save to localStorage*/
text.addEventListener("input", e => {
    window.localStorage.setItem("text", text.innerHTML)
})

taskList.addEventListener("input", e => {
    window.localStorage.setItem("tasks", taskList.innerHTML)
})


/* Get time */
function displayTime() {
    const date = new Date()
    var timeDiv = document.getElementById("time-icon")
    var dateDiv = document.getElementById("date")
    var hour = document.getElementById("hour")
    var dateHour = date.getHours()
    var dateMinute = date.getMinutes()
    var dateDay = date.getDate()
    var dateMonth = date.getMonth()+1
    var dateYear = date.getFullYear()

    /* Verify hour and minutes */
    if (dateHour >= 0 && dateHour <= 9 && dateMinute >= 0 && dateMinute <= 9)
        hour.innerHTML = `0${dateHour}:0${dateMinute}`
    else if (dateHour >= 0 && dateHour <= 9)
        hour.innerHTML = `0${dateHour}:${dateMinute}`
    else if (dateMinute >= 0 && dateMinute <= 9)
        hour.innerHTML = `${dateHour}:0${dateMinute}`
    else 
        hour.innerHTML = `${dateHour}:${dateMinute}`

    /* Verify day and month */
    if (dateDay >= 1 && dateDay <= 9 && dateMonth >= 1 && dateMonth <= 9)
        dateDiv.innerHTML = `0${dateDay}/0${dateMonth}/${dateYear}`
    else if (dateDay >= 1 && dateDay <= 9)
        dateDiv.innerHTML = `0${dateDay}/${dateMonth}/${dateYear}`
    else if (dateMonth >= 1 && dateMonth <= 9)
        dateDiv.innerHTML = `${dateDay}/0${dateMonth}/${dateYear}`
    else
    dateDiv.innerHTML = `${dateDay}/${dateMonth}/${dateYear}`

    /* Verify if it's day or night */
    if(dateHour >= 6 && dateHour <= 17)
        timeDiv.innerHTML = `<img src="./style/assets/sun.svg" alt="ícone de sol" id="sun">`
    else
        timeDiv.innerHTML = `<img src="./style/assets/moon.svg" alt="ícone de lua" id="moon">`
}


/* Add events to the tasks list buttons */
function addEvents() {

    addToDoListTaskOptions()
    addRemoveTaskEvent()

    /* Clear the list and save*/
    removeListButton.addEventListener("click", e => {
        taskList.innerHTML = ""
        window.localStorage.setItem("tasks", taskList.innerHTML)
    })

    /* Add a new task and save*/
    addTaskButton.addEventListener("click", e => {

        taskList.innerHTML += `<div class="todolist-task"><input onclick="saveCheckedTask()"type="checkbox" class="todolist-note" name="task"><span class="task-text" contenteditable>Nova Tarefa</span>
        <div class="todolist-task-options"><button class="todolist-task-remove"><img src="./style/assets/cross.svg" alt="símbolo de negação" class="todolist-task-icon" title="Apagar tarefa">
        </button></div></div>`

        addToDoListTaskOptions()
        addRemoveTaskEvent()
        window.localStorage.setItem("tasks", taskList.innerHTML)
    })

}

/* Add events to the task */
function addToDoListTaskOptions() {

    var tasks = document.getElementsByClassName("todolist-task")

    for(i = 0; i < tasks.length; i++) {
        tasks[i].addEventListener("mouseover", todolistTaskOptionsOver)
        tasks[i].addEventListener("mouseout", todolistTaskOptionsOut)
    }
}


/* Change visibility of the task buttons when mouse over/out */
function todolistTaskOptionsOver() {
    
    var options = this.children[2]

    options.style.visibility = "visible"
}
function todolistTaskOptionsOut() {
    
    var options = this.children[2]

    options.style.visibility = "hidden"
}


/* Delete an individual task event and save*/
function addRemoveTaskEvent() {

    var removeTaskButton = document.getElementsByClassName("todolist-task-remove")

    for(i = 0; i < removeTaskButton.length; i++) {
        removeTaskButton[i].addEventListener("click", e => {

            var parentParent = e.target.parentElement.parentElement.parentElement

            if (parentParent.className == "todolist-task") {
                parentParent.remove()
                window.localStorage.setItem("tasks", taskList.innerHTML)
            }
        })
    }
}


/* Add checked attribute to a checked task */
function saveCheckedTask() {

    var tasks = document.getElementsByClassName("todolist-note")

    for (i = 0; i < tasks.length; i++) {
        if(tasks[i].checked)
            tasks[i].setAttribute("checked", "")
        else 
            tasks[i].removeAttribute("checked")
    }
}