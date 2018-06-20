window.onload = function() {
  // 홈페이지 제목 (메인메뉴가기) 누르면.
  document.getElementById("main_header").onclick = function() {
    location.href = "mainpage.jsp"; // 메인 페이지로 이동.
  }
  // 로그인 버튼 누르면.
  
  // 사이즈 확인 버튼 누르면.
  document.getElementById("CheckSizeButton").onclick = function() {
    location.href = "sizecheckpage.jsp"; // 사이즈 확인 페이지로 이동.
  }
  
  document.getElementById("JoinButton").onclick = function() {
	  location.href = "joinpage.html";
  }
  // 신발 별 착샷 버튼 누르면.
  document.getElementById("InstgramButton").onclick = function() {
    location.href = "searchpage.html"; // 신발 별 착샷 페이지로 이동.
  }
  
  window.name = $(".loginID").id;
  console.log($(".loginID").id);
  console.log(window.name);
  if (window.sessionStorage) {
	  
      sessionStorage.setItem('LoginID', $(".loginID").id);
  }
}

function Login(){
	    location.href = "loginpage.jsp"; // 로그인 페이지로 이동.
	  
}