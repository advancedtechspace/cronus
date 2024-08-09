async function getFactura() {
  const url = new URL(window.location.href);
  const factura_id = url.searchParams.get("col");

  document.getElementById("factura-id").innerText = factura_id;

  let trows = "";

  const res = await fetch(api_url + "/cronus/sales/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  const thead = `
      <th>Producto</th>
      <th>Quantidade</th>`;

  if (res.status === 200) {
    const d = await res.json();
    const data = d.filter(
      ({ removed, _id }) => !removed && _id === factura_id
    )[0];
    document.getElementById("factura-data").innerText = new Date(
      data.created_at
    ).toLocaleDateString();
    for (sale of data.cart) {
      const { product, quantidade, product_label } = sale;

      trows += `
          <tr>
            <td>${product_label}</td>
            <td>${quantidade}</td>
          </tr>
        `;
    }

    document.querySelector("tbody").innerHTML = trows;
    document.querySelector("thead").innerHTML = thead;

    const bi = d.find(({ _id }) => _id === factura_id).bi;

    document.getElementById("bi").innerText = bi;
  }
}

getFactura();
