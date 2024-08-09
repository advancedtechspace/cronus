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
};