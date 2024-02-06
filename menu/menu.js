const burgerMenu = document.querySelector('.burger-menu')
const burgerMenuAdd = document.querySelector('.burger-menu-add')
const wrapperBurger = document.querySelector('.wrapper-burger')
const scrollHidden = document.querySelector('html')
const circleCart = document.querySelector('.circle-cart')
const circleNone = document.querySelector('.circle-none')

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

circleCart.addEventListener('click', function() {
  const menuItems = document.querySelectorAll('.menu > :nth-child(n+5)');
  menuItems.forEach(item => {
    item.style.display = 'block';
  });
  circleCart.style.display ='none'
});