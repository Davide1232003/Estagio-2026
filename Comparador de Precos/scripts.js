const searchForm = document.querySelector(".search-form");
const productList = document.querySelector(".product-list");
const priceChart = document.querySelector(".price-chart");

let myChart = "";

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Captura o valor do primeiro input do formulário
  const inputValue = event.target[0].value;

  const response = await fetch(
    `https://dummyjson.com/products/search?q=${inputValue}`,
  );

  const data = await response.json();

  displayItems(data.products);
  updatePriceChart(data.products);
});

function displayItems(products) {
  productList.innerHTML = products
    .map((product) => {
      const precoEmEuro = product.price * 0.92;

      return `
      <div class="product-card">
          <img src="${product.thumbnail}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>Marca: ${product.brand}</p>
          <p class="product-price">Preço: ${precoEmEuro.toLocaleString(
            "pt-PT",
            {
              style: "currency",
              currency: "EUR",
            },
          )}</p>
          <p>Avaliação: ${product.rating} ★</p>
      </div>
    `;
    })
    .join("");
}

function updatePriceChart(products) {
  const ctx = priceChart.getContext("2d");

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: products.map((product) => product.title.substring(0, 20) + "..."),
      datasets: [
        {
          label: "Preço (€)",
          data: products.map((product) => product.price * 0.92),
          backgroundColor: "rgba(46, 204, 113, 0.6)",
          borderColor: "rgba(46, 204, 113, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Comparação de Preços (EUR)",
          font: {
            size: 18,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value.toLocaleString("pt-PT", {
                style: "currency",
                currency: "EUR",
              });
            },
          },
        },
      },
    },
  });
}
