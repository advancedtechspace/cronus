const nav = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: "",
    icon: "chart-pie",
    show: true,
    submenu: [
      {
        label: "Configurações",
        url: "",
      },
    ],
  },
  {
    id: "staff",
    name: "Colaboradores",
    path: "pages/staff",
    icon: "male",
    show: true,
    submenu: [
      {
        label: "Listagem",
        url: "",
        icon: null
      },
    ],
  },
  {
    id: "asset",
    name: "Activos",
    path: "pages/asset",
    icon: "couch",
    show: true,
  },

  {
    id: "stock",
    name: "Stock",
    path: "pages/stock",
    icon: "archive",
    show: true,
  },
  {
    id: "sales",
    name: "Vendas",
    path: "pages/sales",
    icon: "store",
    show: true,
  },
  {
    id: "accounting",
    name: "Contabilidade",
    path: "pages/accounting",
    icon: "credit-card",
    show: false,
  },
  {
    id: "credito",
    name: "Microcédito",
    path: "pages/credito",
    icon: "coins",
    show: true,
  },
  {
    id: "ensurance",
    name: "Seguros",
    path: "pages/ensurance",
    icon: "shield",
    show: false,
  },
  {
    id: "hotel",
    name: "Hotel",
    path: "pages/hotel",
    icon: "hotel",
    show: false,
  },
  {
    id: "transport",
    name: "Transporte",
    path: "pages/transport",
    icon: "bus",
    show: false,
  },
  
];

let n = "";

for (let elt of nav) {
  const { id, name, path, icon, show, submenu } = elt;
  const active = window.location.href.includes(id);
  if (show) {
    const color = active ? colors.primary : "auto;";
    n += `
    <a href='${base_url}/${path}' id='${id}'
      style='background-color: ${color};color: ${active ? "#fff" : "auto"};'
    >
      <i class='la la-${icon}'></i>
      <span>${name}</span>
      <!--<div class='sub-menu' id='${id}'>
        ${submenu?.map(({ label, url }) => `<a>${label}</a>`)}
      </div>-->
    </a>`;
  }
}

document.getElementById("suggestions").innerHTML = n;

// document.querySelectorAll("#suggestions a").forEach((link) => {
//   link.addEventListener("mouseover", (e) => {
//     const id = e.target.id;
//     if (id) document.querySelector(`a#${id} .sub-menu`).style.display = "block";
//   });
// });

// document.querySelectorAll("#suggestions a").forEach((link) => {
//   link.addEventListener("mouseout", (e) => {
//     const id = e.target.id;
//     if (id) document.querySelector(`a#${id} .sub-menu`).style.display = "none";
//   });
// });
if (window.location.href === base_url + "/") {
  document.querySelector("#suggestions a").style.backgroundColor =
    colors.primary;
  document.querySelector("#suggestions a").style.color = "#fff";
}

document.getElementById("a-dashboard").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = base_url + "/login.html";
});

//
async function removeItem(id, item) {
  const res = await fetch(api_url + "/cronus/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      user: localStorage.getItem("user"),
    },
    body: JSON.stringify({ id, item }),
  });

  if (res.status === 200) {
    const data = await res.json();
    Swal.fire({
      title: "Removido",
      text: `O item foi apagado.`,
      icon: "success",
    }).then(() => {
      window.location.reload();
    });
  }
}

document.querySelector('.logo').href = base_url;