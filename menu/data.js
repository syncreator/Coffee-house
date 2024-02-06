const menu = document.querySelector('.menu')
const tabs = document.querySelector('.tabs')
const btnFoffee = document.querySelector('.btn-coffee')
const btnTea = document.querySelector('.btn-tea')
const btnDessert = document.querySelector('.btn-dessert')

const renderCart = (img, name, about, price) => {
  const html =`
  <div class="cart-img">
    <img src="${img}" alt="#">
  </div>
  <div class="cart-info">
    <div>
      <p class="cart-info-name">${name}</p>
      <p class="cart-info-about">${about}</p>
    </div>
    <p class="cart-info-price">${price}</p>
  </div>
  `
  const saction = document.createElement('div');
  saction.classList.add('cart')
  saction.innerHTML = html;
  menu.appendChild(saction);
};


function fetchRender(prod = 'coffee') {
  fetch('bd.json')
  .then(response => response.json())
  .then((data) => data.forEach(element => {
  if (element.type === prod) {
    renderCart(element.img, element.name, element.description, element.price )
  }
  }))
}
fetchRender()

const tabsArr = [btnTea, btnDessert, btnFoffee];

tabs.addEventListener('click', function (event) {
let clickedElement = event.target.closest('.tabs-all');
  if (clickedElement) {
    let dataNameValue = clickedElement.getAttribute('data-name');
    tabsArr.forEach(tab => {
      const divElement = tab.querySelector('div');
      if (tab.dataset.name === dataNameValue) {
        circleCart.style.display = tab.dataset.name === 'tea' ? 'none' : 'flex';
        tab.classList.toggle('tabs-off', true);
        tab.classList.toggle('tabs-on', false); 
        divElement.classList.add('tabs-off-img')
      } else {
        divElement.classList.remove('tabs-off-img');
        tab.classList.remove('tabs-off');
        tab.classList.add('tabs-on');
      }
    });
    
    
    menu.innerHTML = ''
    fetchRender(dataNameValue)
  }
});

window.addEventListener('resize', function() {
  const circleCart = document.querySelector('.circle-cart');
  circleCart.style.display = shouldDisplayCircleCart() ? 'flex' : 'none';
});

function shouldDisplayCircleCart() {
  return true; 
}
