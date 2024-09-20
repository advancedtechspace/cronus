let modulos = [];

const modulos_aux = localStorage.getItem("modulos");

if (modulos_aux) {
  modulos = modulos_aux.split(",");
}

const nav = [
  {
    id: "dashboard",
    name: "Admin",
    path: "",
    icon: "user-tie",
    show: !localStorage.getItem("assoc_user"),
    submenu: [
      {
        id: "dashboard-config",
        label: "Configurações",
        url: "pages/dashboard/config.html",
        icon: "la-tools",
      },
      // {
      //   id: 'dashboard-privacy',
      //   label: "Privacidade",
      //   url: "#",
      //   icon: ''
      // },
      {
        id: "dashboard-users",
        label: "Listagem de utilizadores",
        url: "pages/dashboard/users.html",
        icon: "la-list",
      },
      {
        id: "dashboard-new-user",
        label: "Novo utilizador",
        url: "pages/dashboard/new-user.html",
        icon: "la-plus",
      },
    ],
  },
  {
    id: "staff",
    name: "Colaboradores",
    path: "pages/staff",
    icon: "male",
    show: modulos?.includes("staff"),
    submenu: [
      {
        id: "staff-dashboard",
        label: "Dashboard",
        url: "dash.html",
        icon: "la-chart-pie",
      },
      {
        id: "staff-list",
        label: "Listagem",
        url: "#",
        icon: "la-list",
      },
      {
        id: "staff-new",
        label: "Cadastrar novo",
        url: "new.html",
        icon: "la la-plus",
      },
      {
        id: "staff-category",
        label: "Categorias",
        url: "#",
        icon: null,
      },
    ],
  },
  {
    id: "clients",
    name: "Consumidores",
    path: "pages/clients",
    icon: "male",
    show: modulos?.includes("clients") & false,
    submenu: [
      // {
      //   id: "clients-dashboard",
      //   label: "Dashboard",
      //   url: "#",
      //   icon: "la-chart-pie",
      // },
      {
        id: "clients-list",
        label: "Listagem",
        url: "#",
        icon: "la-list",
      },
      {
        id: "clients-new",
        label: "Cadastrar novo",
        url: "new.html",
        icon: "la-plus",
      },
      {
        id: "clients-category",
        label: "Categorias",
        url: "#",
        icon: null,
      },
    ],
  },
  {
    id: "asset",
    name: "Activos e passivos",
    path: "pages/asset",
    icon: "couch",
    show: modulos?.includes("asset"),
    submenu: [
      {
        id: "asset-dashboard",
        label: "Dashboard",
        url: "dash.html",
        icon: "la-chart-pie",
      },
      {
        id: "asset-list",
        label: "Listagem",
        url: "#",
        icon: "la-list",
      },
      {
        id: "asset-new",
        label: "Cadastrar novo",
        url: "new.html",
        icon: "la-plus",
      },
      {
        id: "asset-category",
        label: "Categorias",
        url: "#",
        icon: null,
      },
    ],
  },
  {
    id: "stock",
    name: "Stock e serviços",
    path: "pages/stock",
    icon: "archive",
    show: modulos?.includes("stock"),
    submenu: [
      {
        id: "asset-dashboard",
        label: "Dashboard",
        url: "dash.html",
        icon: "la-chart-pie",
      },
      {
        id: "stock-list",
        label: "Listagem",
        url: "#",
        icon: "la-list",
      },
      {
        id: "stock-new",
        label: "Cadastrar novo",
        url: "new.html",
        icon: "la-plus",
      },
      {
        id: "stock-category",
        label: "Categorias",
        url: "#",
        icon: null,
      },
    ],
  },
  {
    id: "alocation",
    name: "Alocações",
    path: "pages/alocation",
    icon: "circle",
    show: false,
    submenu: [
      {
        id: "alocation-dashboard",
        label: "Dashboard",
        url: "#",
        icon: "la-chart-pie",
      },
      {
        id: "alocation-list",
        label: "Listagem de entidades",
        url: "#",
        icon: "la-list",
      },
      {
        id: "alocation-new",
        label: "Cadastrar entidade",
        url: "new.html",
        icon: "la-plus",
      },
      {
        id: "alocation-new",
        label: "Alocar",
        url: "aloc.html",
        icon: "la-circle",
      },
      // {
      //   id: "alocation-category",
      //   label: "Categorias",
      //   url: "#",
      //   icon: null,
      // },
    ],
  },
  {
    id: "sales",
    name: "Contabilidade",
    path: "pages/sales",
    icon: "dollar",
    show: modulos?.includes("sales"),
    submenu: [
      {
        id: "sales-dashboard",
        label: "Dashboard",
        url: "dash.html",
        icon: "la-chart-pie",
      },
      {
        id: "sales-list",
        label: "Listagem de facturas",
        url: "#",
        icon: "la-list",
      },
      {
        id: "sales-new",
        label: "Nova venda",
        url: "new.html",
        icon: "la-plus",
      },
    ],
  },
  {
    id: "accounting",
    name: "Contabilidade",
    path: "pages/accounting",
    icon: "credit-card",
    show: false,
    submenu: [
      {
        id: "accounting-dashboard",
        label: "Dashboard",
        url: "#",
        icon: "la-chart-pie",
      },
      {
        id: "accounting-new",
        label: "Nova transação",
        url: "new.html",
        icon: "la-plus",
      },
    ],
  },
  {
    id: "credito",
    name: "Microcrédito",
    path: "pages/credito",
    icon: "hand-holding-usd",
    show: true,
    special: false,
    submenu: [
      {
        id: "credito-dashboard",
        label: "Listagem",
        url: "#",
        icon: "la-list",
      },
      {
        id: "credito-new",
        label: "Conceder crédito",
        url: "new.html",
        icon: "la-plus",
      },
    ],
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
    show: !false,
    special: false
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
  const { id, name, path, icon, show, submenu, special } = elt;
  const active = window.location.href.includes(id);
  if (show) {
    const color = active ? colors.primary : "auto;";
    let sm = "";
    if (submenu !== undefined) {
      for ({ label, url, icon: ic } of submenu) {
        sm += `<li><a href='${
          base_url + "/" + path + "/" + url
        }'><i class='la ${ic || "la-circle"}'></i>${label}</a></li>`;
      }
    }
    n += `
    <ul class='main-link'>
      <li>
        <a href='${base_url}/${path}' id='${id}'
          style='
            font-weight: ${active ? "bold" : "auto"};
            font-size: 14px;
            text-decoration-line: ${special ? "underline" : "none"} ;
          '
        >
          <i class='la la-${icon}'></i>
          <span>${name}</span><tiny><i class='la la-angle-down dropdown-icon'></i></tiny>
        </a>
      </li>
      <ul class='sub-menu' id='${id}' style='
        background: ${
          localStorage.getItem("theme-mode") === "dark" ? "#444" : "#fff"
        };
        border-color: ${
          localStorage.getItem("theme-mode") === "dark" ? "#444" : "#eee"
        };'
      >
        ${sm}
      </ul>
    </ul>`;
  }
}

document.getElementById("suggestions").innerHTML = n;

let links = "";

for (let elt of nav) {
  const { id, name, path, icon, show, submenu } = elt;
  const active = window.location.href.includes(id);
  if (show) {
    const color = active ? colors.primary : "auto;";
    let sm = "";
    if (submenu !== undefined) {
      for ({ label, url, icon: ic } of submenu) {
        sm += `<li style='margin-bottom: 10px;'><a style='font-size: 18px;' href='${
          base_url + "/" + path + "/" + url
        }'><i class='la ${
          ic || "la-circle"
        }' style='margin-right: 5px;'></i>${label}</a></li>`;
      }
    }

    links += `
      <div style='margin: 5px;'>
        <div style='background: #eee;padding: 10px;border-radius: 5px;color: ${colors.primary};'>
          <i class="la la-${icon}" style='margin-right: 10px;'></i>
          ${name}
        </div>
        <ul style='padding: 10px;'>
          ${sm}
        </ul>
      </div>

    `;
  }
}

document.querySelector(".menu").innerHTML = links;

if (window.location.href === base_url + "/") {
  document.querySelector("#suggestions a").style.fontWeight = "bold";
}

document.querySelector("header").innerHTML = main_header;
document.querySelector("footer").innerHTML = main_footer;

document.getElementById("a-dashboard").addEventListener("click", () => {
  localStorage.removeItem("user");
  if (localStorage.getItem("assoc_user")) {
    localStorage.removeItem("assoc_user");
    localStorage.removeItem("modulos");
  }
  window.location.href = base_url + "/login.html";
});

//
async function removeItem(id, item) {
  console.log(item, id);
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

document.querySelector(".logo").href = base_url;

const menuContainer = document.querySelector(".menu-container");

if (menuContainer) {
  menuContainer.addEventListener("click", (e) => {
    if (e.target.className === "menu-container") {
      e.target.style.display = "none";
    }
  });
}

const btnMenu = document.querySelector("#btn-menu");

btnMenu.addEventListener("click", () => {
  menuContainer.style.display = "block";
});

// Scroll Menu horizontal
const padding_inc = 150;
let left_padding = 0;
let right_padding = 0;
document.querySelector("#go-left").addEventListener("click", () => {
  right_padding += padding_inc;
  $("#suggestions").animate({ "padding-right": right_padding });
});

document.querySelector("#go-right").addEventListener("click", () => {
  left_padding += padding_inc;
  $("#suggestions").animate({ "padding-left": left_padding });
});
