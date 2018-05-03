window.onload = function() {
  document.getElementById("Close_button").onclick = function() {
    sendMessage("Rewrite_Close_button_request");
  }
  window.addEventListener("message", messageHandler, true);
}

function sendMessage(obj) {
  window.parent.postMessage(obj,"*");
}

function messageHandler(e) {
  var obj = e.data;
  View_Item(obj);
  document.getElementById("Rewrite_button").onclick = function() {
    var sendobj = [Send_RewriteItem()[0], Send_RewriteItem()[1], obj[0]];
    sendMessage(sendobj);
  }
}

function View_Item(obj) {
  var obj_rank = obj[1] + 1;
  for(var i = 0; i < document.getElementById("Select_day_RewriteToDo").options.length; i++) {
    if(document.getElementById("Select_day_RewriteToDo").options[i].value === obj[0].day) {
      document.getElementById("Select_day_RewriteToDo").options[i].selected = "selected";
      break;
    }
  }

  document.getElementById("rank_RewriteToDo").value = obj_rank;
  document.getElementById("title_RewriteToDo").value = obj[0].title;
  document.getElementById("content_RewriteToDo").value = obj[0].content;
}

function Send_RewriteItem() {
  var send_target = document.getElementById("Select_day_RewriteToDo");
  var obj = {};
  obj.day = send_target.options[send_target.selectedIndex].value;
  obj.title = document.getElementById("title_RewriteToDo").value;
  obj.content = document.getElementById("content_RewriteToDo").value;
  var rank = document.getElementById("rank_RewriteToDo").value;
  rank = rank - 1;
  var rewriteItem = [obj, rank];
  return rewriteItem;
}
