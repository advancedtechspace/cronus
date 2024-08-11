getStock();
async function getStock() {
  let trows = "";

  const res = await fetch(api_url + "/cronus/stock/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  const thead = `
    <th>Nome</th>
    <th>Valor unitario</th>
    <th>Quantidade</th>
    <th>Expira</th>
    <th>Acções</th>
  `;

  if (res.status === 200) {
    const data = (await res.json()).filter(
      ({ desc, removed }) => desc && !removed
    );

    console.log(data);
    for (stock of data) {
      const { desc, valor, quantidade, _id, expira } = stock;

      const oneDay = 1000 * 60 * 60 * 24;
      const exp = !expira
        ? ""
        : (new Date().getTime() - new Date(expira).getTime()) / oneDay;
      const ramainingDays = Math.round(Math.abs(exp));

      trows += `
          <tr>
            <td>${desc}</td>
            <td>${formatCurrency(valor)}</td>
            <td>${quantidade}</td>
            <td style='color:${ramainingDays < 32 ? 'red' : 'green'};'>${exp == 0 ? '' : `${expira} (${ramainingDays} dias)`}</td>
            <td width='20%'>
              <a href="edit.html?id=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-edit'></i></button></a>
              <button class="btn-circle btn-circle-delete btn-delete-stock" id="${_id}"><i class='la la-trash'></i></button>
            </td>
          </tr>
        `;
    }

    document.querySelector("tbody").innerHTML = trows;
    document.querySelector("thead").innerHTML = thead;

    document.querySelectorAll(".btn-delete-stock").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        Swal.fire({
          title: "Tem certeza?",
          text: "Esta acção não pode ser desfeita!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, apague!",
        }).then((result) => {
          if (result.isConfirmed) {
            const id = e.target.id;
            removeItem(id, "stock");
          }
        });
      });
    });
  }
}

wakeupAPI();
