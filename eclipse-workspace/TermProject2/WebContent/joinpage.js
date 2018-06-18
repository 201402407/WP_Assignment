window.onload = function() {
  // 홈페이지 제목 (메인메뉴가기) 누르면.
  document.getElementById("main_header_click").onclick = function() {
    location.href = "mainpage.jsp";
  }

  
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
		  			console.log(str.length);
		  			if(str[0] == "duplication") { // 중복 아이디가 있을 경우.
		  				$temp = $("<span class='checkName' id='DuplicationCheck_Fail'>이미 해당 아이디가 존재합니다.</span>");
		  				
		  			  }
		  			  if(str[0] == "nothing") { // 중복 아이디가 없을 경우.
		  				
		  				$temp = $("<span class='checkName' id='DuplicationCheck_Complete'>해당 아이디는 사용 가능합니다.</span>");
		  				
		  			}
		  				$("#join_name_block").append($temp); // 내용 표시
		  				
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
		  		  	"shoes2": $("#search_shoes2").val()
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
	
    $("#search_shoes1").autocomplete({
    	
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
                    data: { value : $("#search_shoes1").val() },
                    async: false,
                    success: function(success) {
                    	console.log(success);
                    	var str = success.split("\n");
                    	console.log(str);
                    	return str;
                        //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                       /* response(
                            $.map(data, function(item) {
                            	console.log(item);
                            	
                                return item.data;
                            }) 
                        ); */
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
        }
    });
})

function ajax_receive_WhiteSpace_delete(success) {
	var str = success.split("\n"); // 데이터 가져오기 성공.
		var i = 0;
		var count = 0;
		var temp = [];
	  while(i < str.length) {
		  if(str[i].replace(/^\s*/, "") == 0) {
			  i++;
			  continue;
		  }
		  temp[count] = $.trim(str[i]);
		  	  i++;
		  	  count++;
	  }
	  return temp;
}