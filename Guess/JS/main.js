import { getMessageAttempt, getNumberRandom } from "./utils.js"
import { changeTheme } from "./themes.js"

const d = document

const START_NUMBER = 1
const END_NUMBER = 150
const NUMBER_ATTEMPS = 5

// seleccionando elementos del dom
const input = d.querySelector('input')
const submit = d.querySelector('button')
const message = d.getElementById('message')
const wrappedAttempts = d.getElementById('wrappedAttemps')
const buttonReset = d.getElementById('reset')
const attempMessage = d.getElementById('attempMessage')
const startSpan1 = document.getElementById('start1');
const endSpan1 = document.getElementById('end1');
const startSpan2 = document.getElementById('start2');
const endSpan2 = document.getElementById('end2');

// Asignamos el rango de edad
startSpan1.textContent = START_NUMBER;
endSpan1.textContent = END_NUMBER;
startSpan2.textContent = START_NUMBER;
endSpan2.textContent = END_NUMBER;

// añadiendo eventos
submit.addEventListener('click', handleClickSend)
buttonReset.addEventListener('click', resetGame)

let currentAttempt = 0
let attempts = []
let mysteriousNumber = getNumberRandom(START_NUMBER, END_NUMBER)
console.log(mysteriousNumber)
attempMessage.textContent = getMessageAttempt(NUMBER_ATTEMPS)


function handleClickSend() {
  if (!(validateNumber())) {
    input.value = ''
    return alert(`Alto ahi rufian, ingresa un número entre ${START_NUMBER} y ${END_NUMBER}!`)
  }

  let inputValue = parseInt(input.value)

  if (currentAttempt === NUMBER_ATTEMPS) {
    message.textContent = 'Ya has superado el limite de intentos, has perdido!'
    input.disabled = true
    changeTheme('full');
    return
  }

  if (inputValue === mysteriousNumber) {
    changeTheme('fun');
    message.textContent = 'Felicidades adivinaste mi edad'
    input.disabled = true
  } else if (inputValue > mysteriousNumber) {
    message.textContent = 'NO SOY TAN MAYOR!'
  } else if (inputValue < mysteriousNumber) {
    message.textContent = 'NO SOY TAN MENOR!'
  }

  attempts.push(inputValue)
  paintAttemps(attempts)
  input.value = ''
  ++currentAttempt
  attempMessage.textContent = `Te quedan ${NUMBER_ATTEMPS - currentAttempt} intentos!`
    
    // Verificar si el número de intentos llegó a cero
    if (currentAttempt >= NUMBER_ATTEMPS) {
      changeTheme('full'); // Llamada a la función del otro archivo para cambiar el tema
    }
}

function paintAttemps(attempts) {
  const wrappedAttempts = d.getElementById('wrappedAttemps')
  let htmlAttemps = ''

  attempts.forEach(function (currentAttempt) {
    htmlAttemps += `<span>${currentAttempt}</span>`
  })

  wrappedAttempts.innerHTML = htmlAttemps
}


function resetGame() {
  attempts = []
  input.value = ''
  wrappedAttempts.innerHTML = ''
  currentAttempt = 0
  attempMessage.textContent = `Tienes ${NUMBER_ATTEMPS - currentAttempt} intentos!`
  message.textContent = ''
  input.disabled = false
  mysteriousNumber= getNumberRandom(START_NUMBER,END_NUMBER); 
  console.log( mysteriousNumber);  
}

function validateNumber() {
  let inputValue = parseInt(input.value)
  const isValid =
    inputValue <= END_NUMBER &&
    inputValue >= START_NUMBER &&
    !isNaN(inputValue)
  return isValid
}