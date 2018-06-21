window.onload = function() {
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