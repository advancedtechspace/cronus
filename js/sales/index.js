async function getSales() {
  let trows = "";

  const res = await fetch(api_url + "/cronus/sales/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  const thead = `
      <th>ID</th>
      <th>Data</th>
      <th>Valor total</th>
      <th>Acções</th>`;

  if (res.status === 200) {
    const d = await res.json();
    console.log(d);
    const data = d.filter(({ removed }) => !removed);
    for (sale of data) {
      const { created_at, _id } = sale;

      trows += `
          <tr>
            <td>${_id}</td>
            <td>
              ${new Date(created_at).toLocaleDateString()}
              ${new Date(created_at).toLocaleTimeString()}
            </td>
            <td></td>
            <td width='20%'>
            <a href="./factura.html?col=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-eye'></i></button></a>
              <button class="btn-circle btn-circle-delete btn-delete-staff" id="${_id}"><i class='la la-trash'></i></button>
            </td>
          </tr>
        `;
    }

    document.querySelector("tbody").innerHTML = trows;
    document.querySelector("thead").innerHTML = thead;

    document.querySelectorAll(".btn-delete-staff").forEach((btn) => {
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
            removeItem(id, "sales");
          }
        });
      });
    });
  }
}

getSales();

wakeupAPI()