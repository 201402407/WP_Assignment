<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="java.io.*"%>
    <%@page import="java.util.*"%>
    <%@page import="java.net.URLEncoder"%>
	<%@page errorPage="error.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<%
		request.setCharacterEncoding("UTF-8");
		Enumeration<String> names = request.getParameterNames();
		String day = request.getParameter("day");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String rank = request.getParameter("rank");
		
		String filePath;
		File filepath;
		File f;
		
		switch(day) {
		case "Monday":
			filePath = request.getSession().getServletContext().getRealPath("/Monday/");
			filepath = new File(filePath); //경로생성
			if (!filepath.exists()) {
				filepath.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
			}
			filePath = filePath + "\\" + rank + ".txt"; //생성할 파일명을 전체경로에 결합
			try {
				f = new File(filePath); // 파일 객체 생성
				f.createNewFile(); //파일 생성
				FileWriter fw = new FileWriter(f); //파일쓰기객체생성
				String data = day + "_" + title + "_" + content + "_" + rank;
				fw.write(data); // 파일에 쓰기.
				fw.close(); // FileWriter 닫기 
				out.println("<script>alert('Monday " + data + "');</script>");
				
				FileReader fr = new FileReader(filePath); //파일읽기객체생성
				BufferedReader br = new BufferedReader(fr); //버퍼리더객체생성

				String line = null;  
				while((line=br.readLine()) != null) { //라인단위 읽기
			    out.println(line + "<br>"); 
				}
				
			}
			catch(IOException e) {
				e.printStackTrace();
			}
			break;
		case "Tuesday":
			filePath = request.getSession().getServletContext().getRealPath("/Tuesday/");
			filepath = new File(filePath); //경로생성
			if (!filepath.exists()) {
				filepath.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
			}
			filePath = filePath + "\\" + rank + ".txt"; //생성할 파일명을 전체경로에 결합
			try {
				f = new File(filePath); // 파일 객체 생성
				f.createNewFile(); //파일 생성
				FileWriter fw = new FileWriter(f); //파일쓰기객체생성
				String data = day + "_" + title + "_" + content + "_" + rank;
				fw.write(data); // 파일에 쓰기.
				fw.close(); // FileWriter 닫기
	
			}
			catch(IOException e) {
				e.printStackTrace();
			}
			break;
		case "Wednesday":
			filePath = request.getSession().getServletContext().getRealPath("/Wednesday/");
			filepath = new File(filePath); //경로생성
			if (!filepath.exists()) {
				filepath.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
			}
			filePath = filePath + "\\" + rank + ".txt"; //생성할 파일명을 전체경로에 결합
			try {
				f = new File(filePath); // 파일 객체 생성
				f.createNewFile(); //파일 생성
				FileWriter fw = new FileWriter(f); //파일쓰기객체생성
				String data = day + "_" + title + "_" + content + "_" + rank;
				fw.write(data); // 파일에 쓰기.
				fw.close(); // FileWriter 닫기
				
			}
			catch(IOException e) {
				e.printStackTrace();
			}
			break;
		case "Thursday":
			filePath = request.getSession().getServletContext().getRealPath("/Thursday/");
			filepath = new File(filePath); //경로생성
			if (!filepath.exists()) {
				filepath.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
			}
			filePath = filePath + "\\" + rank + ".txt"; //생성할 파일명을 전체경로에 결합
			try {
				f = new File(filePath); // 파일 객체 생성
				f.createNewFile(); //파일 생성
				FileWriter fw = new FileWriter(f); //파일쓰기객체생성
				String data = day + "_" + title + "_" + content + "_" + rank;
				fw.write(data); // 파일에 쓰기.
				fw.close(); // FileWriter 닫기
				
			}
			catch(IOException e) {
				e.printStackTrace();
			}
			break;
		case "Friday":
			filePath = request.getSession().getServletContext().getRealPath("/Friday/");
			filepath = new File(filePath); //경로생성
			if (!filepath.exists()) {
				filepath.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
			}
			filePath = filePath + "\\" + rank + ".txt"; //생성할 파일명을 전체경로에 결합
			try {
				f = new File(filePath); // 파일 객체 생성
				f.createNewFile(); //파일 생성
				FileWriter fw = new FileWriter(f); //파일쓰기객체생성
				String data = day + "_" + title + "_" + content + "_" + rank;
				fw.write(data); // 파일에 쓰기.
				fw.close(); // FileWriter 닫기
				
			}
			catch(IOException e) {
				e.printStackTrace();
			}
			break;
			default:
				out.println("<script>alert('Error!');</script>");
				break;
				
		}
		PrintWriter req;
		try{
			req = response.getWriter();
			String dat = day + "_" + title + "_" + content + "_" + rank;
			req.print(dat);
			response.flushBuffer();
		}
		catch(IOException e){
			e.printStackTrace();
		}
		%>		
	
</body>
</html>