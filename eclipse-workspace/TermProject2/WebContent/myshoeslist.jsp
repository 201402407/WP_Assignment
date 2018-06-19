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
  String ID = request.getParameter("ID");
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
        	BufferedReader br = new BufferedReader(new FileReader(fileList[j])); //버퍼리더객체생성
      		String str;
      		while((str=br.readLine()) != null) { // 파일을 전부 읽는다.
      			String temp = str.substring(0, str.indexOf(":")); // 비교할 신발과 사이즈 문자열.
      			if(temp == null)
      				continue;
      			if(temp.contains("Shoes")) {
      				String ShoesName = str.substring(str.indexOf(":") + 1);
      				out.println(ShoesName);
      				str = br.readLine();
      				String ShoesSize = str.substring(str.indexOf(":") + 1);
      				out.println(ShoesSize);
      			}
      		}
      		br.close();  
            break;
          }
        }
      }
    }
%>