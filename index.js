import { getPastries } from './helper.js';

// open modal windows
let $cartIcon = document.querySelector('.cart-icon');
let $cart = document.querySelector('.cart-list');

$cartIcon.addEventListener('click', () => {
  $cart.classList.add('cart-list_opened');
});

let $closeCartBtn = document.querySelector('.cart-list__close');
$closeCartBtn.addEventListener('click', () => {
  $cart.classList.remove('cart-list_opened');
});

let $menuBurger = document.querySelector('.header__burger');
let $leftSidebar = document.querySelector('.contact');

$menuBurger.addEventListener('click', () => {
  $leftSidebar.classList.add('contact_opened');
});

let $closeSidebarBtn = document.querySelector('.contact__close');
$closeSidebarBtn.addEventListener('click', () => {
  $leftSidebar.classList.remove('contact_opened');
});

//render cart
let cart = [];
let renderCart = () => {
  $cart.innerHTML = '';

  cart.forEach(({ id, name, cost, quantity }) => {
    $cart.insertAdjacentHTML(
      'beforeend',
      `<div class='cart-list__item item'>
           <div class='item-info'>
              <p class='item-info__title'>${name}</p>
              <p class= "item-info__quantity">${quantity} items</p>
           </div>
           <span class='item__price'> $${(cost * quantity).toFixed(2)}</span>
      </div>`
    );
  });

  $cart.prepend($closeCartBtn);

  $cart.insertAdjacentHTML('beforeend', '<hr>');

  let totalPrice = cart.reduce((acc, item) => {
    return acc + item.cost * item.quantity;
  }, 0);

  $cart.insertAdjacentHTML(
    'beforeend',
    `<div class='cart-list__total total'>
        <p class='total__title'>Total</p>
        <p class= "total__price">$${totalPrice.toFixed(2)}</p>
    </div>`
  );

  let totalQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  let $totalQuantity = document.querySelector('.cart-number');
  $totalQuantity.innerText = totalQuantity;
};

// add pastry to cart
const addToCart = (pastry) => {
  let isFound = false;

  cart = cart.map((item) => {
    if (item.id == pastry.id) {
      item.quantity++;
      isFound = true;
    }

    return item;
  });

  if (!isFound) {
    cart.push({ ...pastry, quantity: 1 });
  }

  renderCart();
};

//render pastry
const renderPastryElement = (pastry) => {
  let $html = document.createElement('div');
  $html.classList.add('pastries__pastry');
  $html.classList.add('pastry');

  $html.innerHTML = `
  <img class = "pastry__image" src = "${pastry.image} alt = ${
    pastry.name
  }"></img>
  <h3 class = "pastry__title"> ${pastry.name} </h3>
  <p class = "pastry__ingredients" >${pastry.ingredients.join(', ')} </p>
  <span class = "pastry__price"> $${pastry.cost} </span>
  `;

  let $addToCartBtn = document.createElement('button');
  $addToCartBtn.classList.add('pastry__button');
  $addToCartBtn.innerText = 'Add to cart';

  $html.append($addToCartBtn);

  if (pastry.inStock == 0) {
    $addToCartBtn.setAttribute('disabled', 'disabled');
    $addToCartBtn.innerText = 'Not available';
  }
  $addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();

    addToCart(pastry);
  });

  return $html;
};

//render pastries
let $pastries = document.querySelector('.pastries');

const renderPastries = async () => {
  let pastries = await getPastries();

  pastries.forEach((pastry) => {
    let $pastryDiv = renderPastryElement(pastry);
    $pastries.append($pastryDiv);
  });
};

renderPastries();
