var searchBtn = document.getElementById('searchBtn');
var searchBar = document.getElementById('searchBar');
var backToTopBtn = document.getElementById('backToTopButton');

function validateForm(event) {
  event.preventDefault();

  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('messageError').textContent = '';

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;
  var nameRegex = /^[A-Za-z]{3,}$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!nameRegex.test(name)) {
    document.getElementById('nameError').textContent = 'Name must be at least 3 characters long';
    return;
  }
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').style.color = 'red';
    document.getElementById('emailError').textContent = 'Invalid email format';
    return;
  }
  var toast = document.getElementById('snackbar');

  toast.innerHTML = `Form submitted successfully!`;

  toast.className = 'show';

  setTimeout(function () {
    toast.className = toast.className.replace('show', '');
  }, 3000);
}
searchBtn.addEventListener('click', () => {
  console.log('hello');
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
searchBar.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    var inputValue = searchBar.value.toLowerCase();
    window.location.href = `./index.html?search=${inputValue}`;
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
