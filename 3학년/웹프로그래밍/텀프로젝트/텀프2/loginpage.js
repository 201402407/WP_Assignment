window.onload = function() {
  // 홈페이지 제목 (메인메뉴가기) 누르면.
  document.getElementById("main_header_click").onclick = function() {
    location.href = "mainpage.html";
  }

  document.getElementById("JoinButton").onclick = function() {
    location.href = "joinpage.html";
  }
}
