const body = document.querySelector('body')

document.addEventListener('click', (event) =>{
  const clickedElement = event.target;
  const cartElement = clickedElement.closest('.cart');

  if (clickedElement.classList.contains('cart') || clickedElement.closest('.cart')) {
    if (cartElement) {
      const nameElement = cartElement.querySelector('.cart-info-name');
      const nameValue = nameElement.textContent;
      dataMenu(nameValue)
      scrollHidden.style.overflow = 'hidden'
    }
  }
});


function dataMenu(nameMenu) {
  fetch('bd.json')
  .then(response => response.json())
  .then((data) => data.forEach(element => {
  if (element.name === nameMenu) {
    rendermodal(element)
  }
  }))
}


document.addEventListener('click', (event) => {
  const wrapperModalClick = event.target;
  const wrapperModal = document.querySelector('.wrapper-modal')
  if (wrapperModalClick.classList.contains('wrapper-modal')) {
    wrapperModal.remove()
    scrollHidden.style.overflow = 'auto'
  }
})



let lastSelectedPrice = 0;

document.addEventListener('click', (event) => {
  const elementModal = event.target;
  const clickedWrapperCircle = elementModal.closest('.size-wrapper-circle');

  if (clickedWrapperCircle) {
    const totalElement = document.querySelector('.modal-info-total-price');
    let currentTotal = parseFloat(totalElement.textContent);
    const sizeWrapperCircles = document.querySelectorAll('.size-wrapper-circle');

    sizeWrapperCircles.forEach(wrapperCircle => {
      const sizeElement = wrapperCircle.querySelector('.size');
      if (wrapperCircle === clickedWrapperCircle) {
        wrapperCircle.classList.add('active');
        sizeElement.classList.add('active');

        const dataPrice = parseFloat(clickedWrapperCircle.getAttribute('data-price'));

        currentTotal = currentTotal - lastSelectedPrice + dataPrice;

        lastSelectedPrice = dataPrice;
      } else {
        wrapperCircle.classList.remove('active');
        sizeElement.classList.remove('active');
      }
    });

    totalElement.textContent = currentTotal.toFixed(2);
  }
});


document.addEventListener('click', (event) => {
  const elementModal = event.target;
  const addClickedWrapperCircle = elementModal.closest('.add-wrapper-circle');
  const totalElement = document.querySelector('.modal-info-total-price');

  if (addClickedWrapperCircle) {
    let currentTotal = parseFloat(totalElement.textContent);
    const dataValue = parseFloat(addClickedWrapperCircle.getAttribute('data-value'));

    if (addClickedWrapperCircle.classList.contains('active')) {
      currentTotal -= dataValue;
    } else {
      currentTotal += dataValue;
    }

    addClickedWrapperCircle.classList.toggle('active');
    const addElement = addClickedWrapperCircle.querySelector('.add');
    addElement.classList.toggle('active');
    
    totalElement.textContent = currentTotal.toFixed(2);
  }
});

document.addEventListener('click', (event) => {
  const elementModalBtn = event.target;
  const wrapperModal = document.querySelector('.wrapper-modal')
  const clickElementModalBtn = elementModalBtn.closest('.modal-info-btn');
  if (clickElementModalBtn) {
    wrapperModal.remove()
    scrollHidden.style.overflow = 'auto'
  }
})


const rendermodal = (element) => {
  const html =`
<div class="modal">
  <div class="modal-img"><img src="${element.img}" alt=""></div>
  <div class="modal-info">
    <h3 class="modal-info-name">${element.name}</h3>
    <p class="modal-info-about">${element.description}</p>
    <div class="modal-info-size">
      <p class="modal-info-size-p">Size</p>
      <div class="size-wrapper">
      <div class="size-wrapper-circle active" data-price="${element.sizes.s.add_price}"><div class="size active">S</div><span class="modal-btn-span">${element.sizes.s.size}</span></div>
      <div class="size-wrapper-circle" data-price="${element.sizes.m.add_price}"><div class="size">M</div><span class="modal-btn-span">${element.sizes.m.size}</span></div>
      <div class="size-wrapper-circle" data-price="${element.sizes.l.add_price}"><div class="size">L</div><span class="modal-btn-span">${element.sizes.l.size}</span></div>
    </div>
    </div>
    <div class="modal-info-add">
      <p class="modal-info-add-p">Additives</p>
      <div class="add-wrapper">
      <div class="add-wrapper-circle" data-value="${element.additives[0].add_price}"><div class="add">1</div><span class="modal-btn-span">${element.additives[0].name}</span></div>
      <div class="add-wrapper-circle" data-value="${element.additives[1].add_price}" ><div class="add">2</div><span class="modal-btn-span">${element.additives[1].name}</span></div>
      <div class="add-wrapper-circle" data-value="${element.additives[2].add_price}" ><div class="add">3</div><span class="modal-btn-span">${element.additives[2].name}</span></div>
    </div>
    </div>
    <div class="modal-info-total">
      <div class="modal-info-total-total">Total:</div>
      <div class="total-span">
      <span>$</span>
      <div class="modal-info-total-price">${element.price}</div>
      </div>
      
    </div>
    <div class="modal-info-line"><span><img src="./img/info-empty.png" alt="#"></span>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>
    <div class="modal-info-btn">Close</div>
  </div>
</div>
  `
  const footer = document.querySelector('.footer')
  const saction = document.createElement('div');
  saction.classList.add('wrapper-modal')
  saction.innerHTML = html;
  footer.appendChild(saction);
};


