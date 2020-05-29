
function setDate(){
    dateNow = moment().format('dddd MMM Do YYYY, h:mm:ss a')
    document.querySelector('#currentDay').innerHTML = dateNow
    console.log(moment('7pm','ha').format('H'))
}
setDate()
setInterval(setDate, 1000)

const startingTime = 9 //24h
const businessHoursDuration = 9
const businessHours = [];
for (let i = 0; i < businessHoursDuration; i++) {
    businessHours.push(moment(startingTime + i, 'H').format('ha'))
}


console.log(moment().endOf('day').fromNow() )

function createTimeBlock(){
    for (i=0; i<businessHoursDuration;i++){
        document.querySelector('#time-block-container').innerHTML += `
        <div class='time-block row no-gutters' id='${i}'>
                <div class='hour col-1'>
                    ${moment(startingTime + i, 'H').format('h a')}
                </div>
                <div class='description col-10'><textarea></textarea></div>
                <div class='col-1'><button class='saveBtn'>💾</button></div>
        </div>`
    }
}

window.addEventListener('load', createTimeBlock)

