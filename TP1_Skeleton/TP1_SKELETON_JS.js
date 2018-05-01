var Monday_list = new Array();
var Tuesday_list = new Array();
var Wednesday_list = new Array();
var Thursday_list = new Array();
var Friday_list = new Array();
var day_list = [Monday_list, Tuesday_list, Wednesday_list, Thursday_list, Friday_list];

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
  //  if(typeof(e.data)!='string')
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

function Add_Todo_Close() {
  document.getElementById("Add_ToDo_popup").style.display = "none";
}

function Add_Block_List(ListBlock) {
  var create_block = document.createElement("div");
  create_block.className = "BlockSetting";
  create_block.id = ListBlock.day.concat("_", ListBlock.title, "_", ListBlock.content);

  var create_block_closeImage = document.createElement("img");
  create_block_closeImage.src = "img/delete.png";
  create_block_closeImage.className = "create_block_closeImage";
  create_block_closeImage.id = create_block.id;
  create_block.appendChild(create_block_closeImage);

  create_block_closeImage.onclick = function() {
    var parent = create_block_closeImage.parentNode;
    var parentId = parent.id.split("_");
    Block_Close(parentId);
    parent.parentNode.removeChild(parent);
  }

  var create_block_titleNode = document.createElement("p");
  var create_block_title = document.createTextNode(ListBlock.title);
  create_block_titleNode.appendChild(create_block_title);
  create_block.appendChild(create_block_titleNode);

  switch (ListBlock.day) {
    case "Monday":
      Monday_list.push(ListBlock);
      var Monday_area = document.getElementById("BlockArea_mon");
      Monday_area.appendChild(create_block);
      break;
    case "Tuesday":
      Tuesday_list.push(ListBlock);
      var Tuesday_area = document.getElementById("BlockArea_tue");
      Tuesday_area.appendChild(create_block);
      break;
    case "Wednesday":
      Wednesday_list.push(ListBlock);
      var Wednesday_area = document.getElementById("BlockArea_wed");
      Wednesday_area.appendChild(create_block);
      break;
    case "Thursday":
      Thursday_list.push(ListBlock);
      var Thursday_area = document.getElementById("BlockArea_thu");
      Thursday_area.appendChild(create_block);
      break;
    case "Friday":
      Friday_list.push(ListBlock);
      var Friday_area = document.getElementById("BlockArea_fri");
      Friday_area.appendChild(create_block);
      break;
    default:
      alert("haha..");
      break;
    }
  }

  function Delete_Block_List(Block) {
    switch (Block.day) {
      case expression:

        break;
      default:

    }
  }

  function Block_Close(Block_list) {
    switch (Block_list[0]) {
      case "Monday":
        for(var i = 0; i < Monday_list.length; i++) {
            if(Monday_list[i].title == Block_list[1]) {
              if(Monday_list[i].content == Block_list[2]) {
                Monday_list.splice(i, 1);
              }
            }
        }
        break;
      case "Tuesday":
      for(var i = 0; i < Tuesday_list.length; i++) {
          if(Tuesday_list[i].title == Block_list[1]) {
            if(Tuesday_list[i].content == Block_list[2]) {
              Tuesday_list.splice(i, 1);
            }
          }
      }
        break;
      case "Wednesday":
      for(var i = 0; i < Wednesday_list.length; i++) {
          if(Wednesday_list[i].title == Block_list[1]) {
            if(Wednesday_list[i].content == Block_list[2]) {
              Wednesday_list.splice(i, 1);
            }
          }
      }
        break;
      case "Thursday":
      for(var i = 0; i < Thursday_list.length; i++) {
          if(Thursday_list[i].title == Block_list[1]) {
            if(Thursday_list[i].content == Block_list[2]) {
              Thursday_list.splice(i, 1);
            }
          }
      }
        break;
      case "Friday":
      for(var i = 0; i < Monday_list.length; i++) {
          if(Friday_list[i].title == Block_list[1]) {
            if(Friday_list[i].content == Block_list[2]) {
              Friday_list.splice(i, 1);
            }
          }
      }
        break;
      default:

    }
    }
