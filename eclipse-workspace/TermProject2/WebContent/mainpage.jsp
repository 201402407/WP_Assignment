<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<html lang="ko">
<head>
  <meta charset="utf-8">
  <!-- 탭 제목 -->
  <title>슈즈 사이즈 닷컴</title>
  <!-- css, js 링크 -->
  <link rel="stylesheet" type="text/css" href="mainpage.css?ver=1">
  <script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
  <script src="http://code.jquery.com/ui/1.8.23/jquery-ui.min.js"></script>
  <script src="mainpage.js?ver=1"></script>
  
</head>
<body>
    <!-- 홈페이지의 로고 및 메뉴 바 -->
   <div id="header">
  	 <img alt="not valid" src="./img/mainlogo.jpg" id="main_header">
  	 <% // 이건 사용자가 로그인 상태인지 아닌지 여부 에 따른 메뉴.
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
		<!-- 기준선. 밑에부터는 신발 사진 리스트 출력 디스플레이. -->
		<div class="mainLine"></div>
		
		<!-- 운동화 저장 장소 -->
		<section class="imgArea" id="imgArea_sports" value="sports"><h6>empty</h6>
		
		<div id="MainShoseImg">
		<img alt="not valid" src="./shoesimage/p-31 black.jpg" class="ShoesImg" id="p-31 black">
		<div class="shoesname">p-31 black</div>
		</div>	
		<div id="MainShoseImg">
		<img alt="not valid" src="./shoesimage/p-31 white.jpg" class="ShoesImg" id="p-31 white">
		<div class="shoesname">p-31 white</div>
		</div>	
		</section>
		
		<!-- 구두 저장 장소 -->
		<section class="imgArea" id="imgArea_gudu" value="gudu"><h6>empty</h6>	
		<div id="MainShoseImg">
		<img alt="not valid" src="./shoesimage/p-31 black.jpg" class="ShoesImg" id="p-31 black">
		<div class="shoesname">p-31 black</div>
		</div>
		</section>
		
		<!-- 샌들 저장 장소 -->
		<section class="imgArea" id="imgArea_sandle" value="sandle"><h6>empty</h6>	
		<div id="MainShoseImg">
		<img alt="not valid" src="./shoesimage/p-31 black.jpg" class="ShoesImg" id="p-31 black">
		<div class="shoesname">p-31 black</div>
		</div>
		</section>
		
		<!-- 부츠 저장 장소 -->
		<section class="imgArea" id="imgArea_boots" value="boots"><h6>empty</h6>	
		<div id="MainShoseImg">
		<img alt="not valid" src="./shoesimage/p-31 black.jpg" class="ShoesImg" id="p-31 black">
		<div class="shoesname">p-31 black</div>
		</div>
		</section>
		
		<!-- 워커 저장 장소 -->
		<section class="imgArea" id="imgArea_walker" value="walker"><h6>empty</h6>	
		<div id="MainShoseImg">
		<img alt="not valid" src="./shoesimage/p-31 black.jpg" class="ShoesImg" id="p-31 black">
		<div class="shoesname">p-31 black</div>
		</div>
		</section>
		
		<!-- 기타 저장 장소 -->
		<section class="imgArea" id="imgArea_theothers" value="theothers"><h6>empty</h6>	
		<div id="MainShoseImg">
		<img alt="not valid" src="./shoesimage/p-31 black.jpg" class="ShoesImg" id="p-31 black">
		<div class="shoesname">p-31 black</div>
		</div>
		</section>
		<form action="sizecheckpage.jsp" id="img_shoes_send"></form>
		<img alt="not valid" src="./img/underbar.jpg" id="main_footer">
		
</body>
</html>
