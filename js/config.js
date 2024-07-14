const api_url =
  window.location.protocol !== "https:"
    ? "https://api-master.onrender.com"
    : "http://localhost:8000";

// For test on github host /cronus
const base_url =
  window.location.protocol === "https:"
    ? window.location.origin + '/cronus'
    : "http://localhost:80/cronus";

const colors = {
  secondary: "#6495ed",
  primary: "#9f34c0"
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
  { id: "0", label: "Engenharia" },
  { id: "1", label: "Matemática/Estatística" },
  { id: "2", label: "Administração & Gestão" },
  { id: "3", label: "Economia e finaças" },
  { id: "4", label: "Contabilidade e Auditoria" },
  { id: "5", label: "Direito" },
  { id: "6", label: "Saúde" },
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
