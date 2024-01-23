let goodPara = document.getElementById('good')
let erroPara = document.getElementById('err')

function good(){
    goodPara.textContent = "Correct Button"
    erroPara.textContent = ""
}

function bad(){
    goodPara.textContent = ""
    erroPara.textContent = "error! button is invalid"
}
