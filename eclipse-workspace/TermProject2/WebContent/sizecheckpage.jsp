<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>슈즈 사이즈 닷컴</title>
  <link rel="stylesheet" type="text/css" href="sizecheckpage.css?ver=1">
  <script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
  <script src="http://code.jquery.com/ui/1.8.23/jquery-ui.min.js"></script>
  <script src="sizecheckpage.js?ver=1"></script>
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
   <!-- 사용자의 신발 사이즈 출력 -->
   <article class="ShoesSizeCheck_block">
       <!-- 신발 사진 출력 -->
       <!-- <div class="CheckShoes_image" id="CheckShoes_image"> -->
       <%
       if(request.getParameter("send_data") != null) {
    	   String data = request.getParameter("send_data");
    	   String name = data.substring(0, data.indexOf("_"));
    	   String src = "./shoesimage/" + name + ".jpg";
    	  
    	   %>
    	   <img alt="not valid" src="<%=src %>" class="CheckShoes_image" id="CheckShoes_img">
    	   <%
       }
       %>
       
       <!-- </div> -->
       
       <!-- 신발 이름 출력 -->
       <div class="CheckShoes_info" id="CheckShoes_name">
       <% // 신발명과 신발 가격 받기.
       if(request.getParameter("send_data") != null) {
    	   String data = request.getParameter("send_data");
    	   String name = data.substring(0, data.indexOf("_"));
    	   %>
    	   	제품명: <%= name %>
    	   <%
       }
       %>
       </div>
       <!-- 신발 가격 출력 -->
       <div class="CheckShoes_info" id="CheckShoes_price">
       <%
       if(request.getParameter("send_data") != null) {
    	   String data = request.getParameter("send_data");
    	   String price = data.substring(data.indexOf("_") + 1);
    	   %>
    	   <%= price %> 원
    	   <%
       }
       %>
       
       </div>
       <button id="CheckSizeButton">나에게 맞는 사이즈 찾기</button>
       <div class="CheckShoes_info" id="CheckShoes_result">
       </div>
      
      </article>
</body>
</html>
