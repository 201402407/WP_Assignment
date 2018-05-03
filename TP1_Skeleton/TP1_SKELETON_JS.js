var Monday_list = new Array();
var Tuesday_list = new Array();
var Wednesday_list = new Array();
var Thursday_list = new Array();
var Friday_list = new Array();
var day_list = [Monday_list, Tuesday_list, Wednesday_list, Thursday_list, Friday_list];

window.onload = function() {
  document.getElementById("Add_button").onclick = function() {
        document.getElementById("Add_ToDo_popup").style.display = "block";

        window.removeEventListener("message", messageHandlerRewrite, true);
        window.addEventListener("message", messageHandlerAdd, true);
            }
}

function sendRewriteMessage(obj) {
  document.getElementById("Rewrite_ToDo_popup").contentWindow.postMessage(obj,"*");
}

function messageHandlerAdd(e) {
  switch (e.data) {
    case "AddToDo_Close_button_request":
      Add_Todo_Close();
      break;
    default:
    var workListBlock = e.data;
      switch (workListBlock.day) {
        case "Monday":
        case "Tuesday":
        case "Wednesday":
        case "Thursday":
        case "Friday":
          Add_Block_List(workListBlock);
          break;
        default:
          alert("haha..");
          break;
      }
      Add_Todo_Close();
      break;
  }
}

function messageHandlerRewrite(e) {
  switch (e.data) {
    case "Rewrite_Close_button_request":
      Rewrite_Todo_Close();
      break;
    default:
    var receive_block = e.data[0];
    var receive_rank = e.data[1];
    var receive_lastelement = e.data[2];
    Rewrite_Block_List(receive_block, receive_rank, receive_lastelement);
  }
}

function Add_Todo_Close() {
  document.getElementById("Add_ToDo_popup").style.display = "none";
}
function Rewrite_Todo_Close() {
  document.getElementById("Rewrite_ToDo_popup").style.display = "none";
}

function Add_Block_List(ListBlock_obj) {
  var create_block = document.createElement("div");
  create_block.className = "BlockSetting";
  create_block.id = ListBlock_obj.day.concat("_", ListBlock_obj.title, "_", ListBlock_obj.content);

  var create_block_closeImage = document.createElement("img");
  create_block_closeImage.src = "img/delete.png";
  create_block_closeImage.className = "create_block_closeImage";
  create_block_closeImage.id = create_block.id;
  create_block.appendChild(create_block_closeImage);

  create_block_closeImage.onclick = function() {
    var parent = create_block_closeImage.parentNode;
    var parentId = parent.id.split("_");
    var Delete_Block = Block_Find(parentId);
    Delete_Block_List(Delete_Block);
    parent.parentNode.removeChild(parent);
  }

  create_block.onclick = function(event) {
    if(event.target != create_block_closeImage) {
    document.getElementById("Rewrite_ToDo_popup").style.display = "block";
    var myBlockId = create_block.id.split("_");
    var rewrite_send_block = Block_Find(myBlockId);
    sendRewriteMessage(rewrite_send_block);

    window.removeEventListener("message", messageHandlerAdd, true);
    window.addEventListener("message", messageHandlerRewrite, true);
    }
  }

  var create_block_titleNode = document.createElement("p");
  var create_block_title = document.createTextNode(ListBlock_obj.title);
  create_block_titleNode.appendChild(create_block_title);
  create_block.appendChild(create_block_titleNode);

  switch (ListBlock_obj.day) {
    case "Monday":
      Monday_list.push(ListBlock_obj);
      var Monday_area = document.getElementById("BlockArea_mon");
      Monday_area.appendChild(create_block);
      break;
    case "Tuesday":
      Tuesday_list.push(ListBlock_obj);
      var Tuesday_area = document.getElementById("BlockArea_tue");
      Tuesday_area.appendChild(create_block);
      break;
    case "Wednesday":
      Wednesday_list.push(ListBlock_obj);
      var Wednesday_area = document.getElementById("BlockArea_wed");
      Wednesday_area.appendChild(create_block);
      break;
    case "Thursday":
      Thursday_list.push(ListBlock_obj);
      var Thursday_area = document.getElementById("BlockArea_thu");
      Thursday_area.appendChild(create_block);
      break;
    case "Friday":
      Friday_list.push(ListBlock_obj);
      var Friday_area = document.getElementById("BlockArea_fri");
      Friday_area.appendChild(create_block);
      break;
    default:
      alert("haha..");
      break;
    }
  }

  function Rewrite_Block_List(block_obj, rank, element_obj) { // div id 변경 및 div 위치 변경.
    var last_block_array = [element_obj.day, element_obj.title, element_obj.content];
    var last_block_array_id = last_block_array.join("_");
    var last_block_array_div = document.getElementById(last_block_array_id);
    var last_element_array = Block_Find(last_block_array);
    if((rank == last_element_array[1]) && (block_obj.day == element_obj.day)) {
      array_to_day_list(element_obj.day).splice(rank, 1, block_obj);
      last_block_array_div.id = block_obj.day.concat("_", block_obj.title, "_", block_obj.content);
      last_block_array_div.childNodes[1].innerHTML = block_obj.title;
    }
    Rewrite_Todo_Close();
  }

  function array_to_day_list(day_string) {
    switch (day_string) {
      case "Monday":
        return Monday_list;
      case "Tuesday":
        return Tuesday_list;
      case "Wednesday":
        return Wednesday_list;
      case "Thursday":
        return Thursday_list;
      case "Friday":
        return Friday_list;
      default:
        alert("haha..");
        break;
    }
  }
  function Delete_Block_List(Block_array) {
    array_to_day_list(Block_array[0].day).splice(Block_array[1], 1);
}

  var Div_Find = function(Div_id_string) {

  }

  function Block_Find(Block_list_Array) {
    var temp = [];
    switch (Block_list_Array[0]) {
      case "Monday":
        for(var i = 0; i < Monday_list.length; i++) {
            if(Monday_list[i].title == Block_list_Array[1]) {
              if(Monday_list[i].content == Block_list_Array[2]) {
                temp = [Monday_list[i], i];
                break;
              }
            }
        }
        break;
      case "Tuesday":
      for(var i = 0; i < Tuesday_list.length; i++) {
          if(Tuesday_list[i].title == Block_list_Array[1]) {
            if(Tuesday_list[i].content == Block_list_Array[2]) {
              temp = [Tuesday_list[i], i];
              break;
            }
          }
      }
        break;
      case "Wednesday":
      for(var i = 0; i < Wednesday_list.length; i++) {
          if(Wednesday_list[i].title == Block_list_Array[1]) {
            if(Wednesday_list[i].content == Block_list_Array[2]) {
              temp = [Wednesday_list[i], i];
              break;
            }
          }
      }
        break;
      case "Thursday":
      for(var i = 0; i < Thursday_list.length; i++) {
          if(Thursday_list[i].title == Block_list_Array[1]) {
            if(Thursday_list[i].content == Block_list_Array[2]) {
              //Thursday_list.splice(i, 1);
              temp = [Thursday_list[i], i];
              break;
            }
          }
      }
        break;
      case "Friday":
      for(var i = 0; i < Friday_list.length; i++) {
          if(Friday_list[i].title == Block_list_Array[1]) {
            if(Friday_list[i].content == Block_list_Array[2]) {
              temp = [Friday_list[i], i];
              break;
            }
          }
      }
        break;
      default:
        alert("hahaha..");
        break;
    }
    return temp;
  }
