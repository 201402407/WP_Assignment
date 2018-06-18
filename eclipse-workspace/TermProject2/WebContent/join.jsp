<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="java.io.*"%>
    <%@page import="java.util.*"%>
    <%@page import="java.net.URLEncoder"%>
	<%@page import="java.text.*" %>
	<%@page import="java.nio.charset.StandardCharsets"%>
<%
  request.setCharacterEncoding("UTF-8");
  String ID = request.getParameter("ID");
  String Shoes1 = request.getParameter("shoes1");
  String Shoes1_size = request.getParameter("shoes1_size");
  String Shoes2 = request.getParameter("shoes2");
  String Shoes2_size = request.getParameter("shoes2_size");
  String LoginFilePath = request.getSession().getServletContext().getRealPath("/member/");
  File MemberList = new File(LoginFilePath); //경로생성
  if (!MemberList.exists()) {
    MemberList.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
  }
    String msg = "";
    	 File f = new File(LoginFilePath + "\\" + ID); // 파일 객체 생성
			if(!f.exists()) { // 삽입.
				f.createNewFile(); //파일 생성
				FileWriter fw = new FileWriter(f); //파일쓰기객체생성
				PrintWriter pw = new PrintWriter(fw);
				pw.println("ID:" + ID); // 파일에 ID쓰기.
				pw.println("Shoes1:" + Shoes1); // 파일에 현재 ID의 주인이 정한 신발 1개 쓰기.
				pw.println("Shoes1 size:" + Shoes1_size); // 파일에 현재 ID의 주인이 정한 신발 1개 쓰기.
				pw.println("Shoes2:" + Shoes2); // 파일에 현재 ID의 주인이 정한 신발 1개 쓰기.
				pw.println("Shoes2 size:" + Shoes2_size); // 파일에 현재 ID의 주인이 정한 신발 1개 쓰기.
				pw.flush(); // 파일에 기록. 여기까지가 입력 첫 줄.
				pw.close(); // FileWriter 닫기 
					
            msg = "mainpage.jsp?msg=1"; // mainpage 출력을 위한 뒤의 값 설정.
            session.setAttribute("sessionID", ID); // session에 데이터 저장.
            out.println(msg);
          }
    
%>