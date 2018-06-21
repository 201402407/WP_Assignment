<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<html lang="ko">
<head>
  <meta charset="utf-8">
  <!-- 탭 제목 -->
  <title>슈즈 사이즈 닷컴</title>
  <!-- css, js 링크 -->
  <link rel="stylesheet" type="text/css" href="mainpage.css">
  <script src="mainpage.js"></script>
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
     <input type="text" name="Search_shoes" class="Search_shoes" id="Search_shoes" value=""
		placeholder="찾고자 하는 신발을 입력하세요.">
		<span class="icon"></span>
		
		<div id="bestItem_text">best item</div>
		<div class="mainLine"></div>
		<section class="imgArea" id="imgArea"><h6>empty</h6>
		<img alt="not valid" src="./shoesimage/p-31 black.jpg" class="MainShoesImg">
		
		</section>
		
		<img alt="not valid" src="./img/underbar.jpg" id="main_footer">
		
</body>
</html>
