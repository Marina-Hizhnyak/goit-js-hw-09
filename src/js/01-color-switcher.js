refs = {
    btnStart: document.querySelector("button[data-start]"),
    btnStop: document.querySelector("button[data-stop]"),
    body: document.querySelector("body")
}
let timerId;
refs.btnStart.addEventListener("click", changeColor)

function changeColor(e) {
    refs.btnStart.setAttribute("disabled", true);
     timerId = setInterval(()=> {
        refs.body.style.backgroundColor=getRandomHexColor();
    },1000)
    
}
refs.btnStop.addEventListener('click', () => {
    clearInterval(timerId);
refs.btnStart.removeAttribute('disabled', true);})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
