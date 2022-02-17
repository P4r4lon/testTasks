let inputs = [nameInput = document.getElementById("name"),
    lastNameInput = document.getElementById("lastname"),
    telInput = document.getElementById("tel"),
    passwordInput = document.getElementById("password"),
]

let confirmpass = document.getElementById("confirmpassword")

let regs = [
    /^[A-Za-z]{1,15}$/,
    /^[A-Za-z]{2,}$/,
    /^7([0-9]{10})/,
    /(?=.*\d)(?=.*[А-ЯЁ])[0-9а-яА-ЯЁё!@#$%^&*].{5,}/
]

let messages = [
    "только латиница, от 1 до 15 символов",
    "только латиница, от 2 символов",
    "только цифры, 11 символов, начинается с 7",
    "от 6 символов, без латиницы, обязательно хотя бы одну заглавную букву и одну цифру",
]

const button = document.querySelector(".btn")



button.onclick = (e) => { 
    e.preventDefault()
    let checkSum = 0
    for(let i = 0; i < inputs.length; i++){
        checkSum += Validator(regs[i], inputs[i], messages[i])
    }
    checkSum += passwordValidator(confirmpassword, document.getElementById("password"))
    if(checkSum === inputs.length + 1){
        inputs.forEach(element => {
            let id = element.id
            let value = element.value
            let obj = {}
            obj[id] = value
            console.log(obj)
        })
        
    }
}

function Validator(reg, input, message){
    input.span = getSpanByInputId(input.id)
    if(!checkValidity(reg, input)){
        input.span.innerHTML = message
        invalidInput(input)
        return 0
    }else{
        validInput(input)
        input.span.innerHTML = ""
        return 1
    }
}

function passwordValidator(confirmpass, pass){
    confirmpass.span = getSpanByInputId(confirmpass.id)
    
    if(confirmpass.value != "" && (confirmpass.value === pass.value)){
        validInput(confirmpass)
        return 1
    }else{
        invalidInput(confirmpass)
        confirmpass.span.innerHTML = "Пароли не совпадают!"
        return 0
    }
}

function checkValidity(reg, input){
    return reg.test(input.value)
}

function invalidInput(input){
    input.classList.remove("valid")
    input.classList.add("invalid")
}

function validInput(input){
    input.classList.remove("invalid")
    input.classList.add("valid")
}

function getSpanByInputId(id){
    let span = document.querySelector("."+id)
    return span
}