const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const tbody = document.getElementById('calendarBody');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// weather icons
const icons = [
  { cls: 'fa-solid fa-sun', name: 'Sunny' },
  { cls: 'fa-solid fa-cloud-sun', name: 'Partly Cloudy' },
  { cls: 'fa-solid fa-cloud-showers-heavy', name: 'Rain' },
  { cls: 'fa-solid fa-cloud-bolt', name: 'Thunderstorm' },
  { cls: 'fa-solid fa-cloud', name: 'Cloudy' }
];
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// populate selectors
months.forEach((m, i) => {
  const opt = document.createElement('option');
  opt.value = i;
  opt.text = m;
  monthSelect.appendChild(opt);
});
for (let y = 2020; y <= 2035; y++) {
  const opt = document.createElement('option');
  opt.value = y;
  opt.text = y;
  yearSelect.appendChild(opt);
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

monthSelect.value = currentMonth;
yearSelect.value = currentYear;

function renderCalendar(month, year) {
  tbody.innerHTML = '';
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    // 6 weeks
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if ((i === 0 && j < firstDay) || date > daysInMonth) {
        cell.innerHTML = '';
      } else {
        const icon = icons[randInt(0, icons.length - 1)];
        const hi = randInt(75, 88),
          lo = randInt(60, 74);
        cell.classList.add('day-cell');
        cell.innerHTML = `
            <div class="date">${date}</div>
            <div class="icon"><i class="${icon.cls}"></i></div>
            <div class="temps"><span class="high">${hi}°</span> / <span class="low">${lo}°</span></div>
          `;
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add('today');
        }
        date++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}

function prevMonth() {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  renderCalendar(currentMonth, currentYear);
}
function nextMonth() {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  renderCalendar(currentMonth, currentYear);
}

monthSelect.onchange = () => {
  currentMonth = parseInt(monthSelect.value);
  renderCalendar(currentMonth, currentYear);
};
yearSelect.onchange = () => {
  currentYear = parseInt(yearSelect.value);
  renderCalendar(currentMonth, currentYear);
};

renderCalendar(currentMonth, currentYear);
