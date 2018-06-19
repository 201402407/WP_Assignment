window.onload = function() {
  // 홈페이지 제목 (메인메뉴가기) 누르면.
  document.getElementById("main_header_click").onclick = function() {
    location.href = "mainpage.jsp"; // 메인 페이지로 이동.
  }
  // 로그인 버튼 누르면.
  document.getElementById("LoginButton").onclick = function() {
    location.href = "loginpage.jsp"; // 로그인 페이지로 이동.
  }
  
  // 사이즈 확인 버튼 누르면.
  document.getElementById("CheckSizeButton").onclick = function() {
    location.href = "sizecheckpage.html"; // 사이즈 확인 페이지로 이동.
  }

  // 신발 별 착샷 버튼 누르면.
  document.getElementById("InstgramButton").onclick = function() {
    location.href = "searchpage.html"; // 신발 별 착샷 페이지로 이동.
  }

  document.getElementById("MakerHomepageButton").onclick = function() {
    location.href = "makerhomepage.html"; // 제조사 홈페이지 링크 목록 페이지로 이동.
  }

  if (window.sessionStorage) {
	  
      sessionStorage.setItem('LoginID', $(".loginID").id);
  }
}
