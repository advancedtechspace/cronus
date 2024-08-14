const api_url =
  window.location.protocol === "https:"
    ? "https://api-production-dbdb.up.railway.app"
    : "http://localhost:8000";

const base_url =
  window.location.protocol === "https:"
    ? window.location.origin
    : "http://localhost/cronus";

const colors = {
  primary: "#9f34c0",
  secondary: "#6495ed",
};

const perPage = 5;

const grade_levels = [
  { id: "0", label: "Basico" },
  { id: "1", label: "Medio" },
  { id: "2", label: "Bacharel" },
  { id: "3", label: "Licenciado" },
  { id: "4", label: "Mestre" },
  { id: "5", label: "PhD" },
];

const areas = [
  { id: "eng", label: "Engenharia" },
  { id: "mat", label: "Matemática & Estatística" },
  { id: "adm", label: "Administração & Gestão" },
  { id: "fin", label: "Economia e finaças" },
  { id: "cont", label: "Contabilidade e Auditoria" },
  { id: "direito", label: "Direito" },
  { id: "saude", label: "Saúde" },
  { id: "-1", label: "Outro" },
];

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function formatCurrency(val) {
  const formatterCurrency = new Intl.NumberFormat("pt-MZ", {
    style: "decimal",
    currency: "MZN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatterCurrency.format(val);
}

theme();

function theme() {
  const themeMode = localStorage.getItem("theme-mode");
  
  if(!themeMode) {
    localStorage.setItem('theme-mode', 'light');
  }

  const theme_config = {
    headerColor: themeMode === "light" ? "#fff" : "#444",
    headerShadow: themeMode === 'light' ? '0 0 1px 1px #f6f6f6' : '0 0 1px 1px #333',
    navColor: themeMode === "light" ? "#fff" : "#444",
    headerBorder: themeMode === "light" ? "1px solid #eee" : "1px solid #555",
    bodyColor: themeMode === "light" ? "#fcfcfc" : "#555",
    footerColor: themeMode === "light" ? "#fafafa" : "#575757",
    mainBorder: themeMode === "light" ? "1px solid #eee" : "1px solid #777",
  };

  document.querySelector("header").style.backgroundColor = theme_config.headerColor;
  document.querySelector("header").style.borderBottom = theme_config.headerBorder;
  document.querySelector("header").style.boxShadow = theme_config.headerShadow;
  document.querySelector("body").style.backgroundColor = theme_config.bodyColor;
  document.querySelector("footer").style.backgroundColor = theme_config.footerColor;
  document.querySelector("#suggestions").style.backgroundColor = theme_config.navColor;

  // Card
  document.querySelector(".main-body").style.border = theme_config.mainBorder
  document.querySelector(".main-body").style.borderTop = 'none';
  document.querySelector(".main-body").style.borderBottom = 'none';
  document.querySelector(".main-header").style.border = theme_config.mainBorder
  document.querySelector(".main-footer").style.border = theme_config.mainBorder
  document.querySelector(".card-container").style.border = theme_config.mainBorder

  document.querySelector(".inp-search").style.border = theme_config.mainBorder

}
