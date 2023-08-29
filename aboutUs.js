var searchBtn = document.getElementById('searchBtn');
var searchBar = document.getElementById('searchBar');
var backToTopBtn = document.getElementById('backToTopButton');

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
