const nav = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: "",
    icon: "chart-pie",
    show: true,
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
      // {
      //   id: 'dashboard-users',
      //   label: "Utilizadores",
      //   url: "#",
      //   icon: 'la-users'
      // },
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
        id: "staff-list",
        label: "Listagem",
        url: "#",
        icon: null,
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
    show: true,
    submenu: [
      {
        id: "clients-list",
        label: "Listagem",
        url: "#",
        icon: null,
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
    show: true,
    submenu: [
      {
        id: "asset-list",
        label: "Listagem",
        url: "#",
        icon: null,
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
    name: "Inventário e serviços",
    path: "pages/stock",
    icon: "archive",
    show: true,
    submenu: [
      {
        id: "stock-list",
        label: "Listagem",
        url: "#",
        icon: null,
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
    id: "sales",
    name: "Contabilidade",
    path: "pages/sales",
    icon: "dollar",
    show: true,
    submenu: [
      {
        id: "sales-dashboard",
        label: "Dashboard",
        url: "dashboard.html",
        icon: null,
      },
      {
        id: "sales-list",
        label: "Listagem de facturas",
        url: "#",
        icon: null,
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
    show: false,
    submenu: [
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
          style='background-color: ${color};color: ${active ? "#fff" : "auto"};'
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
        sm += `<li style='margin-bottom: 10px;'><a style='font-size: 14px;' href='${
          base_url + "/" + path + "/" + url
        }'><i class='la ${ic || "la-circle"}' style='margin-right: 5px;'></i>${label}</a></li>`;
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
  document.querySelector("#suggestions a").style.backgroundColor =
    colors.primary;
  document.querySelector("#suggestions a").style.color = "#fff";
}

document.querySelector("header").innerHTML = main_header;
document.querySelector("footer").innerHTML = main_footer;

document.getElementById("a-dashboard").addEventListener("click", () => {
  localStorage.removeItem("user");
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
    if ((e.target.className = "menu-container")) {
      e.target.style.display = "none";
    }
  });
}


const btnMenu = document.querySelector("#btn-menu")

btnMenu.addEventListener("click", () => {
  menuContainer.style.display = "block";
});
