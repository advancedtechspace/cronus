const inpSearch = document.querySelector(".inp-search");

async function getStaff() {
  let trows = "";

  const res = await fetch(api_url + "/cronus/staff/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  const thead = `
    <th>Nome</th>
    <th>Area</th>
    <th>Nivel</th>
    <th>Telefone</th>
    <th>Morada</th>
    <th>Acções</th>`;

  if (res.status === 200) {
    const d = await res.json();
    const data = d.filter(({ removed }) => !removed);
    for (colaborador of data) {
      const { firstName, categoria, morada, tel, nivel, areaFormacao, _id } =
        colaborador;

      trows += `
        <tr>
          <td>${firstName}</td>
          <td>${
            areaFormacao && areas.find(({ id }) => id === areaFormacao)?.label
          }</td>
          <td>${grade_levels.find(({ id }) => id === nivel)?.label}</td>
          <td>${tel}</td>
          <td>${morada || ""}</td>
          <td width='20%'>
            <a href="./edit.html?col=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-edit'></i></button></a>
            <button class="btn-circle btn-circle-delete btn-delete-staff" id="${_id}"><i class='la la-trash'></i></button>
          </td>
        </tr>
      `;
    }

    document.querySelector("tbody").innerHTML = trows;
    document.querySelector("thead").innerHTML = thead;

    inpSearch.addEventListener("keyup", (e) =>
      searchStaff(e.target.value, data)
    );

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
            removeItem(id, "staff");
          }
        });
      });
    });
  }
}

getStaff();

function searchStaff(value, data) {
  let trows = "";

  const thead = `
    <th>Nome</th>
    <th>Area</th>
    <th>Nivel</th>
    <th>Telefone</th>
    <th>Morada</th>
    <th>Acções</th>`;

  const d = data.filter(({ firstName, surname }) =>
    firstName.toLowerCase().includes(value.toLowerCase()) ||
    surname.toLowerCase().includes(value.toLowerCase())
  );

  for (colaborador of d) {
    const { firstName, categoria, morada, tel, nivel, areaFormacao, _id } =
      colaborador;

    trows += `
      <tr>
        <td>${firstName}</td>
        <td>${
          areaFormacao && areas.find(({ id }) => id === areaFormacao)?.label
        }</td>
        <td>${grade_levels.find(({ id }) => id === nivel)?.label}</td>
        <td>${tel}</td>
        <td>${morada || ""}</td>
        <td width='20%'>
          <a href="./edit.html?col=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-edit'></i></button></a>
          <button class="btn-circle btn-circle-delete btn-delete-staff" id="${_id}"><i class='la la-trash'></i></button>
        </td>
      </tr>
    `;
  }

  document.querySelector("tbody").innerHTML = trows;
  document.querySelector("thead").innerHTML = thead;
}

wakeupAPI()