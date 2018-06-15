window.onload = function() {
  // 홈페이지 제목 (메인메뉴가기) 누르면.
  document.getElementById("main_header_click").onclick = function() {
    location.href = "mainpage.jsp";
  }

  // 회원가입하기 버튼 누르면.
  document.getElementById("Join").onclick = function() {
    location.href = "login.jsp"; // Ajax로 데이터 login.jsp로 보내고 성공하면 회원가입 완료. 이후 로그인 된 채로 메인메뉴 가기.
  }
}
