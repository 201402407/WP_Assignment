<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="java.io.*"%>
    <%@page import="java.util.*"%>
    <%@page import="java.net.URLEncoder"%>
	<%@page import="java.text.*" %>
	<%@page import="java.nio.charset.StandardCharsets"%>
	<%!
	public static List sortByValue(final Map map) {
        List<String> list = new ArrayList<>();
        list.addAll(map.keySet());
        Collections.sort(list,new Comparator() {
            public int compare(Object o1,Object o2) {
                Object v1 = map.get(o1);
                Object v2 = map.get(o2);
                return ((Comparable) v2).compareTo(v1);
            }
        });
        //Collections.reverse(list); // 주석시 내림차순.
        return list;
    }
%>
<%
  request.setCharacterEncoding("UTF-8");
  String ID = request.getParameter("ID");
  String Shoes1 = request.getParameter("shoes1");
  String Shoes1_size = request.getParameter("shoes1_size");
  String Shoes2 = request.getParameter("shoes2");
  String Shoes2_size = request.getParameter("shoes2_size");
  String LoginFilePath = request.getSession().getServletContext().getRealPath("/member/");
  String ShoesFilePath = request.getSession().getServletContext().getRealPath("/sizelist/");
  String ShoesCartPath = request.getSession().getServletContext().getRealPath("/membercart/");
  String msg = "";
  
	File MemberList = new File(LoginFilePath); //경로생성
	if (!MemberList.exists()) {
    MemberList.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
  }
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
	}
	
	// 신발 1에 대한 정보 저장.
    String Shoes1FilePath = ShoesFilePath + "\\" + Shoes1;
   	File Shoes1List = new File(Shoes1FilePath);
	if (!Shoes1List.exists()) {
	    Shoes1List.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
	}
 	File Shoes1File = new File(Shoes1FilePath + "\\" + Shoes1_size); // 파일 객체 생성
	if(!Shoes1File.exists()) { // 해당 사이즈에 대해 비교할 신발 정보가 하나도 없는 경우.
		Shoes1File.createNewFile(); //파일 생성
		FileWriter fw = new FileWriter(Shoes1File); //파일쓰기객체생성
		PrintWriter pw = new PrintWriter(fw);
		pw.println(Shoes2 + "_" + Shoes2_size + ":1"); // 신발 2에 대한 정보 입력.
		pw.flush(); // 파일에 기록. 여기까지가 입력 첫 줄.
		pw.close(); // FileWriter 닫기 
	}
	else { // 해당 사이즈에 대해 비교할 신발 정보가 하나라도 있는 경우.
		BufferedReader br = new BufferedReader(new FileReader(Shoes1File)); //버퍼리더객체생성
		Map<String,Integer> map = new HashMap<String,Integer>(); // 오름차순 정렬을 위한 Map생성.
		String str;
		boolean exist_flag = false; // 같은 신발과 신발 사이즈가 존재하는지에 대한 플래그.
		while((str=br.readLine()) != null) { // 파일을 전부 읽는다.
			String temp = str.substring(0, str.indexOf(":")); // 비교할 신발과 사이즈 문자열.
			int count = Integer.parseInt(str.substring(str.indexOf(":") + 1)); // 해당 신발의 카운트수.
			if(temp.equals(Shoes2 + "_" + Shoes2_size)) {
			map.put(temp, count+1);
			exist_flag = true;
			}
			else{
				map.put(temp, count);
			}
		}
		br.close();
		
		if(exist_flag) { // 신발 2의 정보가 이미 존재해서 카운트만 1을 더한 경우.
        Iterator it = sortByValue(map).iterator();
        PrintWriter pw = new PrintWriter(new FileWriter(Shoes1File));
        while(it.hasNext()) {
            String temp = (String)it.next();
            pw.println(temp + ":" + map.get(temp));
        }
        pw.close();
	}
		else{ // 해당 신발이 처음 있는거라면
			PrintWriter pw = new PrintWriter(new FileWriter(Shoes1File, true));
			pw.println(Shoes2 + "_" + Shoes2_size + ":1"); // 신발 2에 대한 정보 입력.
			pw.close();
		}
 	}
    
 	// 신발 2에 대한 정보 저장.
	String Shoes2FilePath = ShoesFilePath + "\\" + Shoes2;
   	File Shoes2List = new File(Shoes2FilePath);
	if (!Shoes2List.exists()) {
	    Shoes2List.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
	}
 	File Shoes2File = new File(Shoes2FilePath + "\\" + Shoes2_size); // 파일 객체 생성
	if(!Shoes2File.exists()) { // 해당 사이즈에 대해 비교할 신발 정보가 하나도 없는 경우.
		Shoes2File.createNewFile(); //파일 생성
		FileWriter fw = new FileWriter(Shoes2File); //파일쓰기객체생성
		PrintWriter pw = new PrintWriter(fw);
		pw.println(Shoes1 + "_" + Shoes1_size + ":1"); // 신발 2에 대한 정보 입력.
		pw.flush(); // 파일에 기록. 여기까지가 입력 첫 줄.
		pw.close(); // FileWriter 닫기 
	}
	else { // 해당 사이즈에 대해 비교할 신발 정보가 하나라도 있는 경우.
		BufferedReader br = new BufferedReader(new FileReader(Shoes2File)); //버퍼리더객체생성
		Map<String,Integer> map = new HashMap<String,Integer>(); // 오름차순 정렬을 위한 Map생성.
		String str;
		boolean exist_flag = false; // 같은 신발과 신발 사이즈가 존재하는지에 대한 플래그.
		while((str=br.readLine()) != null) { // 파일을 전부 읽는다.
			String temp = str.substring(0, str.indexOf(":")); // 비교할 신발과 사이즈 문자열.
			int count = Integer.parseInt(str.substring(str.indexOf(":") + 1)); // 해당 신발의 카운트수.
			if(temp.equals(Shoes1 + "_" + Shoes1_size)) {
			map.put(temp, count+1);
			exist_flag = true;
			}
			else{
				map.put(temp, count);
			}
		}
		br.close();
		
		if(exist_flag) { // 신발 2의 정보가 이미 존재해서 카운트만 1을 더한 경우.
        Iterator it = sortByValue(map).iterator();
        PrintWriter pw = new PrintWriter(new FileWriter(Shoes2File));
        while(it.hasNext()) {
            String temp = (String)it.next();
            pw.println(temp + ":" + map.get(temp));
        }
        pw.close();
	}
		else{ // 해당 신발이 처음 있는거라면
			PrintWriter pw = new PrintWriter(new FileWriter(Shoes2File, true));
			pw.println(Shoes1 + "_" + Shoes1_size + ":1"); // 신발 2에 대한 정보 입력.
			pw.close();
		}
 	}
 	
	/*	// 찜 목록 파일 추가.
 	File MemberCartList = new File(ShoesCartPath); //경로생성
	if (!MemberCartList.exists()) {
    MemberCartList.mkdirs(); //상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성.
  }
	File MemberCart = new File(ShoesCartPath + "\\" + ID); // 파일 객체 생성
	if(!MemberCart.exists()) { // 삽입.
		MemberCart.createNewFile(); //파일 생성
		PrintWriter pw = new PrintWriter(new FileWriter(MemberCart));
		pw.println("Shoes:" + Shoes1); // 파일에 현재 ID의 주인이 정한 신발 1개 쓰기.
		pw.println("Shoes:" + Shoes1_size); // 파일에 현재 ID의 주인이 정한 신발 1개 쓰기.
		pw.println("Shoes2:" + Shoes2); // 파일에 현재 ID의 주인이 정한 신발 1개 쓰기.
		pw.println("Shoes2 size:" + Shoes2_size); // 파일에 현재 ID의 주인이 정한 신발 1개 쓰기.
		pw.flush(); // 파일에 기록. 여기까지가 입력 첫 줄.
		pw.close(); // FileWriter 닫기 
	} */
    msg = "mainpage.jsp?msg=1"; // mainpage 출력을 위한 뒤의 값 설정.
    session.setAttribute("sessionID", ID); // session에 데이터 저장.
    out.println(msg);
          
    
%>