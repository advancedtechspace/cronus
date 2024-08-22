(async function () {
  const res = await fetch(api_url + "/cronus/stock/total-stock-servicos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    const formatterCurrency = new Intl.NumberFormat("pt-MZ", {
      style: "decimal",
      currency: "MZN",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const v = data.total;

    document.getElementById("activo-total").style = `--from: ${(
      v -
      0.1 * v
    ).toFixed(2)}; --to: ${v}; --time: 1s`;

    setTimeout(() => {
      document.getElementById("activo-total").style = null;
      document.getElementById("activo-total").innerText = formatterCurrency.format(v);
    }, 1700);
  }
})();


getUser()

async function getUser() {
  const res = await fetch(api_url + "/user/" + localStorage.getItem('user'), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(res.status === 200) {
    const user = await res.json()
    document.querySelector('.company-name p').innerText = user.name || "";
  }
}
