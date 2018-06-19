window.onload = function() {
  document.getElementById("main_header_click").onclick = function() {
    location.href = "mainpage.jsp";
  }
  
  $.getScript('./shoes.js');
}


$(document).ready(function(){
	$("#MemberJoinShoes_Button").click(function(){ // 클릭 시 사용자가 가입하면서 저장했던 신발 두개 나오기.
		console.log("?");
		console.log(sessionStorage.getItem("sessionID"));
		jQuery.ajaxSettings.traditional = true;
	  	
	  	$.ajaxSetup({
	  	    scriptCharset: "utf-8",
	  	    contentType: "application/json; charset=utf-8"
	  	});
	  	
	  	$.ajax({ // 서버 데이터 전부 삭제.
	  	  type: 'get',
	  	  url: "./myshoeslist.jsp",
	  	  data:  {
  		  	"ID": sessionStorage.getItem("sessionID")
  		  },
	  	  dataType : "text",
	  	  success: function(success) {
	  		  if(success) { // 전송 완료 시.
	  			var str = ajax_receive_WhiteSpace_delete(success); // 회원가입시 저장된 순서로 정보 받음.
	  			var i = 0;
	  			console.log(console);
	  			console.log(str);
	  			while(i < str.length) {
	  				$("#MyShoesList").append($('<div>', {
		  				 text: str[i],
		  				 value: str[i+1],
		  				 id: str[i],
		  				 name: MyShoesList
		  			 }));
	  				$("#str[i]").addClass("shoes_list");
	  				i = i + 2;
	  			}		
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
	});
	
	$(".shoes_list").click(function(){
		var shoesName = $(this).id;
		var shoesName_img = shoes_img(shoesName);
		if($("#MyShoes_image").children().first() != null) { // 이미 이미지가 있으면
			$("#MyShoes_image").children().first().remove();
		}
		if($(this).val() != null) { // 회원가입시 저장된 신발 누르면
			$("#MyShoes_image").append($('<img>', {
				src: shoesName_img.src,
				alt: shoesName_img.alt
			}));
			shoes_size_option(shoesName, 1);
			$("#shoes1_size").val($(this).val()).prop("selected", true);
		}
		if($("#MyShoes_image").children().first() != null) { // 이미 이미지가 있으면
			$("#MyShoes_image").children().first().remove();
		}
		$("#MyShoes_image").append($('<img>', {
			src: shoesName_img.src,
			alt: shoesName_img.alt
		}));
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