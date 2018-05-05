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
    var temp = Add_Block_div(workListBlock);
    Add_Block_List(workListBlock, temp);
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

function Add_Block_div(ListBlock_obj) {
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
  return create_block;
}

function Add_Block_List(ListBlock_obj, Block_div) {
  switch (ListBlock_obj.day) {
    case "Monday":
      Monday_list.push(ListBlock_obj);
      var Monday_area = document.getElementById("BlockArea_mon");
      Monday_area.appendChild(Block_div);
      break;
    case "Tuesday":
      Tuesday_list.push(ListBlock_obj);
      var Tuesday_area = document.getElementById("BlockArea_tue");
      Tuesday_area.appendChild(Block_div);
      break;
    case "Wednesday":
      Wednesday_list.push(ListBlock_obj);
      var Wednesday_area = document.getElementById("BlockArea_wed");
      Wednesday_area.appendChild(Block_div);
      break;
    case "Thursday":
      Thursday_list.push(ListBlock_obj);
      var Thursday_area = document.getElementById("BlockArea_thu");
      Thursday_area.appendChild(Block_div);
      break;
    case "Friday":
      Friday_list.push(ListBlock_obj);
      var Friday_area = document.getElementById("BlockArea_fri");
      Friday_area.appendChild(Block_div);
      break;
    default:
      alert("haha..");
      break;
    }
  }

  function Rewrite_Block_List(block_obj, rank, element_obj) { // 수정
    var array_to_last_block_day = array_to_day_list(element_obj.day);
    var array_to_new_block_day = array_to_day_list(block_obj.day);
    var new_block_div = Add_Block_div(block_obj);
    var last_Div_Find_array = Div_Find(element_obj);
    var last_block_Block_Find_array = Block_Find(last_Div_Find_array[0]);

    if(block_obj.day == element_obj.day) { // 수정한 날짜가 이전과 같으면
      var insert_Div_Find_array = Div_Find(array_to_new_block_day[rank]);
      if(rank == last_block_Block_Find_array[1]) { // 우선순위도 같으면
        array_to_last_block_day.splice(rank, 1, block_obj);
        last_Div_Find_array[2].parentNode.replaceChild(new_block_div, last_Div_Find_array[2]);
      }
      else if(rank < last_block_Block_Find_array[1]) { // 날짜는 같고, 우선순위가 이전보다 높다면
        array_to_last_block_day.splice(last_block_Block_Find_array[1], 1);
        array_to_last_block_day.splice(rank, 0, block_obj);
        last_Div_Find_array[2].parentNode.removeChild(last_Div_Find_array[2]);
        insert_Div_Find_array[2].parentNode.insertBefore(new_block_div, insert_Div_Find_array[2]);
      }
      else { // 날짜는 같고, 우선순위가 이전보다 낮다면
        array_to_last_block_day.splice(last_block_Block_Find_array[1], 1);
        array_to_last_block_day.splice(rank, 0, block_obj);
        last_Div_Find_array[2].parentNode.removeChild(last_Div_Find_array[2]);
        insertAfter(new_block_div, insert_Div_Find_array[2]);
      }
    }
    else { // 날짜를 변경했을 때
      if(rank == array_to_new_block_day.length) { // 다른 날짜의 맨 마지막으로 이동시키려면
        array_to_new_block_day.push(block_obj);
        array_to_last_block_day.splice(last_block_Block_Find_array[1], 1);
        last_Div_Find_array[2].parentNode.removeChild(last_Div_Find_array[2]);
        Add_Block_List(block_obj, new_block_div);
      }
      else {
        var insert_Div_Find_array = Div_Find(array_to_new_block_day[rank]);
        array_to_last_block_day.splice(last_block_Block_Find_array[1], 1);
        array_to_new_block_day.splice(rank, 0, block_obj);
        last_Div_Find_array[2].parentNode.removeChild(last_Div_Find_array[2]);
        insert_Div_Find_array[2].parentNode.insertBefore(new_block_div, insert_Div_Find_array[2]);
      }
    }
    Rewrite_Todo_Close();
  }

  function insertAfter(new_div, ref_div) {
    if (!!ref_div.nextSibling) {
      ref_div.parentNode.insertBefore(new_div, ref_div.nextSibling);
    } else {
      ref_div.parentNode.appendChild(new_div);
    }
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

  function Div_Find(obj) {
    var block_array = [obj.day, obj.title, obj.content];
    var block_array_id = block_array.join("_");
    var block_array_div = document.getElementById(block_array_id);
    var temp = [];
    temp = [block_array, block_array_id, block_array_div];
    return temp;
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
