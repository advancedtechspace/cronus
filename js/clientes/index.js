const inpSearch = document.querySelector(".inp-search");

async function getClient() {
  let trows = "";

  const res = await fetch(api_url + "/cronus/client/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  const thead = `
    <th>Nome</th>
    <th>Telefone</th>
    <th>Morada</th>
    <th>Acções</th>`;

  if (res.status === 200) {
    const d = await res.json();
    const data = d.filter(({ removed }) => !removed);
    for (cliente of data) {
      const { firstName, morada, tel, _id } = cliente;

      trows += `
        <tr>
          <td>${firstName}</td>
          <td>${tel}</td>
          <td>${morada || ""}</td>
          <td width='20%'>
            <a href="./edit.html?col=${_id}"><button class="btn-circle btn-circle-edit" id="client-edit-0"><i class='la la-edit'></i></button></a>
            <button class="btn-circle btn-circle-delete btn-delete-client" id="${_id}"><i class='la la-trash'></i></button>
          </td>
        </tr>
      `;
    }

    document.querySelector("tbody").innerHTML = trows;
    document.querySelector("thead").innerHTML = thead;

    inpSearch.addEventListener("keyup", (e) =>
      searchClient(e.target.value, data)
    );

    document.querySelectorAll(".btn-delete-client").forEach((btn) => {
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
            removeItem(id, "client");
          }
        });
      });
    });
  }
}

getClient();

function searchClient(value, data) {
  let trows = "";

  const thead = `
    <th>Nome</th>
    <th>Telefone</th>
    <th>Morada</th>
    <th>Acções</th>`;

  const d = data.filter(
    ({ firstName, surname }) =>
      firstName.toLowerCase().includes(value.toLowerCase()) ||
      surname.toLowerCase().includes(value.toLowerCase())
  );

  for (cliente of d) {
    const { firstName, morada, tel, _id } = cliente;

    trows += `
      <tr>
        <td>${firstName}</td>
        <td>${tel}</td>
        <td>${morada || ""}</td>
        <td width='20%'>
          <a href="./edit.html?col=${_id}"><button class="btn-circle btn-circle-edit" id="client-edit-0"><i class='la la-edit'></i></button></a>
          <button class="btn-circle btn-circle-delete btn-delete-client" id="${_id}"><i class='la la-trash'></i></button>
        </td>
      </tr>
    `;
  }

  document.querySelector("tbody").innerHTML = trows;
  document.querySelector("thead").innerHTML = thead;
}

wakeupAPI();
