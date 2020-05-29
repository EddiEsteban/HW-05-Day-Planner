const startingTime = 9 //hours in 24h time
const businessHoursDuration = 9
const businessHours = [];

const tasksArrayDefault = []
for (let i = 0; i < businessHoursDuration; i++) {
   tasksArrayDefault.push({hour:i+ startingTime, task:''})
}

const tasksArray = localStorage.tasksArray ? JSON.parse(localStorage.tasksArray) : tasksArrayDefault

function timeCheck(){
    let dateNow = moment().format('dddd MMM Do YYYY, h:mm:ss a')
    document.querySelector('#currentDay').innerHTML = dateNow
    for (let i = 0; i < businessHoursDuration;  i++){
        let hourIter = startingTime + i
        let textareaEl = document.querySelector(`#textarea${startingTime + i}`)
        // color textarea
        if (moment().format('H') == hourIter){
            textareaEl.setAttribute('class', 'present')
        } else if (moment().format('H') > hourIter){
            textareaEl.setAttribute('class', 'past')
        } else if (moment().format('H') < hourIter){
            textareaEl.setAttribute('class', 'future')
        }
    

    }
}

createTimeBlock()
timeCheck()
setInterval(timeCheck, 1000)


for (let i = 0; i < businessHoursDuration; i++) {
    businessHours.push(moment(startingTime + i, 'H').format('ha'))
}


function createTimeBlock(){
    for (i=0; i<businessHoursDuration;i++){
        var displayHour = moment(startingTime + i, 'H').format('h a')
        document.querySelector('#time-block-container').innerHTML += `<div 
            class='time-block row no-gutters' id='timeblock${startingTime + i}'><div 
                class='hour col-1' id='hour${startingTime + i}'>${displayHour}</div>
                <div class='description col-10'><textarea id='textarea${startingTime + i}'>${tasksArray[i].task}</textarea></div>
                <div class='col-1'><button class='saveBtn' onClick='saveTask(event)'>💾</button></div>
        </div>`
    }
}


function saveTask(event){
    event.preventDefault()
    let timeblockId = event.target.parentElement.parentElement.id.replace(/\D/g,'')
    let targetTask = document.querySelector(`#textarea${timeblockId}`)
    let tasksIndex = tasksArray.findIndex((obj => obj.hour == timeblockId))
    console.log(`timeblockID ${timeblockId}`)
    console.log(`targetTask ${targetTask}`)
    console.log(`tasksIndex ${tasksIndex}`)
    tasksArray[tasksIndex].task = targetTask.value

    localStorage.tasksArray = JSON.stringify(tasksArray)
}
