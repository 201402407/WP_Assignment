window.onload = function() {
  document.getElementById("Close_button").onclick = function() {
    sendMessage("Close_button_request");
  }
  document.getElementById("Add_button").onclick = function() {
    Send_Item();
  }
}

function sendMessage(obj) {
  window.parent.postMessage(obj,"*");
}

function Send_Item() {
  var send_target = document.getElementById("Select_day_AddToDo");
  var obj = {};
  obj.day = send_target.options[send_target.selectedIndex].value;
  obj.title = document.getElementById("title_AddToDo").value;
  obj.content = document.getElementById("content_AddToDo").value;
  sendMessage(obj);
  alert(obj.content);
}
