const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', () => {
  //refs.startBtn.disabled = true;
  //refs.stopBtn.disabled = false;
isTrue()
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  //refs.startBtn.disabled = false;
  //refs.stopBtn.disabled = true;
!isTrue()
  clearInterval(intervalId);
});
function isTrue(){
  if (refs.startBtn.disabled) {
    return refs.stopBtn.disabled = false;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


