
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="java.io.*"%>
    <%@page import="java.util.*"%>
    <%@page import="java.net.URLEncoder"%>
	<%@page import="java.text.*" %>
	<%@page import="java.nio.charset.StandardCharsets"%>
	
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<%
		request.setCharacterEncoding("UTF-8");
		String type = request.getParameter("type");
		String day = request.getParameter("day");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String rank = request.getParameter("rank");
		String filePath = request.getSession().getServletContext().getRealPath("/" + day + "/");
		%>
			
	<%
	String print = "";
	File f;
	response.setContentType("text/html;charset=utf-8"); // 인코딩 타입설정.
	PrintWriter req;
	req = response.getWriter(); // response(응답 객체)에 Writer 추가.
 	
 	
	if(type.equals("add")) {
		File filepath = new File(filePath); //경로생성 
		if (!filepath.exists()) {
			filepath.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
		}
		String filePathAdd = filePath + "\\" + rank + ".txt"; //생성할 파일명을 전체경로에 결합
	//	File files[] = filepath.listFiles();
	//	File sortfiles[];
	/*	for(int count = 0; count == files.length; count++) {
		for(int i = 0; i < files.length; i++) { // 파일 우선순위대로 정렬.
			File file = files[i];
			if(file.isFile()) {
				BufferedReader br1 = new BufferedReader(new FileReader(file)); //버퍼리더객체생성
				String temp[] = br1.readLine().split("_");
				if(temp[3].equals(count + 1)) {
					sortfiles. 
				}
				
			}	
		} 
		}
		for(int j = 0; j < files.length; j++) { // 파일 우선순위대로 정렬.
			File file = files[i];
			if(file.isFile()) {
				BufferedReader br1 = new BufferedReader(new FileReader(file)); //버퍼리더객체생성
				String temp[] = br1.readLine().split("_");
				if(temp[3].equals(rank)) {
					String temp2 = temp[0] + "_" + temp[1] + "_" + temp[2] + 
				}
				
			}	
		} */
		try {
			f = new File(filePathAdd); // 파일 객체 생성
			if(f.exists()) { // 삽입.
				int a = Integer.parseInt(rank);
				int length = filepath.list().length;
				for(int i = length; i >= a; i--) {				
					File file1 = new File(filePath + "\\" + String.valueOf(i + 1) + ".txt");
					File file2 = new File(filePath + "\\" + String.valueOf(i) + ".txt");
					if(file2.isFile()) {
						BufferedReader br1 = new BufferedReader(new FileReader(file2)); //버퍼리더객체생성
						String temp = br1.readLine();
						file1.createNewFile();
						FileWriter fw = new FileWriter(file1); //파일쓰기객체생성
						fw.write(temp);
						fw.close();
						br1.close();
						if(file2.delete())
							continue;
					}	
					else {
						break;
					}
				}
			}
			f.createNewFile(); //파일 생성
			FileWriter fw = new FileWriter(f); //파일쓰기객체생성
			String data = day + "_" + title + "_" + content;
			fw.write(data); // 파일에 쓰기.
			fw.close(); // FileWriter 닫기 
			
			BufferedReader br2 = new BufferedReader(new FileReader(filePathAdd)); //버퍼리더객체생성
			while(true) {
				print = br2.readLine();
				if(print == null)
					break;
				req.println(print);
			}
			br2.close();
			
		}
		catch(IOException e) {
			e.printStackTrace();
		}
	}
	
	if(type.equals("delete")) { 
		String filePathDelete = filePath + rank + ".txt";
		f = new File(filePathDelete); //경로생성 
		File f2 = new File(filePath);
		if(f.exists()) {
			if(f.delete()) {
				int length = f2.list().length;
				int a = Integer.parseInt(rank);
				for(int i = a; i <= length; i++) {				
					File file1 = new File(filePath + String.valueOf(i) + ".txt");
					File file2 = new File(filePath + String.valueOf(i + 1) + ".txt");
					if(file2.isFile()) {
						req.println(filePathDelete + " , " + rank + " , " + i + " , " + length + "\n");
						BufferedReader br1 = new BufferedReader(new FileReader(file2)); //버퍼리더객체생성
						String temp = br1.readLine();
						file1.createNewFile();
						FileWriter fw = new FileWriter(file1); //파일쓰기객체생성
						fw.write(temp);
						fw.close();
						br1.close();
						if(file2.delete())
							continue;
					}	
					else {
						break;
					}
				}
				req.println(filePathDelete + " , " + rank + " , " + a + " , " + length + "\n");
				print = "success";
				
			}
			else {
				req.println(filePathDelete + " , " + rank);
				print = "fails";
			}
		}
		else {
			req.println(filePathDelete + " , " + rank);
			print = "not exists";
		}
	req.println(print);
	}
	
	if(type.equals("check_delete")) {
		String filePathDelete = filePath + "\\" + rank + ".txt";
		f = new File(filePathDelete); //경로생성 
		if(f.exists()) {
			if(f.delete()) {
				print = "success";
			}
			else {
				print = "fail";
			}
		}
		else {
			print = "not exist";
		}
	req.println(print);
	}
	
	if(type.equals("sort")) {
		File file;
		String sortDay[] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};
		
		for(int x = 0; x < sortDay.length; x++) {
			String sortPath = request.getSession().getServletContext().getRealPath("/" + sortDay[x] + "/");
			file = new File(sortPath);
			if(file.exists()) { // 폴더가 존재하면
			if(file.list().length != 0) { // 안에 파일이 존재하면
				File fileList[] = file.listFiles();
				int fileListtemp[] = new int[fileList.length];
				for(int i = 0; i < fileList.length; i++) {
					String lastfilename = fileList[i].getName();
					lastfilename = lastfilename.substring(0, lastfilename.length() - 4);
					if(i == 0) {
						if(lastfilename.equals("1")) {
							fileListtemp[0] = 2; // 이름
							continue;
						}
						File file1 = new File(sortPath + "\\" + 1 + ".txt");
						File file2 = fileList[0];
						if(!file1.isFile()) {
							BufferedReader br1 = new BufferedReader(new FileReader(file2)); //버퍼리더객체생성
							String temp = br1.readLine();
							file1.createNewFile();
							FileWriter fw = new FileWriter(file1); //파일쓰기객체생성
							fw.write(temp);
							fw.close();
							br1.close();
							if(file2.delete()) {
								fileListtemp[0] = 2; // 이름 
								continue;
							}
						}	
						else {
							break;
						}
					}
					else {
						File file1 = new File(sortPath + "\\" + String.valueOf(fileListtemp[i-1]) + ".txt");
						File file2 = fileList[i];
						if(!file1.isFile()) {
							BufferedReader br1 = new BufferedReader(new FileReader(file2)); //버퍼리더객체생성
							String temp = br1.readLine();
							file1.createNewFile();
							FileWriter fw = new FileWriter(file1); //파일쓰기객체생성
							fw.write(temp);
							fw.close();
							br1.close();
							if(file2.delete()){
								fileListtemp[i] = Integer.parseInt(file1.getName().substring(0, file1.getName().length() - 4)) + 1; // 이름 
								continue;
							}
						}	
						else {
							break;
						}
					}
				}
			}
			}
		}
	}
	
	// 최종 수정시간 추가.
	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd ");
	String today = formatter.format(new Date());	
	Date date = new Date();
	String getTodayLabel[] = {"일", "월", "화", "수", "목", "금", "토"};
	String TodayLabel = getTodayLabel[date.getDay()];
	today = today + TodayLabel + " ";
	SimpleDateFormat formatter2 = new SimpleDateFormat("HH:mm");
	String time = formatter2.format(new Date());
	today = today + time;
	req.println(today);
	response.flushBuffer(); // 전송.
	
	// 초기화.
	print = "";
	type = "";
	day = "";
	title = "";
	content = "";
	rank = "";
	filePath = "";
	time = "";
	%>
</body>
</html>