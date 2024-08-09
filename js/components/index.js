const main_header = `
    <div id="header-left">
        <a href="#" class="logo">
        <img src="${base_url}/assets/logo.svg" width="30" height="30" />
        <h1>CRONUS</h1>
        </a>
    </div>

    <div id="header-right">
        <a href="#" id="a-notifications" onclick='toggleNottifications();'>
            <i class="la la-bell la-lg"></i>
            <span></span>
        </a>
        <a id="a-dashboard" href="#">
            <img width="20" height="20" src="${base_url}/assets/user.svg" alt="user" />
        </a>

        <div id="notifications">
            <div class='notification-header'>
                <p>Notificações</p>
            </div>
            <div class='notification-body'>
                <div class='notification'>
                    <p>Seja bem vindo ao CRONUS</p>
                    <div class='action-buttons'>
                        <button>Marcar como lida</button>
                    </div>
                </div>
            </div>
            
        <div>
    </div>`;

const main_footer = `
    <p>CRONUS &copy; 2024</p>
    <p>Powered by <a href='https://advancedtechspace.com' target='_blank'>AdvancedTechSpace (ATS)</a></p>
`;

let shown = false;

function toggleNottifications() {
  const notifications = document.querySelector("#notifications");

  if (shown) {
    notifications.style.display = "none";
  } else {
    notifications.style.display = "block";
  }
  shown = !shown;
}
