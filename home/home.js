const burgerMenu = document.querySelector('.burger-menu')
const burgerMenuAdd = document.querySelector('.burger-menu-add')
const wrapperBurger = document.querySelector('.wrapper-burger')
const scrollHidden = document.querySelector('html')

burgerMenu.addEventListener('click', function () {
  burgerMenu.classList.toggle('burger-menu-add');

  const  burgList = document.querySelectorAll('.burg-list')
  let burgerArr = Array.from(burgList)
  burgerArr.forEach(item => item.addEventListener('click', () => {
  wrapperBurger.classList.remove('active')
  scrollHidden.style.overflow = 'auto'
  burgerMenu.classList.remove('burger-menu-add');
}))

  if (burgerMenu.classList.contains('burger-menu-add')) {
    wrapperBurger.classList.add('wrapper-burger-add') 
    wrapperBurger.classList.toggle('active')
    scrollHidden.style.overflow = 'hidden'
  } else {
    wrapperBurger.classList.remove('wrapper-burger-add') 
    wrapperBurger.classList.toggle('active')
    scrollHidden.style.overflow = 'auto'
  }
})

// ------------------------------slider------------------------
const divLine = document.querySelectorAll('.progress')
const img = document.querySelectorAll('.slider-img .slide img')//повертає всі єлементи дідповідно селектора CSS
const line = document.querySelector('.slider-img')
const clickRight = document.querySelector('.click-right')
const clickLeft = document.querySelector('.click-left')
let count = 0;
let width;
let num = 0;


let arrDivLine = Array.from(divLine)
let currentLine = 0;



function startInterval() {
  intervalId = setInterval(() => {
    if (currentLine === 40) {
      arrDivLine[num].style.width = '0px';
      currentLine = 0;
      if (num === 2) {
        num = 0;
      } else num++;
      clickR();
    } else {
      arrDivLine[num].style.width = currentLine + 'px';
      currentLine++;
    }
  }, 120);
}
startInterval();

function stopInterval() {
  clearInterval(intervalId);
}

line.addEventListener('mouseenter', stopInterval);
line.addEventListener('mouseleave', startInterval);

function slider() {
  width = document.querySelector('.slider-img').offsetWidth //calculate width element of document that meets selector 
  line.style.width = width * img.length + 'px'
  img.forEach(item => {
    item.style.width = width + 'px'
    // item.style.height = 'auto'
  })
  sdvig()
}
slider()
// window.addEventListener('resize', slider);

function clickL() {
  count--
  if (count < 0) {
    count = img.length - 1
  }
  sdvig()
  arrDivLine.forEach((item) => item.style.width = '0px')
  currentLine = 0
  num = count
}

function clickR() {
  count++
  if (count >= img.length) {
    count = 0
  }
  sdvig()
  arrDivLine.forEach((item) => item.style.width = '0px')
  currentLine = 0
  num = count
}

clickRight.addEventListener('click', () => {
  clickR()
})

clickLeft.addEventListener('click', () => {
  clickL()
})

function sdvig() {
  line.style.transform = 'translate(-' + count * width + 'px)';
}

//---------
document.addEventListener('touchstart', handleStart, false)
line.addEventListener('touchmove', handle, false)
let x1 = null
let y1 = null

function handleStart(e) {
  const first = e.touches[0]
  x1 = first.clientX
  y1 = first.clientY
}

function handle(e) {
  if (!x1 || !y1) {
    return false
  }
  let x2 = e.touches[0].clientX
  let y2 = e.touches[0].clientY
  
  let xDiff = x2 - x1
  let yDiff = y2 - y1

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      clickL()
    } else {
      clickR()
    } 
  }
  // else {
  //   if (yDiff > 0) console.log('down')
  //   else console.log('top')
  // }

  x1 = null
  y1 = null
}
//-------------------------------------------------------------