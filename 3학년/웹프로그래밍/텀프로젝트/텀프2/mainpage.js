window.onload = function() {
  // 홈페이지 제목 (메인메뉴가기) 누르면.
  document.getElementById("main_header_click").onclick = function() {
    location.href = "mainpage.html"; // mainpage로 이동.
  }

  // 로그인 버튼 누르면.
  document.getElementById("LoginButton").onclick = function() {
    location.href = "loginpage.html"; // loginpage로 이동.
  }

  // 사이즈 확인 버튼 누르면.
  document.getElementById("CheckSizeButton").onclick = function() {
    location.href = "sizecheckpage.html"; // loginpage로 이동.
  }

}
