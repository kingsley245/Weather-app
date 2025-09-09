function toggleAnswer(card) {
  const answer = card.nextElementSibling;
  const allAnswers = document.querySelectorAll('.weather-card-togle_answer');
  const allIcons = document.querySelectorAll('.weather-card-pieses i');

  allAnswers.forEach((el, index) => {
    if (el !== answer) {
      el.classList.remove('show');
      allIcons[index].classList.remove('fa-minus');
      allIcons[index].classList.add('fa-plus');
    }
  });

  if (!answer.classList.contains('show')) {
    answer.classList.add('show');
    card.querySelector('i').classList.remove('fa-plus');
    card.querySelector('i').classList.add('fa-minus');
  } else {
    answer.classList.remove('show');
    card.querySelector('i').classList.remove('fa-minus');
    card.querySelector('i').classList.add('fa-plus');
  }
}

// Function to scroll to the top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.onscroll = function () {
  const scrollBtn = document.querySelector('.scroll-up-btn');
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollBtn.style.right = '30px';
  } else {
    scrollBtn.style.right = '-60px';
  }
};

// loading html
const links = [...document.querySelectorAll('.menu-list')];
const scriptMap = {
  today: 'today.js',
  Hourly: 'Hourly.js'
};
function loadPageContent(pageKey) {
  const file = `${pageKey}.html`;
  localStorage.setItem('activePage', pageKey);

  // update page content
  links.forEach((link) => link.classList.remove('active'));
  const targetlist = Array.from(links).find((li) => {
    const a = li.querySelector('a');
    return a && a.getAttribute('href') === `#${pageKey}`;
  });

  if (targetlist) targetlist.classList.add('active');

  fetch(file)
    .then((res) => {
      if (res.status != '200') throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
    .then((html) => {
      document.getElementById('main__Content-page-load').innerHTML = html;

      // loading corresponding script
      if (scriptMap[pageKey]) {
        loadScript(scriptMap[pageKey]);
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById(
        'main__Content-page-load'
      ).innerHTML = `<h1 style="color:red";}>Failed to loadPageContent$(file)</h1>`;
    });
}

links.forEach((li) => {
  li.addEventListener('click', function (e) {
    e.preventDefault();

    const a = li.querySelector('a');
    if (!a) return;
    const page = a.getAttribute('href').substring(1);
    loadPageContent.hash = page;
  });
});

window.addEventListener('hashchange', () => {
  const page = location.hash.replace('#', '') || 'today';
  loadPageContent(page);
});

window.addEventListener('DOMContentLoaded', () => {
  const page = location.hash.replace('#', '') || 'today';
  loadPageContent(page);
});

function loadScript(filepath) {
  const script = document.createElement('script');
  script.src = filepath;
  script.defer = true;
  document.body.appendChild(script);
}
