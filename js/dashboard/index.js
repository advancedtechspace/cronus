const inpSearch = document.querySelector(".inp-search");

// const perPage = 2;
let lInf = 0;
let lSup = perPage;
let page = 1;

let trows = "";

const thead = `
<th>Nome</th>
<th>Acções</th>
`;

getAsset();
async function getAsset() {
  const res = await fetch(api_url + "/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
  });

  if (res.status === 200) {
    const data = (await res.json()).filter((e) => !!e.assoc_user);
    console.log(data);

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
      searchAsset(e.target.value, data)
    );

    document.querySelectorAll(".btn-delete-asset").forEach((btn) => {
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
            removeItem(id, "asset");
          }
        });
      });
    });
  }
}

function searchAsset(value, data) {
  let trows = "";

  const d = data.filter(({ desc }) =>
    desc.toLowerCase().includes(value.toLowerCase())
  );

  for (asset of d) {
    const { desc, tipo, valor, _id } = asset;

    trows += `
        <tr>
          <td><a href='./edit.html?id=${_id}' style='font-size: 14px;'>${desc}</a></td>
          <td style='color: ${tipo == "1" ? "coral" : "green"};'>${
      tipo == "1" ? "Passivo" : "Activo"
    }</td>
          <td>${formatCurrency(valor)}</td>
          <td width='20%'>
            <a href="edit.html?id=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-edit'></i></button></a>
            <button class="btn-circle btn-circle-delete btn-delete-asset" id="${_id}"><i class='la la-trash'></i></button>
          </td>
        </tr>
      `;
  }

  document.querySelector("tbody").innerHTML = trows;
  document.querySelector("thead").innerHTML = thead;

  document.querySelectorAll(".btn-delete-asset").forEach((btn) => {
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
          removeItem(id, "asset");
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
    const user = data[i];
    if (!user) continue;

    const { nome, tipo, valor, _id } = user;

    trows += `
        <tr>
          <td><a href='./edit.html?id=${_id}' style='font-size: 14px;'>${nome || ''}</a></td>
          <td width='20%'>
            <a href="edit-user.html?id=${_id}"><button class="btn-circle btn-circle-edit" id="staff-edit-0"><i class='la la-edit'></i></button></a>
            <button class="btn-circle btn-circle-delete btn-delete-asset" id="${_id}"><i class='la la-trash'></i></button>
          </td>
        </tr>
      `;
  }

  document.querySelector("tbody").innerHTML = trows;
  document.querySelector("thead").innerHTML = thead;

  if (data.length > perPage) {
    document.querySelector(".pagination").innerHTML = `
      <button id='btn-left'><i class='la la-angle-left'></i></button>
        <p>Página <span class='current-page'>${page}</span> de ${Math.round(
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
