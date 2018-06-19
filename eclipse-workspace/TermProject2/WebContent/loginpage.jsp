<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>슈즈 사이즈 닷컴</title>
  <link rel="stylesheet" type="text/css" href="loginpage.css?ver=1">
  <script src="loginpage.js"></script>
  <script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
  <script src="http://code.jquery.com/ui/1.8.23/jquery-ui.min.js"></script>
</head>
<body>
  <!-- 홈페이지의 홈버튼. 홈페이지 제목 -->
   <div id="main_header_click">
   <img alt="not valid" src="./img/mainlogo.jpg" id="main_header">
   </div>
   <!-- 로그인 공간 -->
   <article class="LoginButton">
     <div id="Login_header">로그인</div>
     <!-- ID를 입력받으면 서버로 전송 -->
     <form class="Login" action="login.jsp" method="post">
       <div id="LoginID_css">
         ID : <input type="text" name="LoginID" id="LoginID" placeholder="ID를 입력하세요."> <br />
       </div>
       <%
            // 아이디, 비밀번호가 틀릴경우 화면에 메시지 표시
            // login.jsp에서 로그인 처리 결과에 따른 메시지를 보낸다.
            String msg = request.getParameter("msg");
			
            if(msg != null && msg.equals("0"))
            {
              out.println("<span id=\'notId\'>해당 아이디가 존재하지 않습니다.</span>");
           }
    		
        %>
        
      <input type="submit" id="SubmitLogin" value="로그인"> <br />
     </form>
     <!-- 회원가입 버튼 -->
      <button type="button" name="JoinButton" id="JoinButton">회원가입</button>
   </article>
</body>
</html>
