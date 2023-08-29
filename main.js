import { Shoes, Pants, Shirt } from './classes.js';
var nextBtn = document.getElementById('nextBtn');
var prevBtn = document.getElementById('prevBtn');
var searchBtn = document.getElementById('searchBtn');
var searchBar = document.getElementById('searchBar');
var backToTopBtn = document.getElementById('backToTopButton');
export var products = [
  new Shirt('White Shirt', 'T-1', 150, 'Shirts', './productAssets/shirts/white.jpg'),
  new Shirt('Black Shirt', 'T-2', 650, 'Shirts', './productAssets/shirts/black.jpg'),
  new Shirt('Blue Shirt', 'T-3', 550, 'Shirts', './productAssets/shirts/blue.jpg'),
  new Shirt('Light Blue Shirt', 'T-4', 400, 'Shirts', './productAssets/shirts/lightBlue.jpg'),

  new Pants('Gray Shorts', 'P-1', 250, 'Pants', './productAssets/pants/grayS.jpg'),
  new Pants('White Shorts', 'P-2', 350, 'Pants', './productAssets/pants/whiteS.jfif'),
  new Pants('Black Pants', 'P-3', 550, 'Pants', './productAssets/pants/blackP.jpg'),
  new Pants('Blue Jeans', 'P-4', 400, 'Pants', './productAssets/pants/blueP.png'),
  new Pants('Biege Shorts', 'P-5', 700, 'Pants', './productAssets/pants/beigeS.jpg'),

  new Shoes('White Shoes', 'S-1', 250, 'Shoes', './productAssets/shoes/white.png'),
  new Shoes('Black Shoes', 'S-2', 900, 'Shoes', './productAssets/shoes/black.png'),
  new Shoes('Gray Shoes', 'S-3', 550, 'Shoes', './productAssets/shoes/gray.png'),
  new Shoes('Green Shoes', 'S-4', 400, 'Shoes', './productAssets/shoes/green.png'),
  new Shoes('Blue Shoes', 'S-5', 750, 'Shoes', './productAssets/shoes/blue.png'),
];

function loadRandomProducts(filtered) {
  if (filtered) {
    var productsContainer = document.getElementById('products');
    if (filtered.length == 0) {
      productsContainer.innerHTML =
        '<h3 style="margin-left: 50px;">No products match your selection.</h3>';
    } else {
      productsContainer.innerHTML = '';
    }

    filtered
      .sort(function (a, b) {
        return a.price - b.price;
      })
      .slice(0, 9)
      .forEach(function (product) {
        var productDiv = document.createElement('div');
        productDiv.classList.add('products');

        var image = document.createElement('img');
        image.classList.add('miniProducts');
        image.src = product.src;
        productDiv.appendChild(image);

        var name = document.createElement('p');
        name.textContent = `${product.name} , ${product.price}$`;
        productDiv.appendChild(name);

        var addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to cart';
        addToCartBtn.classList.add('cartBtn');
        productDiv.appendChild(addToCartBtn);

        productsContainer.appendChild(productDiv);
      });
  } else {
    var productDivs = document.getElementsByClassName('products');
    var selectedIndices = getRandomUniqueIndices(products.length, 9);
    for (var i = 0; i < productDivs.length; i++) {
      var index = selectedIndices[i];
      var product = products[index];
      var div = productDivs[i];
      var img = div.getElementsByTagName('img')[0];
      var p = div.getElementsByTagName('p')[0];
      var button = div.getElementsByTagName('button')[0];
      img.src = product.src;
      p.textContent = `${product.name} , ${product.price}$`;
    }
  }
  // add to cart functionality

  var cartButtons = document.querySelectorAll('.cartBtn');
  cartButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      var pTag = button.parentNode.querySelector('p').textContent.split(',')[0].trim();
      var cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

      console.log('brand new product is ' + product.name);
      if (cartItems.length == 0) {
        console.log('if cart is brand new ' + cartItems.length);
        for (var i = 0; i < products.length; i++) {
          if (products[i].name === pTag) {
            var newItem = { product, count: 1 };
            newItem.product = products[i];
            console.log('loop brand new product is ' + newItem.product);
            console.log(newItem);
            cartItems.push(newItem);
            break;
          }
        }
      } else {
        var flag = false;
        for (var i = 0; i < cartItems.length; i++) {
          if (cartItems[i].product.name == pTag) {
            console.log('product' + pTag + ' exists');
            cartItems[i].count++;
            flag = true;
          }
        }
        if (flag == false) {
          for (var i = 0; i < products.length; i++) {
            if (products[i].name === pTag) {
              console.log("product doesn't exists in an existing array");
              var newItem = { product, count: 1 };

              newItem.product = products[i];
              console.log(newItem);
              cartItems.push(newItem);
              break;
            }
          }
        }
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));

      var toast = document.getElementById('snackbar');

      toast.innerHTML = `${pTag} was added to your cart!`;

      toast.className = 'show';

      setTimeout(function () {
        toast.className = toast.className.replace('show', '');
      }, 3000);
    });
  });
}

function getRandomUniqueIndices(range, count) {
  var indices = [];
  var availableIndices = Array.from(Array(range).keys());

  for (var i = 0; i < count; i++) {
    var randomIndex = Math.floor(Math.random() * availableIndices.length);
    var index = availableIndices.splice(randomIndex, 1)[0];
    indices.push(index);
  }

  return indices;
}

var priceFilter = document.getElementById('price');
var buttons = document.querySelectorAll('.catBtns');

// Filter products based on category
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
    this.classList.add('active');
    var selectedCat = this.textContent;
    if (selectedCat == 'All') {
      loadRandomProducts(products);
    } else {
      var filteredProducts = products.filter(function (product) {
        var catMatch = product.category == selectedCat;
        return catMatch;
      });
      loadRandomProducts(filteredProducts);
    }
  });
});
priceFilter.addEventListener('input', priceFltr);

// Filter products based on price
function priceFltr() {
  var priceValue = document.getElementById('priceValue');
  priceValue.innerHTML = `${priceFilter.value}$`;

  var minPrice = priceFilter.value;
  const buttons = document.getElementsByClassName('catBtns');
  var currentCat = null;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains('active')) {
      currentCat = buttons[i].textContent;
    }
  }
  if (currentCat == null || currentCat == 'All') {
    var filteredProducts = products.filter(function (product) {
      var priceMatch = parseInt(product.price) <= parseInt(minPrice);
      return priceMatch;
    });
    loadRandomProducts(filteredProducts);
  } else if (currentCat == 'T-shirts' || currentCat == 'Shoes' || currentCat == 'Pants') {
    var filteredProducts = products.filter(function (product) {
      var firstCheck = parseInt(product.price) <= parseInt(minPrice);
      var secondCheck = product.category == currentCat;
      var priceMatch = firstCheck && secondCheck;
      return priceMatch;
    });
    loadRandomProducts(filteredProducts);
  }
}
// Filter based on keyword
var searchBar = document.getElementById('searchBar');
function searchPro(searchTerm) {
  let inputValue = searchTerm.toLowerCase();
  window.scrollTo({
    top: 800,
    behavior: 'smooth',
  });
  var matchingProducts = products.filter(function (product) {
    var firstElement = product.name.toLowerCase();
    return firstElement.includes(inputValue);
  });
  loadRandomProducts(matchingProducts);
}
searchBar.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchPro(searchBar.value);
  }
});

let currentImg = 1;
let startFlag = false;
const imageContainer = document.getElementById('imageContainer');
let autoPlayer;

function changeImage() {
  currentImg = currentImg + 1;
  if (currentImg > 6) {
    currentImg = 1;
  }

  imageContainer.style.opacity = 0;
  setTimeout(() => {
    document.getElementById('bigImg').setAttribute('src', `./sliderAssets/${currentImg}.jpg`);

    imageContainer.style.opacity = 1;
  }, 500);
}

function startAutoPlayer() {
  autoPlayer = setInterval(changeImage, 2000);
}

nextBtn.addEventListener('click', () => {
  clearInterval(autoPlayer);
  changeImage();
  startAutoPlayer();
});

prevBtn.addEventListener('click', () => {
  clearInterval(autoPlayer);
  currentImg = currentImg - 1;
  if (currentImg < 1) {
    currentImg = 6;
  }
  imageContainer.style.opacity = 0;
  setTimeout(() => {
    document.getElementById('bigImg').setAttribute('src', `./sliderAssets/${currentImg}.jpg`);

    imageContainer.style.opacity = 1;
  }, 500);

  startAutoPlayer();
});
changeImage();
startAutoPlayer();
searchBtn.addEventListener('click', () => {
  searchBar.style.visibility = 'visible';
  searchBar.focus();
  searchBar.classList.add('slide-out-animation');
});
searchBar.addEventListener('blur', () => {
  if (searchBar.value == '') {
    searchBar.classList.remove('slide-out-animation');
    searchBar.classList.add('slide-in-animation');
    setTimeout(() => {
      searchBar.classList.remove('slide-in-animation');
      searchBar.style.visibility = 'hidden';
    }, 800);
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

window.addEventListener('scroll', (event) => {
  if (window.scrollY > 100) {
    backToTopBtn.style.display = 'inline-block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
window.addEventListener('load', function () {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get('search'));
  if (urlParams.get('search')) {
    searchPro(urlParams.get('search'));
  } else {
    loadRandomProducts();
  }
});
