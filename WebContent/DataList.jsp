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
	
		
		out.println(day);
		out.println(title);
		out.println(content);
		out.println(rank);
	//	JSONObject jsonObject = JSONObject.fromObject(jsonStr);
	//	Map<String, Object> result = (Map<String, Object>)JSONObject.toBean(jsonObject, java.util.HashMap.class);
		while(names.hasMoreElements()) {
		
			String paramName = (String)names.nextElement();
		//	out.print(paramName);
			String paramValue = request.getParameter(paramName);
		//	out.print(paramValue);
		}
		String filePath;
		File filepath;
		File f;
		
		%>		
	<!-- 	JSONObject JsonArray = new JSONArray(jsonString); -->
	
</body>
</html>