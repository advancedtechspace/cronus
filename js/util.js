let api_on = false;

async function wakeupAPI() {
  let awake = false;

  while (!awake) {
    try {
      console.log("Waking up the API...");
      const res = await fetch(api_url);
      if (res.status === 200) {
        awake = true;
        console.log('Awaken: ' + awake)
        document.getElementById("loader").style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  }
}
