(async function () {
  const res = await fetch(api_url + "/cronus/asset/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    const asset = data.filter(({ removed }) => !removed);
    let v = 0;

    for (a of asset) {
      v += parseFloat(a.valor) || 0;
    }
    document.getElementById("activo-total").style = `--from: ${(
      v -
      0.1 * v
    ).toFixed(2)}; --to: ${v}; --time: 2s`;
  }
})();
