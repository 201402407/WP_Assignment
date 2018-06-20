<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>슈즈 사이즈 닷컴</title>
  <link rel="stylesheet" type="text/css" href="sizecheckpage.css">
  <script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
  <script src="http://code.jquery.com/ui/1.8.23/jquery-ui.min.js"></script>
  <script src="sizecheckpage.js"></script>
</head>
<body>
  <!-- 홈페이지의 홈버튼. 홈페이지 제목 -->
   <div id="main_header_click">
   <img alt="not valid" src="./img/mainlogo.jpg" id="main_header">
   <%
      if(session.getAttribute("sessionID") == null) {
        %>
          <span id="LoginNeedMessage"> 로그인이 필요합니다.</span>
        <%
      }
  
      else{
        %>
        
        <span id="loginID" value="<%=session.getAttribute("sessionID") %>">
        <h2><%=session.getAttribute("sessionID") %> 님, 환영합니다!</h2>
        </span>
        <%
       	
      }
   %>
   </div>
   <!-- 사용자의 신발 사이즈 출력 -->
   <article class="MyShoesSize_block">
     <button id="MemberCartShoes_Button"><h1>찜목록 신발 불러오기</h1></button>
     <button id="MemberJoinShoes_Button"><h1>회원가입시 저장한 신발 불러오기</h1></button>
     <div id="MyShoesList"></div>
    <input type="text" name="shoes_name" id="shoes_name" placeholder="검색할 신발을 입력하세요.">
     <!-- 첫 번째 신발 -->
       <!-- 신발 사진 출력 -->
       <div class="MyShoes_image" id="MyShoes_image">
       </div>
       <!-- 신발 이름 출력 -->
       <div class="MyShoes_name" id="MyShoes_name">
       </div>
       <!-- 사이즈 입력 -->
       <select name="shoes_size" class="shoes_size_select" id="shoes1_size">
     	<option class="size_first" id="size1_first" value="All" selected disabled hidden>사이즈</option>
     </select>
       <button id="CheckSizeButton"><h1>실착사이즈가 맞는 신발 보기</h1></button>
     <div class="mainLine"></div>
      <!-- 사용자가 선택한 신발과 사이즈가 같은 신발들 이름 리스트 -->
      <div class="CompareShoes" id="CompareShoesList">
      </div>
      <div class="CompareShoes_image" id="CompareShoes_image">
       </div>
      </article>
</body>
</html>
<% out.println(session.getAttribute("sessionID") + "님"); %>