import {
  getPastries,
  updatePastry,
  deletePastry,
  addPastry,
} from './helper.js';

// open modal windows

let $menuBurger = document.querySelector('.header__burger');
let $leftSidebar = document.querySelector('.contact');

$menuBurger.addEventListener('click', () => {
  $leftSidebar.classList.add('contact_opened');
});

let $closeSidebarBtn = document.querySelector('.contact__close');
$closeSidebarBtn.addEventListener('click', () => {
  $leftSidebar.classList.remove('contact_opened');
});

//render pastry
const renderPastryElement = (pastry) => {
  let $html = document.createElement('div');
  $html.classList.add('pastries__pastry');
  $html.classList.add('pastry');

  $html.innerHTML = `
  <div class = "pastry-left">
     <h3 class = "pastry-left__title"> ${pastry.name} </h3>
     <a href="#"  class = "pastry-left__edit" > </a>
     <form class = "pastry-name-form"> 
       <input type="text" class="pastry-name-input"/>
       <a href="#" class="update-title"></a>
    </form>
  </div>
  <div class = "pastry-center">
     <p>price</p>
     <span class = "pastry-center__dollar" >$</span>
     <span class = "pastry-center__price"> ${pastry.cost} </span>
     <a href="#" class = "pastry-center__edit" > </a>
      <form class = "pastry-price-form"> 
       <input type="text" class="pastry-price-input"/>
       <a href="#" class="update-price"></a>
    </form>
  </div>
  <div class = "pastry-right">
      <p>in stock </p>
      <a href="#"  class = "pastry-right__decrease decrease" > </a>
      <span class = "pastry-right__instock">  ${pastry.inStock} </span>
      <a href="#"  class = "pastry-right__increase increase" > </a>
  </div>
  `;

  // change pastry's title
  let $editTitleBtn = $html.querySelector('.pastry-left__edit');
  $editTitleBtn.addEventListener('click', () => {
    $html.querySelector('.pastry-name-input').value = $html.querySelector(
      '.pastry-left__title'
    ).innerText;
    $html.classList.add('editing');
    $editTitleBtn.style.display = 'none';
  });

  let $okTitleBtn = $html.querySelector('.update-title');
  $okTitleBtn.addEventListener('click', () => {
    let newPastryName = $html.querySelector('.pastry-name-input').value;
    updatePastry(pastry.id, {
      name: newPastryName,
    }).then((r) => {
      $html.classList.remove('editing');
    });
  });

  // change pastry's price
  let $editPriceBtn = $html.querySelector('.pastry-center__edit');
  $editPriceBtn.addEventListener('click', () => {
    $html.querySelector('.pastry-price-input').value = $html.querySelector(
      '.pastry-center__price'
    ).innerText;
    $html.classList.add('editing-price');
    $editPriceBtn.style.display = 'none';
  });

  let $okPriceBtn = $html.querySelector('.update-price');
  $okPriceBtn.addEventListener('click', () => {
    updatePastry(pastry.id, {
      cost: Number($html.querySelector('.pastry-price-input').value),
    }).then((r) => {
      $html.classList.remove('editing-price');
    });
  });

  // increase pastry's quantity in stock
  let $increaseBtn = $html.querySelector('.increase');
  $increaseBtn.addEventListener('click', () => {
    updatePastry(pastry.id, {
      inStock: pastry.inStock + 1,
    });
  });

  // decrease pastry's quantity in stock
  let $decreaseBtn = $html.querySelector('.decrease');
  $decreaseBtn.addEventListener('click', () => {
    updatePastry(pastry.id, {
      inStock: pastry.inStock - 1,
    });
  });

  // delete pastry
  let $deleteBtn = document.createElement('a');
  $deleteBtn.setAttribute('href', '#');
  $deleteBtn.classList.add('pastry__delete');

  $html.append($deleteBtn);

  $deleteBtn.addEventListener('click', () => {
    deletePastry(pastry.id);
  });

  return $html;
};
let $addPastryForm = document.querySelector('.form-add-pastry');
let $addPastryBtn = document.querySelector('.main__add-pastry');
$addPastryBtn.addEventListener('click', () => {
  $addPastryForm.classList.add('opened');
});
$addPastryForm.addEventListener('click', (e) => {
  e.preventDefault();

  let pastryName = $addPastryForm.querySelector('.form-add-name').value;
  let pastryImage = $addPastryForm.querySelector('.form-add-image').value;
  let pastryIngredients = $addPastryForm.querySelector('.form-add-ingredients')
    .value;
  let pastryInStock = $addPastryForm.querySelector('.form-add-instock').value;
  let pastryCost = $addPastryForm.querySelector('.form-add-cost').value;

  let newPastry = {
    name: pastryName,
    image: pastryImage,
    ingredients: [pastryIngredients],
    inStock: Number(pastryInStock),
    cost: Number(pastryCost),
  };

  let result = addPastry(newPastry);

  return result;
});

let $closeModalFormBtn = document.createElement('a');
$closeModalFormBtn.setAttribute('href', '#');
$closeModalFormBtn.classList.add('close-modal-form');
$closeModalFormBtn.innerText = 'X';

$closeModalFormBtn.addEventListener('click', () => {
  $addPastryForm.classList.remove('opened');
});

$addPastryForm.prepend($closeModalFormBtn);

let $pastries = document.querySelector('.pastries');

//  render pastries
const renderPastries = async () => {
  let pastries = await getPastries();

  pastries.forEach((pastry) => {
    let $pastryDiv = renderPastryElement(pastry);
    $pastries.append($pastryDiv);
  });
};

renderPastries();
