async function getCredito() {
  let trows = "";

  const res = await fetch(api_url + "/cronus/credito/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  const thead = `
      <th>Nome</th>
      <th>Bairro</th>
      <th>Contacto</th>
      <th>Data</th>
      <th>Limite</th>
      <th>Valor a pagar</th>
      <th>Acções</th>`;

  if (res.status === 200) {
    const d = await res.json();
    const data = d.filter(({ removed }) => !removed);
    for (credito of data) {
      const {
        firstName,
        bairro,
        valor,
        tel,
        dataEmprestimo,
        dataLimite,
        taxaJuro,
        _id,
      } = credito;

      const days =
        (new Date() - new Date(dataEmprestimo)) / (1000 * 60 * 60 * 24);

      trows += `
          <tr>
            <td>${firstName}</td>
            <td>${bairro}</td>
            <td>${tel}</td>
            <td>${dataEmprestimo}</td>
            <td>${dataLimite}</td>
            <td>${
              parseFloat(valor) +
              (parseFloat(taxaJuro) / 100) * parseFloat(valor)
            }</td>
            <td width='20%'>
              <a href="./edit.html?col=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-edit'></i></button></a>
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
            removeItem(id, "credito");
          }
        });
      });
    });
  }
}

getCredito();

wakeupAPI()