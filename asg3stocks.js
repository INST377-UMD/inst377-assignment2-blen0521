
const API_KEY = 'csp4WkAvNsGR7BK3Nui4ezhojbfWv1Xn';

async function fetchStockData() {
  const ticker = document.getElementById('ticker').value.toUpperCase();
  const days = document.getElementById('days').value;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - parseInt(days));

  const format = date => date.toISOString().split('T')[0];
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${format(startDate)}/${format(endDate)}?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
  const prices = data.results.map(d => d.c);

  new Chart(document.getElementById('stockChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `${ticker} Closing Prices`,
        data: prices,
        fill: false,
        borderWidth: 2
      }]
    }
  });
}

async function loadRedditStocks() {
  const res = await fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03');
  const data = await res.json();
  const top5 = data.slice(0, 5);
  const tbody = document.querySelector('#redditTable tbody');

  top5.forEach(stock => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
      <td>${stock.no_of_comments}</td>
      <td>${stock.sentiment} ${stock.sentiment === 'Bullish' ? '🐂' : '🐻'}</td>
    `;
    tbody.appendChild(row);
  });
}

loadRedditStocks();


if (annyang) {
  annyang.addCommands({
    'lookup *stock': (stock) => {
      document.getElementById('ticker').value = stock.toUpperCase();
      document.getElementById('days').value = "30";
      fetchStockData();
    }
  });
}
