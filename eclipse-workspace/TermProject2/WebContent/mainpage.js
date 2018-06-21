window.onload = function() {
	
	 $.getScript('./shoes.js'); // 신발 정보 가져오기 위한 js파일 import.
  // 홈페이지 제목 (메인메뉴가기) 누르면.
  document.getElementById("main_header").onclick = function() {
    location.href = "mainpage.jsp"; // 메인 페이지로 이동.
  }
  // 로그인 버튼 누르면.
 
  document.getElementById("JoinButton").onclick = function() {
	  location.href = "joinpage.html";
  }

  if (window.sessionStorage) {
	  
      sessionStorage.setItem('LoginID', $(".loginID").id);
  }
}

function login(){
	    location.href = "loginpage.jsp"; // 로그인 페이지로 이동.  
}

$(document).ready(function(){
	
	
	$(".menubar").click(function(e) { // 메뉴바 클릭.
		var Area_id = e.target.id;
		$(".imgArea").each(function(index, element){
			var temp = $(element).attr("id").split("_");
			
			if(temp[1] == Area_id) {
				$(element).css("display", "inline-block");
			}
			else{
				$(element).css("display", "none");
			}
		})
	})
	
	$(".ShoesImg").click(function(e){ // 해당 이미지를 클릭 시.
		var img_id = e.target.id;
		
		jQuery.ajaxSettings.traditional = true;
		$.ajaxSetup({
	  	    scriptCharset: "utf-8",
	  	    contentType: "application/json; charset=utf-8"
	  	});
		$.ajax({ // 서버 데이터 전부 삭제.
		  	  type: 'get',
		  	  url: "./ShoesInfo.txt",
		  	  dataType : "text",
		  	  success: function(success) {
		  		  if(success) { // 전송 완료 시.
		  			var str = ajax_receive_WhiteSpace_delete(success); // 저장된 신발 정보 데이터 ajax.
		  			var i = 0;
		  			console.log(img_id);
		  			while(i < str.length) { // 전송받은 데이터 중
		  				
		  				if(str[i].indexOf(img_id) != -1) { // 해당 이미지 파일의 id와 같은 신발 이름이 있다면
		  					var temp = str[i].split("_");
		  					console.log(temp[0] + "," + temp[1]);
		  					
		  					$("#img_shoes_send").append($('<input>', { // 전송하기위해 임의의 input 태그 생성.
		  						 value: str[i],
		  						 type: "hidden",
		  						name: "send_data"
		  					 }));	 
		  					
		  					break;
		  				}
		  				i++;
		  				continue;
		  			}
		  			$("#img_shoes_send").submit(); // 숨겨진 form 형태로 위에서 생성한 데이터 전송.
		  			
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