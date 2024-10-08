document.addEventListener("DOMContentLoaded", () => {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    console.log("script.js loaded")

    const pomodoroBtn = document.getElementById("pomodoro-btn")
    const shortBrBtn = document.getElementById("short-br-btn")
    const longBrBtn = document.getElementById("long-br-btn")

    const titleEl = document.querySelector("title")
    const headIcon = document.querySelector("link[rel='icon']")
    const bodyEl = document.querySelector("body")
    const contentWrapper = document.getElementById("content")
    


    const timer = document.getElementById("timer")
    const hrEl = document.getElementById("hr-el")
    const startBtn = document.getElementById("start")

    const pomoIdentifier = document.getElementById("pomo-identifier")
    const taskBtn = document.getElementById("task-btn")

    let startBtnClicked = false
    let pomodoroOn = true
    let shortBreakOn = false
    let longBreakOn = false

    let isPaused = true
    let totalTimeInSeconds = 0
    let time
    let minutes
    let seconds
    // for task

    const taskHolder = document.getElementById("tasks-holder")
    const taskInputDiv = document.getElementById("task-input-container")
    const taskInput = document.getElementById("task-input")
    const saveTaskBtn = document.getElementById("save-button")
    const cancelTaskBtn = document.getElementById("cancel-button")

    // const tasksBtn = document.getElementsByClassName("new-task-test")
    console.log(taskBtn)

    //task array container
    let taskArr = []
    
    

    taskBtn.addEventListener("click", () =>  {
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        })

        taskBtn.style.display = "none"
        taskInputDiv.style.display = "block"
    })

    cancelTaskBtn.addEventListener("click", () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        taskInputDiv.style.display = "none"
        taskBtn.style.display = "block"
    })

    saveTaskBtn.addEventListener("click", () => {
        taskArr.push(taskInput.value)
        taskInput.value = ""
        renderTasks(taskArr)
    })

    function renderTasks(arr) {
        let listItem = ""

        for (let i=0; i<arr.length; i++){

            listItem += `<button class="new-task-test">${arr[i]}</button>`

        }
        taskHolder.innerHTML = listItem
    }



    function changePageTitle() {
        if (pomodoroOn) {
            titleEl.textContent += ` - Time to focus!`
        }
        else if (shortBreakOn) {
            titleEl.textContent += ` - Time for a break!`
        }
        else if (longBreakOn) {
            titleEl.textContent += ` - Time for a break!`
        }
        else {
            // let timerOrig = timer.textContent.split(":")[0] * 60 + timer.textContent.split(":")[1] * 1
            // titleEl.textContent = `${timerOrig} - Time to focus!`
        }
    }

    function newTabTitle() {
        if (shortBreakOn) {
            titleEl.textContent = `5:00 - Time for a break!`
        }
        else if (longBreakOn) {
            titleEl.textContent = `15:00 - Time for a break!`
        }
        else if (pomodoroOn) {
            titleEl.textContent = `25:00 - Time to focus!`
        }
        else {
            titleEl.textContent = `Pomofocus`
        }
    }


    function updateTimer() {
        totalTimeInSeconds = timer.textContent.split(":")[0] * 60 + timer.textContent.split(":")[1] * 1
        if (!isPaused) {
            time = setInterval(() => {
                totalTimeInSeconds--
                minutes = Math.floor(totalTimeInSeconds / 60)
                seconds = totalTimeInSeconds % 60

                if (minutes < 10) {
                    timer.innerHTML = `0${minutes}:${seconds}` 

                    if (seconds < 10 ){
                        timer.innerHTML = `0${minutes}:0${seconds}`
                    }
                }

                else {
                    timer.innerHTML = `${minutes}:${seconds}` 
                    
                    if (seconds < 10 ){
                        timer.innerHTML = `${minutes}:0${seconds}`
                    }
                }

                // timer.innerHTML = `${minutes}:${seconds}`   
                // titleEl.innerHTML = `${minutes}:${seconds}`
                titleEl.innerHTML = `${timer.innerHTML}` 
                changePageTitle() 
                
        
                if (totalTimeInSeconds <= 0) {
                    startBtn.textContent = "START"
                    clearInterval(time)
                    timerCondition()
                    
                     

                    // minutes = Math.floor(totalTimeInSeconds / 60)
                    // seconds = totalTimeInSeconds % 60
                    // timer.innerHTML = `${minutes}:${seconds}`
                }
            }, 1000)
        }
        else {
            clearInterval(time)
        }
    }

    function timerCondition() {
        if (pomodoroOn) {
            totalTimeInSeconds = 25 * 60;
            timer.innerHTML = "25:00"
            
        }
        else if (shortBreakOn) {
            totalTimeInSeconds = 5 * 60;
            timer.innerHTML = "05:00"
            
        }
        else if (longBreakOn) {
            
            totalTimeInSeconds = 15 * 60;
            timer.innerHTML = "15:00"
        }
        else {
            totalTimeInSeconds = 0;
            timer.innerHTML = "00:00"
        }

        // totalTimeInSeconds = timer.textContent.split(":")[0] * 60 + timer.textContent.split(":")[1] * 1
        // updateTimer()
    }

    function startButtonChecker() {
        if (startBtnClicked) {
            if (startBtn.textContent === "START") {
                startBtn.textContent = "PAUSE"
                console.log("Start button was clicked")
                isPaused = false
                
            }
            else {
                startBtn.textContent = "START"
                console.log("Pause button was clicked")
                isPaused = true
                
                
            }
        }
        else {
            startBtn.textContent = "START"
            console.log("Start button was not clicked")
        }
        updateTimer()
        // console.log("Start button Checker called")
    }


    startBtn.addEventListener("click", () => {
        startBtnClicked = true
        startButtonChecker()
        
    })

    pomodoroBtn.addEventListener("click", () => {
        bodyEl.style.backgroundColor = "#BA4949"
        bodyEl.style.transition = "background-color 0.5s ease"

        contentWrapper.style.backgroundColor = "#C15C5C"
        contentWrapper.style.transition = "background-color 0.5s ease"

        pomodoroBtn.style.backgroundColor = "#A44E4E"
        hrEl.style.border = "1px solid #A44E4E"
        startBtn.style.color = "#BA4949"
        

        shortBrBtn.style.backgroundColor = "#C15C5C"
        shortBrBtn.style.transition = "background-color 0.5s ease"
        longBrBtn.style.backgroundColor = "#C15C5C"
        longBrBtn.style.transition = "background-color 0.5s ease"

        timer.textContent = "25:00"

        pomoIdentifier.textContent = "Time to focus!"

        taskBtn.style.backgroundColor = "#AB4343"
        taskBtn.style.transition = "background-color 0.5s ease"
        taskBtn.style.border = "2px dashed #C57A7A"
        taskBtn.style.color = "#C57A7A"
        
        pomodoroOn = true
        shortBreakOn = false
        longBreakOn = false
        
        startBtnClicked = false
        clearInterval(time)
        console.log("cleared interval")
        isPaused = true
        startButtonChecker()
        updateTimer()
        newTabTitle()

        headIcon.href = "./assets/red-pomodoro.png"

    })



    shortBrBtn.addEventListener("click", () => {
        bodyEl.style.backgroundColor = "#38858A"
        bodyEl.style.transition = "background-color 0.5s ease"

        contentWrapper.style.backgroundColor = "#4C9196"
        contentWrapper.style.transition = "background-color 0.5s ease"

        shortBrBtn.style.backgroundColor = "#417B80"
        hrEl.style.border = "1px solid #417B80"
        startBtn.style.color = "#38858A"
        
        

        pomodoroBtn.style.backgroundColor = "#4C9196"
        pomodoroBtn.style.transition = "background-color 0.5s ease"
        longBrBtn.style.backgroundColor = "#4C9196"
        longBrBtn.style.transition = "background-color 0.5s ease"
        
        timer.textContent = "05:00"

        pomoIdentifier.textContent = "Time for a break!"

        taskBtn.style.backgroundColor = "#337A7F"
        taskBtn.style.transition = "background-color 0.5s ease"
        taskBtn.style.border = "2px dashed #75A6A9"
        taskBtn.style.color = "#75A6A9"

        pomodoroOn = false
        shortBreakOn = true
        longBreakOn = false
        
        startBtnClicked = false
        clearInterval(time)
        console.log("cleared interval")
        isPaused = true
        startButtonChecker()
        updateTimer()
        newTabTitle()
        
        headIcon.href = "./assets/green-pomodoro.png"

        
    })

    longBrBtn.addEventListener("click", () => {
        bodyEl.style.backgroundColor = "#397097"
        bodyEl.style.transition = "background-color 0.5s ease"

        contentWrapper.style.backgroundColor = "#4D7FA2"
        contentWrapper.style.transition = "background-color 0.5s ease"

        longBrBtn.style.backgroundColor = "#426C8A"
        hrEl.style.border = "1px solid #426C8A"
        startBtn.style.color = "#397097"
        
        

        pomodoroBtn.style.backgroundColor = "#4D7FA2"
        pomodoroBtn.style.transition = "background-color 0.5s ease"
        shortBrBtn.style.backgroundColor = "#4D7FA2"
        shortBrBtn.style.transition = "background-color 0.5s ease"

        timer.textContent = "15:00"

        pomoIdentifier.textContent = "Time for a break!"

        taskBtn.style.backgroundColor = "#34678B"
        taskBtn.style.transition = "background-color 0.5s ease"
        taskBtn.style.border = "2px dashed #7699B1"
        taskBtn.style.color = "#7699B1"

        
        
        pomodoroOn = false
        shortBreakOn = false
        longBreakOn = true
        
        startBtnClicked = false
        clearInterval(time)
        console.log("cleared interval")
        isPaused = true
        startButtonChecker()
        updateTimer()
        newTabTitle()

        headIcon.href = "./assets/blue-pomodoro.png"
    })
})

