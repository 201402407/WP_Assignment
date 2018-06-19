window.onload = function() {
  // 홈페이지 제목 (메인메뉴가기) 누르면.
  document.getElementById("main_header_click").onclick = function() {
    location.href = "mainpage.jsp";
  }
  //$(".reset_textarea").append("<input type="text" name="search_shoes2" id="search_shoes2">");
  
  $.getScript('./shoes.js');
}

$(document).ready(function(){
	
	
	$("#CheckID").click(function(){ // 중복 체크 검사.
		 jQuery.ajaxSettings.traditional = true;
		  	console.log("1");
		  	$.ajaxSetup({
		  	    scriptCharset: "utf-8",
		  	    contentType: "application/json; charset=utf-8"
		  	});
		  	
		  	$.ajax({ // 서버 데이터 전부 삭제.
		  	  type: 'get',
		  	  url: "./namecheck.jsp",
		  	  data:  {
		  		  	"Duplication_CheckingID": document.getElementById("join_name")
		  		  },
		  	  dataType : "text",
		  	  success: function(success) {
		  		  if(success) { // 전송 완료 시.
		  			var str = ajax_receive_WhiteSpace_delete(success);
		  			var i = 0;
		  			var $temp;
		  			
		  			if(str[0] == "duplication") { // 중복 아이디가 있을 경우.
		  				$(".checkName").attr("id", "DuplicationCheck_Fail");
		  				$(".checkName").text("이미 존재하는 아이디 입니다.");
		  				
		  			  }
		  			  if(str[0] == "nothing") { // 중복 아이디가 없을 경우.
		  				$(".checkName").attr("id", "DuplicationCheck_Complete");
		  				$(".checkName").text("해당 아이디는 사용이 가능합니다.");
		  				
		  			}
		  				//$("#join_name_block").append($temp); // 내용 표시		  				
		  		  }
		  		  else {
		  			  alert("잠시 후에 시도해주세요.");
		  		  }
		  	  },
		  	  error: function(xhr, request,error) {
		  		//location.href="namecheck.jsp";
		  		  alert("duplication check failed");
		  		  alert(xhr.status);
		  		  alert("message:"+request.responseText);
		  		  
		  	  }
		  	});
	})
	
	$("#Join").click(function(){  // 가입하기 버튼 눌렀을 시
		
		if($("#DuplicationCheck_Complete").length > 0) {
			jQuery.ajaxSettings.traditional = true;
		  	
		  	$.ajaxSetup({
		  	    scriptCharset: "utf-8",
		  	    contentType: "application/json; charset=utf-8"
		  	});
		  	
		  	$.ajax({ // 서버 데이터 전부 삭제.
		  	  type: 'get',
		  	  url: "./join.jsp",
		  	  data:  {
		  		  	"ID": $("#join_name").val(),
		  		  	"shoes1": $("#search_shoes1").val(),
		  		  	"shoes1_size": $("#shoes1_size").val(),
		  		  	"shoes2": $("#search_shoes2").val(),
		  		  	"shoes2_size": $("#shoes2_size").val()
		  		  },
		  	  dataType : "text",
		  	  success: function(success) {
		  		  if(success) { // 전송 완료 시.
		  			  alert("정상적으로 회원가입이 되었습니다.");
		  			var str = ajax_receive_WhiteSpace_delete(success);
		  			window.location.replace(str[0]); // 자동 로그인해서 메인페이지로 이동.
		  		  }
		  		  else {
		  			  alert("잠시 후에 시도해주세요.");
		  		  }
		  	  },
		  	  error: function(xhr, request,error) {
		  		
		  		  alert("join failed");
		  		  alert(xhr.status);
		  		  alert("message:"+request.responseText);
		  		  
		  	  }
		  	});
		}
		if($("#DuplicationCheck_Complete").length == 0) {
			alert("해당 아이디로 생성하실 수 없습니다.");
			return;
		}
		if($(".checkName").length == 0) {
			alert("아이디 중복 체크를 해주세요.");
			return;
		}
	})
	
    $("#search_shoes1").autocomplete({ // 신발 첫 번째 자동완성 기능.
    	
        source : function( request, response ) {
        	jQuery.ajaxSettings.traditional = true;
		  	
		  	$.ajaxSetup({
		  	    scriptCharset: "utf-8",
		  	    contentType: "application/json; charset=utf-8"
		  	});
		  	
             $.ajax({
                    type: 'get',
                    url: "./ShoesNameList.txt",
                    dataType: "text",
                    data: { value : request.term },
                    async: false,
                    success: function(success) {
                    	var str = success.split("\n");
                    	var resultlist = [];
                    	for(var i = 0; i < str.length; i++) { 
                    		str[i] = String_WhiteSpace_delete(str[i]);
                    		if(str[i].toLowerCase().startsWith(request.term))
                    			{ 
                    			resultlist.push(str[i]);
                    			}
                    		}
                        //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                        response(
                            $.map(resultlist, function(item) {
                            	return {
                                	label : item,
                                	value : item                                
                                }
                            }) 
                        );                         
                    }
               });
            },
        //조회를 위한 최소글자수
            autoFocus:true,             //첫번째 값을 자동 focus한다.
            matchContains:true,
            minLength:1,               //1글자 이상 입력해야 autocomplete이 작동한다.
            delay:100,  
        select: function( event, ui ) {
        	var obj = shoes_img(ui.item.value);
  			$("#shoes1_img").attr("src", obj.src);
  			$("#shoes1_img").attr("alt", obj.alt);
  			shoes_size_option(ui.item.value, 1);
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생. 이미지만.
        }
    });
	
	/*$('#shoes1_size').click(function () {
    	if($("#search_shoes1").val() != null) {
		console.log('마우스가 영역에 들어왔습니다!');
		
			jQuery.ajaxSettings.traditional = true;
		  	
		  	$.ajaxSetup({
		  	    scriptCharset: "utf-8",
		  	    contentType: "application/json; charset=utf-8"
		  	});
		  	
		  	$.ajax({ 
		  	  type: 'get',
		  	  url: "./ShoesNameList.txt",
		  	  dataType : "text",
		  	  success: function(success) {
		  		  if(success) { // 전송 완료 시.
		  			var str = success.split("\n");
		  			for(var i = 0; i < str.length; i++) { 
		  				str[i] = String_WhiteSpace_delete(str[i]);
		  	    		if($("#search_shoes1").val() == str[i]) {
		  	    			var obj = shoes_img($("#search_shoes1").val());
		  	    			
		  	    			$("#shoes1_img").attr("src", obj.src);
		  	    			$("#shoes1_img").attr("alt", obj.alt);
		  	    			if(size1_first.next() == null) {}
		  	    				shoes_size_option($("#search_shoes1").val(), 1);
		  	    			// 다른 jsp나 js로 넘어가서 해당 신발에 대한 함수 실행.
		  	    			// 그 함수는 해당 신발에 대한 사이즈 option tag 추가.
		  	    			// 및 신발 사진도 추가. ( select하면 그 때 바로 추가.)
		  	    			return;	
		  	    		}
		  	    	}
		  			document.getElementById("search_shoes1").value = null;
		  			alert("해당 신발이 존재하지 않습니다. 다시 입력해주세요.");
		  			return;
		  		  }
		  		  else {
		  			  alert("잠시 후에 시도해주세요.");
		  		  }
		  	  },
		  	  error: function(xhr, request,error) {
		  		
		  		  alert("join failed");
		  		  alert(xhr.status);
		  		  alert("message:"+request.responseText);
		  		  
		  	  }
		  	});
    	}
	}); */
	
	
	$("#search_shoes2").autocomplete({ // 신발 첫 번째 자동완성 기능.
    	
        source : function( request, response ) {
        	jQuery.ajaxSettings.traditional = true;
		  	
		  	$.ajaxSetup({
		  	    scriptCharset: "utf-8",
		  	    contentType: "application/json; charset=utf-8"
		  	});
		  	
             $.ajax({
                    type: 'get',
                    url: "./ShoesNameList.txt",
                    dataType: "text",
                    data: { value : request.term },
                    async: false,
                    success: function(success) {
                    	var str = success.split("\n");
                    	var resultlist = [];
                    	for(var i = 0; i < str.length; i++) { 
                    		str[i] = String_WhiteSpace_delete(str[i]);
                    		if(str[i].toLowerCase().startsWith(request.term))
                    		{ 
                    			resultlist.push(str[i]);
                    			}
                    		}
                        //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                        response(
                            $.map(resultlist, function(item) {
                            	return {
                                	label : item,
                                	value : item                                
                                }
                            }) 
                        );                                          
                    }
               });
            },
        //조회를 위한 최소글자수
            autoFocus:true,             //첫번째 값을 자동 focus한다.
            matchContains:true,
            minLength:1,               //1글자 이상 입력해야 autocomplete이 작동한다.
            delay:100,  
        select: function( event, ui ) {
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
        	if($("#search_shoes1").val() == ui.item.value) {
        		alert("같은 신발을 선택하셨습니다. 다른 신발을 골라주세요.");
        		$("#reset_textarea2").children().first().remove();
        		$("#reset_textarea2").append("<input type='text' name='search_shoes2' id='search_shoes2'>");
        		document.getElementById("search_shoes2").value = null;
        		
        		return;
        	}
        	else{
        		
        		var obj = shoes_img(ui.item.value);
      			$("#shoes2_img").attr("src", obj.src);
      			$("#shoes2_img").attr("alt", obj.alt);
      			shoes_size_option(ui.item.value, 2);
        	}
        	
        }
    });

	/*$('#shoes2_size').click(function () {
    	if($("#search_shoes2").val() != null) {
		console.log('마우스가 영역에 들어왔습니다!');
		
			jQuery.ajaxSettings.traditional = true;
		  	
		  	$.ajaxSetup({
		  	    scriptCharset: "utf-8",
		  	    contentType: "application/json; charset=utf-8"
		  	});
		  	
		  	$.ajax({ // 서버 데이터 전부 삭제.
		  	  type: 'get',
		  	  url: "./ShoesNameList.txt",
		  	  dataType : "text",
		  	  success: function(success) {
		  		  if(success) { // 전송 완료 시.
		  			var str = success.split("\n");
                		if(($("#search_shoes1").val() == $("#search_shoes2").val())
                				& ($("#search_shoes2").val() != "")) {
                			alert("같은 신발을 선택하셨습니다. 다른 신발을 골라주세요.");
                			document.getElementById("search_shoes2").value = null;
                			return;
                		}
                		for(var i = 0; i < str.length; i++) { 
                			str[i] = String_WhiteSpace_delete(str[i]);
                    		if($("#search_shoes2").val() == str[i]) {
                    			// 다른 jsp나 js로 넘어가서 해당 신발에 대한 함수 실행.
                    			// 그 함수는 해당 신발에 대한 사이즈 option tag 추가.
                    			// 및 신발 사진도 추가. ( select하면 그 때 바로 추가.)
                    			return;	
                    		}
                    	}
                		alert("해당 신발이 존재하지 않습니다. 다시 입력해주세요.");
                		document.getElementById("search_shoes2").value = null;
                		return;
		  		  }
		  		  else {
		  			  alert("잠시 후에 시도해주세요.");
		  		  }
		  	  },
		  	  error: function(xhr, request,error) {
		  		
		  		  alert("join failed");
		  		  alert(xhr.status);
		  		  alert("message:"+request.responseText);
		  		  
		  	  }
		  	});
    	}
	}); */
})

function String_WhiteSpace_delete(string) { // 문자열 양 끝 공백 제거.
	return $.trim(string);
}
function ajax_receive_WhiteSpace_delete(success) { // ajax에서 전송받은 문장들 공백의 문자열 분리 및 양 끝 공백제거.
	var str = success.split("\n"); // 데이터 가져오기 성공.
		var i = 0;
		var count = 0;
		var array = [];
	  while(i < str.length) {
		  if(str[i].replace(/^\s*/, "") == 0) {
			  i++;
			  continue;
		  }
		  array[count] = String_WhiteSpace_delete(str[i]);
		  	  i++;
		  	  count++;
	  }
	  return array;
}