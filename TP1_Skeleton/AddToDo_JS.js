window.onload = function() {
  document.getElementById("Close_button").onclick = function() {
    sendMessage("Close_button_request");
  }
}

function sendMessage(obj) {
  window.parent.postMessage(obj,"*");
}

function AddToDo_Item() {
  var target = document.getElementById("Select_day_AddToDo");
  var obj = {
      var day = target.options[target.selectedIndex].value;
      var title = document.getElementById("title_AddToDo").value;
      var content = document.getElementById("content_AddToDo").value;
  }
}
