window.onload = function() {
  document.getElementById("Add_button").onclick = function() {
        document.getElementById("Add_ToDo_popup").style.display = "block";

        window.addEventListener("message", messageHandler, true);
      }
}

function messageHandler(e) {
  switch (e.data) {
    case "Close_button_request":
      Add_Todo_Close();
      break;
    default:

  }
}

function Add_Todo_Close() {
  document.getElementById("Add_ToDo_popup").style.display = "none";
}
