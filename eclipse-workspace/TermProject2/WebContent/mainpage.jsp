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
  <!-- 홈페이지의 홈버튼. 홈페이지 제목 -->
   <img alt="not valid" src="./img/mainlogo.jpg" id="main_header">
   <%
      if(session.getAttribute("sessionID") == null) {
        %>
          <span id="LoginNeedMessage"> 로그인이 필요합니다.</span>
        <%
      }
  
      else{
        %>
        
        <span class="loginID" id="<%=session.getAttribute("sessionID") %>">
        <h2><%=session.getAttribute("sessionID") %> 님, 환영합니다!</h2>
        </span>
        <%
       	
      }
   %>
   <!-- 로그인 버튼 -->
   <article class="LoginButton">
     <button id="LoginButton"><h1>로그인</h1></button>
   </article>
   <!-- 사이즈 확인 버튼 -->
   <article class="CheckSizeButton">
     <button id="CheckSizeButton"><h1>사이즈 확인</h1></button>
   </article>
   <!-- 제조사 별 공식 홈페이지 버튼 -->
   <article class="MakerHomepageButton">
     <button id="MakerHomepageButton"><h1>제조사 별 공식 홈페이지</h1></button>
   </article>
   <!-- 신발 별 착샷 버튼 -->
   <article class="InstgramButton">
     <button id="InstgramButton"><h1>신발 별 착샷</h1></button>
   </article>

</body>
</html>
