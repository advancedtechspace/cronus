const inpSearch = document.querySelector(".inp-search");

// const perPage = 1;
let lInf = 0;
let lSup = perPage;
let page = 1;

let trows = "";

const thead = `
<th>Nome</th>
<th>Area</th>
<!--<th>Nivel</th>-->
<th>Telefone</th>
<th style="width: 30%;">Acções</th>`;

async function getStaff() {
  let trows = "";

  const res = await fetch(api_url + "/cronus/staff/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  if (res.status === 200) {
    const d = await res.json();
    const data = d.filter(({ removed }) => !removed);

    showTable(data, lInf, lSup);

    if (data.length > perPage) {
      document.querySelector(".pagination").innerHTML = `
            <button id='btn-left'><i class='la la-angle-left'></i></button>
              <p>Página <span class='current-page'>${page}</span> de ${Math.ceil(
        data.length / perPage
      )}</p>
            <button id='btn-right'><i class='la la-angle-right'></i></button>
        `;

      document.querySelector("#btn-left").onclick = () =>
        paginate(data, "left");
      document.querySelector("#btn-right").onclick = () =>
        paginate(data, "right");
    }

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
  
  const d = data.filter(
    ({ firstName, surname }) =>
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
        <td>${tel}</td>
        <td width='20%'>
        <a href="./show.html?col=${_id}"><button class="btn-circle btn-circle-show" id="staff-show-0"><i class='la la-eye'></i></button></a>
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
          removeItem(id, "staff");
        }
      });
    });
  });
}

function paginate(data, dir) {
  if (dir === "right") {
    if (page === Math.ceil(data.length / perPage)) {
      return;
    }
  } else {
    if (page - 1 === 0) {
      return;
    }
  }

  lInf = dir === "right" ? lInf + perPage : lInf - perPage;
  lSup = dir === "right" ? lInf + perPage : lSup - perPage;
  page = dir === "right" ? page + 1 : page - 1;

  document.querySelector(".current-page").innerText = page;

  showTable(data, lInf, lSup);
}

const showTable = (data, limInf, limSup) => {
  trows = "";
  for (let i = limInf; i < limSup; i++) {
    const colaborador = data[i];
    if (!colaborador) continue;

    const { firstName, categoria, morada, tel, nivel, areaFormacao, _id } =
      colaborador;

    trows += `
        <tr>
          <td>${firstName}</td>
          <td>${
            areaFormacao && areas.find(({ id }) => id === areaFormacao)?.label
          }</td>
          <!--<td>${grade_levels.find(({ id }) => id === nivel)?.label}</td>-->
          <td>${tel}</td>
          <td width='30%'>
            <a href="./show.html?col=${_id}"><button class="btn-circle btn-circle-show" id="staff-show-0"><i class='la la-eye'></i></button></a>
            <a href="./edit.html?col=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-edit'></i></button></a>
            <button class="btn-circle btn-circle-delete btn-delete-staff" id="${_id}"><i class='la la-trash'></i></button>
          </td>
        </tr>
      `;
  }

  document.querySelector("tbody").innerHTML = trows;
  document.querySelector("thead").innerHTML = thead;

  if (data.length > perPage) {
    document.querySelector(".pagination").innerHTML = `
        <button id='btn-left'><i class='la la-angle-left'></i></button>
          <p>Página <span class='current-page'>${page}</span> de ${Math.ceil(
      data.length / perPage
    )}</p>
        <button id='btn-right'><i class='la la-angle-right'></i></button>
    `;

    document.querySelector("#btn-left").onclick = () => paginate(data, "left");
    document.querySelector("#btn-right").onclick = () =>
      paginate(data, "right");
  }
};

wakeupAPI();
