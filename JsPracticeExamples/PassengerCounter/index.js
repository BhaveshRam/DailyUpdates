
let countEl = document.getElementById('count-el')
let count =0
console.log(countEl)

function increment(){
    count = count +1
    countEl.innerText = count
    console.log(count)
}
let sav = ""
let prevSaves= document.getElementById('prev-saves')
function Save(){
    sav = sav + count + " - "
    prevSaves.textContent = "Previous Saves: "+sav
    count =0
    countEl.innerText = count
}