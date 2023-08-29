var backToTopBtn = document.getElementById('backToTopButton');
window.addEventListener('load', function () {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var midSection = document.getElementById('content');
  if (cart == undefined || cart.length == 0) {
    midSection.innerHTML =
      '<img class="cartGif" src="./assets/cart.gif"/><h3 >Your cart is empty.</h3>';
  } else {
    var table = document.createElement('table');
    table.id = 'cart';

    var thead = document.createElement('thead');
    thead.classList.add('tableHead');
    var theadArray = [
      ' ',
      'Product Image',
      'Product Name',
      'ID',
      'Unit Price',
      'Count',
      'Total Price',
    ];
    var headerRow = document.createElement('tr');
    for (var x = 0; x < 7; x++) {
      var th = document.createElement('th');
      th.innerHTML = theadArray[x];
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);
    var tbody = document.createElement('tbody');

    cart.forEach(function (item) {
      var row = document.createElement('tr');

      var img = document.createElement('img');
      img.src = item.product.src;
      var cartKeys = [
        '',
        img,
        item.product.name,
        item.product.id,
        `${item.product.price}$`,
        item.count,
        `${item.count * item.product.price}$`,
      ];
      for (var i = 0; i < 7; i++) {
        var cell = document.createElement('td');

        cell.classList.add(`cell${i}`);
        cell.style.textAlign = 'center';

        if (i == 0) {
          cell.innerHTML = `<i class="fa-regular fa-circle-xmark" style="color: orange;"></i>`;

          cell.getElementsByTagName('i')[0].addEventListener('click', () => {
            pName = cell.parentNode.querySelectorAll('.cell2')[0].textContent;
            console.log(pName);
            var cartData = JSON.parse(localStorage.getItem('cart'));
            for (var t = 0; t < cartData.length; t++) {
              if (pName == cartData[t].product.name) {
                cartData.splice(t, 1);
                localStorage.setItem('cart', JSON.stringify(cartData));
              }
            }

            cell.parentNode.remove();
            var totalCells = tbody.querySelectorAll('.cell6');
            var sum = 0;
            for (var i = 0; i < totalCells.length; i++) {
              var text = totalCells[i].textContent.trim();
              var value = parseInt(text.replace('$', ''));
              sum += value;
            }
            var totalCell = tbody.getElementsByClassName('totalCell')[0];
            totalCell.innerHTML = `<p class="totalPriceText">Total Price: ${sum}$</p>`;
            if (sum == 0) {
              midSection.innerHTML =
                '<img class="cartGif" src="./assets/cart.gif"/><h3 >Your cart is empty.</h3>';
            }
          });
          row.appendChild(cell);
        } else if (i == 1) {
          cell.innerHTML = `<img class="cartImgs" src=${img.src}>` || '';
          row.appendChild(cell);
        } else if (i == 5) {
          cell.innerHTML = '<div id="counterContainer"></div>';

          var container = cell.firstChild;
          container.style.width = '90px';
          container.style.height = '10px';
          container.style.display = 'inline-block';

          var counterInput = document.createElement('input');
          counterInput.classList.add('counter');
          counterInput.style.width = '40px';
          counterInput.type = 'number';
          counterInput.value = item.count;
          counterInput.min = '1';
          counterInput.addEventListener('change', function () {
            pName = cell.parentNode.querySelectorAll('.cell2')[0].textContent;
            console.log(pName);
            var cartData = JSON.parse(localStorage.getItem('cart'));
            for (var x = 0; x < cartData.length; x++) {
              if (pName == cartData[x].product.name) {
                console.log(counterInput.value);
                console.log(cartData[x].count);
                cartData[x].count = Number(counterInput.value);
                console.log('after' + cartData[x].count);
                localStorage.setItem('cart', JSON.stringify(cartData));
              }
            }
            cell.parentNode.querySelectorAll('.cell6')[0].innerHTML = `${
              counterInput.value * item.product.price
            }$`;
            var totalCells = tbody.querySelectorAll('.cell6');
            console.log(totalCells);
            var sum = 0;
            for (var i = 0; i < totalCells.length; i++) {
              var text = totalCells[i].textContent.trim();
              var value = parseInt(text.replace('$', ''));
              sum += value;
            }
            var totalCell = tbody.getElementsByClassName('totalCell')[0];
            totalCell.innerHTML = `<p class="totalPriceText">Total Price: ${sum}$</p>`;
          });
          var decrementBtn = document.createElement('button');
          decrementBtn.classList.add('counterBtn');
          decrementBtn.textContent = '-';
          decrementBtn.addEventListener('click', function () {
            if (counterInput.value > 0) {
              counterInput.value--;
              pName = cell.parentNode.querySelectorAll('.cell2')[0].textContent;
              console.log(pName);
              var cartData = JSON.parse(localStorage.getItem('cart'));
              for (var x = 0; x < cartData.length; x++) {
                if (pName == cartData[x].product.name) {
                  console.log(counterInput.value);
                  console.log(cartData[x].count);
                  cartData[x].count = Number(counterInput.value);
                  console.log('after' + cartData[x].count);
                  localStorage.setItem('cart', JSON.stringify(cartData));
                }
              }
              cell.parentNode.querySelectorAll('.cell6')[0].innerHTML = `${
                counterInput.value * item.product.price
              }$`;
            }
            var totalCells = tbody.querySelectorAll('.cell6');
            var sum = 0;
            for (var i = 0; i < totalCells.length; i++) {
              var text = totalCells[i].textContent.trim();
              var value = parseInt(text.replace('$', ''));
              sum += value;
            }
            var totalCell = tbody.getElementsByClassName('totalCell')[0];
            totalCell.innerHTML = `<p class="totalPriceText">Total Price: ${sum}$</p>`;
          });

          var incrementBtn = document.createElement('button');
          incrementBtn.classList.add('counterBtn');

          incrementBtn.textContent = '+';
          incrementBtn.addEventListener('click', function () {
            counterInput.value++;
            pName = cell.parentNode.querySelectorAll('.cell2')[0].textContent;
            console.log(pName);
            var cartData = JSON.parse(localStorage.getItem('cart'));
            for (var x = 0; x < cartData.length; x++) {
              if (pName == cartData[x].product.name) {
                console.log(counterInput.value);
                console.log(cartData[x].count);
                cartData[x].count = Number(counterInput.value);
                console.log('after' + cartData[x].count);
                localStorage.setItem('cart', JSON.stringify(cartData));
              }
            }
            cell.parentNode.querySelectorAll('.cell6')[0].innerHTML = `${
              counterInput.value * item.product.price
            }$`;
            var totalCells = tbody.querySelectorAll('.cell6');
            var sum = 0;
            for (var i = 0; i < totalCells.length; i++) {
              var text = totalCells[i].textContent.trim();
              var value = parseInt(text.replace('$', ''));
              sum += value;
            }
            var totalCell = tbody.getElementsByClassName('totalCell')[0];
            totalCell.innerHTML = `<p class="totalPriceText">Total Price: ${sum}$</p>`;
          });

          container.appendChild(decrementBtn);
          container.appendChild(counterInput);
          container.appendChild(incrementBtn);

          row.appendChild(cell);
        } else {
          cell.innerHTML = cartKeys[i] || '';
          row.appendChild(cell);
        }
      }
      tbody.appendChild(row);
    });
    var totalRow = document.createElement('tr');
    var totalCell = document.createElement('td');
    totalRow.append(totalCell);
    totalCell.classList.add(`totalCell`);
    totalCell.setAttribute('colspan', '7');
    var totalCells = tbody.querySelectorAll('.cell6');
    var sum = 0;
    for (var i = 0; i < totalCells.length; i++) {
      var text = totalCells[i].textContent.trim();
      var value = parseInt(text.replace('$', ''));
      sum += value;
    }
    totalCell.innerHTML = `<p class="totalPriceText">Total Price: ${sum}$</p>`;
    tbody.appendChild(totalRow);
    table.appendChild(tbody);
    midSection.appendChild(table);
    const checkoutButton = document.createElement('button');
    checkoutButton.innerHTML = 'Checkout';
    checkoutButton.classList.add('checkout');
    checkoutButton.addEventListener('click', () => {
      let toast = document.getElementById('snackbar');

      toast.innerHTML = `Thank you for shopping with us!`;

      toast.className = 'show';

      setTimeout(function () {
        toast.className = toast.className.replace('show', '');
      }, 3000);
    });
    midSection.appendChild(checkoutButton);
  }
});

var searchBtn = document.getElementById('searchBtn');

// Filter based on keyword
var searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    var inputValue = searchBar.value.toLowerCase();
    window.location.href = `./index.html?search=${inputValue}`;
  }
});
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
