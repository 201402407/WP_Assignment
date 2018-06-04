var Monday_list = new Array();
var Tuesday_list = new Array();
var Wednesday_list = new Array();
var Thursday_list = new Array();
var Friday_list = new Array();
var day_list = [Monday_list, Tuesday_list, Wednesday_list, Thursday_list, Friday_list];

// HTML 실행 시 항상 작동 가능.
window.onload = function() {
 
	// 메인 페이지에서 Add_button 클릭 시.
  document.getElementById("Add_button").onclick = function() {
	  loadJQuery();
	  document.getElementById("Add_ToDo_popup").style.display = "block";

        window.removeEventListener("message", messageHandlerRewrite, true);
        window.addEventListener("message", messageHandlerAdd, true);
            }
            var Search_Keyword_input = document.getElementById("Search_Keyword_input");
            Search_Keyword_input.addEventListener("keyup", function(event) {
              if(event.keyCode === 13) {
                var search_target = document.getElementById("Search_day");
                day_value = search_target.options[search_target.selectedIndex].value;
                Search_Block_List(Search_Keyword_input.value, day_value);
              }
            });
   
  // reset_button 클릭 시.
  document.getElementById("reset_button").onclick = function() {
    All_of_Block();
  }
  
  // delete_button 클릭 시. (체크 한 것들 제거)
  document.getElementById("check_delete_button").onclick = function(event) {
	  if($("input:checkbox[name='check_block']").is(":checked").length == 0) {
		  return;
	  }
	  
	  var items = [];
	  $("input:checkbox[name='check_block']:checked").each(function () {
	      items.push(this.id);
	  });
	  
	  for(var i = 0; i < items.length; i++) {
		  var parent = document.getElementById(items[i]).parentNode;
		  
		  var parentId = parent.id.concat("_", document.getElementById(items[i]).value);
		  parentId = parentId.split("_");
		  alert(parentId);
		  var Delete_Block = Block_Find(parentId);
		  Delete_Block_List(Delete_Block);
		  parent.parentNode.removeChild(parent);
		  
		  delete_send_data(Delete_Block[0]);
	  }
  }
}

// JQuery javascript에서 실행하게 함.
function loadJQuery() {
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.charset = "utf-8";		  
    oScript.src = "http://code.jquery.com/jquery-1.6.2.min.js";	
    document.getElementsByTagName("head")[0].appendChild(oScript);
}

// 수정을 하기 위해 rewriteToDo.html에 메세지 요청 냄.
function sendRewriteMessage(obj) {
  document.getElementById("Rewrite_ToDo_popup").contentWindow.postMessage(obj,"*");
}

// AddToDo로부터 받은 메세지.
function messageHandlerAdd(e) {
  switch (e.data) {
    case "AddToDo_Close_button_request":
      Add_Todo_Close();
      break;
    default:
    var workListBlock = e.data;
    switch (workListBlock.day) {
      case "Monday":
        workListBlock.rank = Monday_list.length + 1;
        break;
      case "Tuesday":
        workListBlock.rank = Tuesday_list.length + 1;
        break;
      case "Wednesday":
        workListBlock.rank = Wednesday_list.length + 1;
        break;
      case "Thursday":
        workListBlock.rank = Thursday_list.length + 1;
        break;
      case "Friday":
        workListBlock.rank = Friday_list.length + 1;
        break;
        default:
        break;
    }
    var temp = Add_Block_div(workListBlock);
    Add_Button_send_data(workListBlock);	
    Add_Block_List(workListBlock, temp);
    Add_Todo_Close();
    break;
  }
}

// RewriteToDo로부터 받은 메세지.
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

// Add_button 프레임 닫는 함수.
function Add_Todo_Close() {
  document.getElementById("Add_ToDo_popup").style.display = "none";
}

// Rewrite_button 프레임 닫는 함수.
function Rewrite_Todo_Close() {
  document.getElementById("Rewrite_ToDo_popup").style.display = "none";
}

// 메인 페이지에 Block의 div태그 생성하는 함수. obj를 인자로 한다.
function Add_Block_div(ListBlock_obj) {
  var create_block = document.createElement("div");
  create_block.className = "BlockSetting";
  create_block.style.display = "block";
  create_block.id = ListBlock_obj.day.concat("_", ListBlock_obj.title, "_", ListBlock_obj.content);

  // X 이미지 생성.
  var create_block_closeImage = document.createElement("img");
  create_block_closeImage.src = "img/delete.png";
  create_block_closeImage.className = "create_block_closeImage";
  create_block_closeImage.id = create_block.id;
  create_block.appendChild(create_block_closeImage);

  // 체크박스 생성.
  $(create_block).append($('<input/>', {
	  type: 'checkbox',
      id: ListBlock_obj.day.concat("_", ListBlock_obj.rank),
      name: 'check_block',
      value: ListBlock_obj.rank,
  }));
  
  // X 버튼 클릭 시 닫기.
  	create_block_closeImage.onclick = function() {
    var parent = create_block_closeImage.parentNode;
    var parentId = parent.id.split("_");
    parentId = parentId.concat(ListBlock_obj.rank);
    var Delete_Block = Block_Find(parentId);
    Delete_Block_List(Delete_Block);
    parent.parentNode.removeChild(parent);
    
    delete_send_data(Delete_Block[0]);
  }

  // X버튼과 check버튼을 제외한 블록 클릭 시 수정창 표시.
  create_block.onclick = function(event) {
    if(event.target != create_block_closeImage && event.target.name != "check_block") {
    document.getElementById("Rewrite_ToDo_popup").style.display = "block";
    var myBlockId = create_block.id.split("_");
    myBlockId = myBlockId.concat(ListBlock_obj.rank);
    alert(myBlockId);
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

// Add_button으로 인한 데이터 전송.
function Add_Button_send_data(obj) { // 데이터 전송 함수. ajax.
	jQuery.ajaxSettings.traditional = true;
	
	$.ajaxSetup({
	    scriptCharset: "utf-8",
	    contentType: "application/json; charset=utf-8"
	});
	$.ajax({
	  type: 'get',
	  url: "./DataList.jsp",
	  data:  {
		  	"type" : "add",
			"day" : obj.day,
			"title" : obj.title,
			"content" : obj.content,
			"rank" : obj.rank
		  },
	  dataType : "text",
	  success: function(success) {
		  if(success) { // 전송 완료 시.
			  var str = success.split("\n"); // 데이터 가져오기 성공.
			  last_rewrite(str[1]);
		  }
		  else {
			  alert("잠시 후에 시도해주세요.");
		  }
	  },
	  error: function(xhr, request,error) {
		//location.href="DataList.jsp";
		  alert("실패하였습니다.");
		  alert(xhr.status);
		  alert("message:"+request.responseText);
		  
	  }
	});
}

// 서버에 가서 데이터를 제거하는 함수.
function delete_send_data(obj) {
jQuery.ajaxSettings.traditional = true;
	
	$.ajaxSetup({
	    scriptCharset: "utf-8",
	    contentType: "application/json; charset=utf-8"
	});
	$.ajax({
	  type: 'get',
	  url: "./DataList.jsp",
	  data:  {
		  	"type" : "delete",
			"day" : obj.day,
			"title" : obj.title,
			"content" : obj.content,
			"rank" : obj.rank
		  },
	  dataType : "text",
	  success: function(success) {
		  if(success) { // 전송 완료 시.
			  alert("전송완료");
			  var str = success.split("\n"); // 데이터 가져오기 성공.
			  alert(str[0]);
			  last_rewrite(str[1]);
		  }
		  else {
			  alert("잠시 후에 시도해주세요.");
		  }
	  },
	  error: function(xhr, request,error) {
		 // location.href="DataList.jsp";
		  alert("실패하였습니다.");
		  alert(xhr.status);
	  }
	});
}

// 최종 수정시간 표시.
function last_rewrite(string_date) {
	$("#last_rewrite_block").text(string_date);
}

// Add_button으로 인해 발생. Array에 넣고, div를 메인 페이지에 출력하게 함.
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

// 수정하는 함수.
function Rewrite_Block_List(block_obj, rank, element_obj) { // 수정. rank는 배열의 index. rank 확인.
	
	var temp = "";
	jQuery.ajaxSettings.traditional = true;
	
	$.ajaxSetup({
	    scriptCharset: "utf-8",
	    contentType: "application/json; charset=utf-8"
	});
	$.ajax({
	  type: 'get',
	  url: "./DataList.jsp",
	  data:  {
		  	"type" : "delete",
			"day" : element_obj.day,
			"title" : element_obj.title,
			"content" : element_obj.content,
			"rank" : element_obj.rank
		  },
	  dataType : "text",
	  success: function(success) {
		  if(success) { // 전송 완료 시.
			  
			  var str = success.split("\n"); // 데이터 가져오기 성공.
			  temp = str[0];
			//  console.log(temp);
			  last_rewrite(str[1]);  
			  jQuery.ajaxSettings.traditional = true;
				$.ajaxSetup({
					   scriptCharset: "utf-8",
					   contentType: "application/json; charset=utf-8"
					});
					$.ajax({
					  type: 'get',
					  url: "./DataList.jsp",
					  data:  {
						  	"type" : "add",
							"day" : block_obj.day,
							"title" : block_obj.title,
							"content" : block_obj.content,
							"rank" : block_obj.rank
						  },
					  dataType : "text",
					  success: function(success) {
						  if(success) { // 전송 완료 시.
						//	  alert("전송완료");
							  var str = success.split("\n"); // 데이터 가져오기 성공.
							  console.log(str[0]);
							  last_rewrite(str[1]);
						  }
						  else {
							  alert("잠시 후에 시도해주세요.");
						  }
					  },
					  error: function(xhr, request,error) {
						 // location.href="DataList.jsp";
						  alert("실패하였습니다.ㅋㅋ");
						  alert(xhr.status);
					  }
					});
		  }
		  else {
			  alert("잠시 후에 시도해주세요.ㅋ");
		  } 
	  },
	  error: function(xhr, request,error) {
		 // location.href="DataList.jsp";
		  alert("실패하였습니다.");
		  alert(xhr.status);
	  }
	});  
	//console.log(block_obj.day + ", " + block_obj.title + " , " + block_obj.content + " , " + block_obj.rank);
	
	

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
    
    for(var i = 0; i < array_to_last_block_day.length; i++) {
      array_to_last_block_day[i].rank = i + 1;
      Div_Find(array_to_last_block_day[i])[2].value = array_to_last_block_day[i].rank; 
   //   console.log(array_to_last_block_day[i].rank + " , " + Div_Find(array_to_last_block_day[i])[2].value);
    }
    for(var i = 0; i < array_to_new_block_day.length; i++) {
      array_to_new_block_day[i].rank = i + 1;
      Div_Find(array_to_new_block_day[i])[2].value = array_to_new_block_day[i].rank;
    //  console.log(array_to_new_block_day[i].rank + " , " + Div_Find(array_to_new_block_day[i])[2].value);
    } 
    Rewrite_Todo_Close(); 
  }

// 해당 블록이 있는지, 존재하는 블록만 표시.
function Search_Block_List(Search_Keyword_string, day_value) {
    All_of_None();
    if(day_value == "All") {
      for(var i = 0; i < day_list.length; i++) {
        var temp = day_list[i];
        for(var j = 0; j < temp.length; j++) {
            if(temp[j].title == Search_Keyword_string) {
              var temp2 = Div_Find(temp[j]);
              temp2[2].style.visibility = "visible";
            }
          }
        }
    }
    else {
      var search_day_list = array_to_day_list(day_value);
      for(var i = 0; i < search_day_list.length; i++) {
          if(search_day_list[i].title == Search_Keyword_string) {
            var temp2 = Div_Find(search_day_list[i]);
            temp2[2].style.visibility = "visible";
          }
        }
    }
}

// 모든 블록 안보이게.
function All_of_None() {
    for(var i = 0; i < day_list.length; i++) {
      var temp = day_list[i];
      for(var j = 0; j < temp.length; j++) {
        var temp2 = Div_Find(temp[j]);
        temp2[2].style.visibility = "hidden";
      }
    }
  }

// 모든 블록 보이게
  function All_of_Block() {
      for(var i = 0; i < day_list.length; i++) {
        var temp = day_list[i];
        for(var j = 0; j < temp.length; j++) {
          var temp2 = Div_Find(temp[j]);
          temp2[2].style.visibility = "visible";
        }
      }
    }

function insertAfter(new_div, ref_div) {
    if (!!ref_div.nextSibling) {
      ref_div.parentNode.insertBefore(new_div, ref_div.nextSibling);
    } else {
      ref_div.parentNode.appendChild(new_div);
    }
  }

// day 변수를 통해 해당 날짜의 Array 리턴.
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

// Block의 Array에서 해당 블록 제거하는 함수.
function Delete_Block_List(Block_array) {
    array_to_day_list(Block_array[0].day).splice(Block_array[1], 1);
}

// Div태그를 찾는 함수.
function Div_Find(obj) {
    var block_array = [obj.day, obj.title, obj.content, obj.rank];
    var block_array_id = obj.day.concat("_", obj.title, "_", obj.content);
    var block_array_div = document.getElementById(block_array_id);
    var temp = [];
    temp = [block_array, block_array_id, block_array_div];
    return temp;
  }

// 해당 블록이 Array에 존재하면, Array안에 있는 객체와 해당 인덱스(rank - 1 ) 리턴. [day, title, content, rank]
function Block_Find(Block_list_Array) {
    var temp = [];
    switch (Block_list_Array[0]) {
      case "Monday":
        for(var i = 0; i < Monday_list.length; i++) {
            if(Monday_list[i].title == Block_list_Array[1]) {
              if(Monday_list[i].content == Block_list_Array[2]) {
                if(Monday_list[i].rank == Block_list_Array[3])
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
              if(Tuesday_list[i].rank == Block_list_Array[3])
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
              if(Wednesday_list[i].rank == Block_list_Array[3])
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
              if(Thursday_list[i].rank == Block_list_Array[3])
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
              if(Friday_list[i].rank == Block_list_Array[3])
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
