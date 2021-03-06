<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    <%@page import="java.io.*"%>
    <%@page import="java.util.*"%>
    <%@page import="java.net.URLEncoder"%>
	<%@page import="java.text.*" %>
	<%@page import="java.nio.charset.StandardCharsets"%>
	<%@page buffer="none" %>
<%
  request.setCharacterEncoding("UTF-8");
  String ID = request.getParameter("Duplication_CheckingID");
  String LoginFilePath = request.getSession().getServletContext().getRealPath("/member/");
  File MemberList = new File(LoginFilePath); //경로생성
  if (!MemberList.exists()) {
    MemberList.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
  }
    String msg = "";
    if (MemberList.listFiles().length != 0) { // 폴더 안에 파일이 존재하면
      File[] fileList = MemberList.listFiles();
      for (int j = 0; j < fileList.length; j++) {
        if(fileList[j].isFile()) { // 혹시몰라 파일 존재확인.
          String MemberName = fileList[j].getName();          
          if(MemberName.equals(ID)) { // 존재하면 로그인.   
            msg = "duplication"; // mainpage 출력을 위한 뒤의 값 설정.
            break;
          }
          else{
            msg = "nothing";
            continue;
          }
        }
      }
    }
    else {
      msg = "nothing";
    }
    out.println(msg);
%>