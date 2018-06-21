<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>슈즈 사이즈 닷컴</title>
  <link rel="stylesheet" type="text/css" href="loginpage.css?ver=1">
  <script src="loginpage.js?ver=1"></script>
  <script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
  <script src="http://code.jquery.com/ui/1.8.23/jquery-ui.min.js"></script>
</head>
<body>
   <!-- 홈페이지의 로고 및 메뉴 바 -->
   <div id="header">
  	 <img alt="not valid" src="./img/mainlogo.jpg" id="main_header">
  	 <%
      if(session.getAttribute("sessionID") == null) {
        %>
          <button type="button" class="main_button" id="JoinButton">회원가입</button>
          <button class="main_button" id="LoginButton" onclick="login();">로그인</button>
        <%
      }
  
      else{
        %>
        
        <button type="button" class="main_button" id="JoinButton">회원가입</button>
        <span id="NowLogin"><%=session.getAttribute("sessionID") %> 님, 환영합니다!</span>
        </span>
        <%
      }
   %>
  	
   
   </div>
   
   <!-- 로그인 버튼 -->
   <article class="MenuButton">
  		<div class="menubar" id="sports">운동화</div>
   		<div class="menubar" id="gudu">구두</div>
  	 	<div class="menubar" id="sandle">샌들</div>
  	 	<div class="menubar" id="boots">부츠</div>
  	 	<div class="menubar" id="walker">워커</div>
  	 	<div class="menubar" id="theothers">기타</div>
     </article>
   <!-- 로그인 공간 -->
   <div id="LoginMenu">
     <!-- ID를 입력받으면 서버로 전송 -->
     <form class="Login" action="login.jsp" method="post">
       <div id="LoginID_css">
         아이디 : <input type="text" name="LoginID" id="LoginID" placeholder="ID를 입력하세요."> <br />
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
        
      <input type="submit" class="button_click" id="SubmitLogin" value="로그인"> <br />
      
     <!-- 회원가입 버튼 -->
      <button type="button" class="button_click" name="JoinButton2" id="JoinButton2">회원가입</button>
     </form>
   </div>
</body>
</html>
