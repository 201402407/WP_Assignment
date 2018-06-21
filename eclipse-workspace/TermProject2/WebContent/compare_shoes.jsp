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
  String ShoesName = request.getParameter("ShoesName");
  String MemberFilePath = request.getSession().getServletContext().getRealPath("/member/");
  String ShoesFilePath = request.getSession().getServletContext().getRealPath("/sizelist/");
  String Shoes1Name = "";
  String Shoes1Size = "";
  String Shoes2Name = "";
  String Shoes2Size = "";
  
  // 사용자 신발 데이터 불러오기.
  File MemberList = new File(MemberFilePath); //경로생성
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
	      			if(temp.contains("Shoes1")) { // 첫 번째 신발 데이터 저장.
	      				Shoes1Name = str.substring(str.indexOf(":") + 1);
	      				str = br.readLine();
	      				Shoes1Size = str.substring(str.indexOf(":") + 1);
	      				continue;
	      			}
	      			if(temp.contains("Shoes2")) { // 두 번째 신발 데이터 저장.
	      				Shoes2Name = str.substring(str.indexOf(":") + 1);
	      				str = br.readLine();
	      				Shoes2Size = str.substring(str.indexOf(":") + 1);
	      				continue;
	      			}
	      		}
	      		br.close();  
	            break;
	          }
	        }
	      } 
    }
	 // out.println(Shoes1Name + "," + Shoes1Size + "," + Shoes2Name + "," + Shoes2Size); 
	// 사용자의 신발 정보에서 원하는 사이즈를 찾을 신발 정보 찾기.
	Map<String,Integer> map = new HashMap<String,Integer>(); // 오름차순 정렬을 위한 Map생성.
	// 1번째 신발.
	String Shoes1FilePath = ShoesFilePath + "\\" + Shoes1Name + "\\" + Shoes1Size;
	File Shoes1File = new File(Shoes1FilePath);
	BufferedReader shoes1br = new BufferedReader(new FileReader(Shoes1File)); //버퍼리더객체생성
	String str;
	while((str=shoes1br.readLine()) != null) { // 파일을 전부 읽는다.
			
			String temp = str.substring(0, str.indexOf(":")); // 비교할 신발과 사이즈 문자열.
			int count = Integer.parseInt(str.substring(str.indexOf(":") + 1)); // 해당 신발의 카운트수.
			
			if(temp.contains(ShoesName)) {
				
			//out.println(temp + ", "+ count);
			map.put(temp, count);
			//exist_flag = true;
			}
		}
	shoes1br.close();
	// 2번째 신발.
	String Shoes2FilePath = ShoesFilePath + "\\" + Shoes2Name + "\\" + Shoes2Size;
	File Shoes2File = new File(Shoes2FilePath);
	BufferedReader shoes2br = new BufferedReader(new FileReader(Shoes2File)); //버퍼리더객체생성
	str = ""; // String 임시변수 초기화.
	while((str=shoes2br.readLine()) != null) { // 파일을 전부 읽는다.
			String temp = str.substring(0, str.indexOf(":")); // 비교할 신발과 사이즈 문자열.
			int count = Integer.parseInt(str.substring(str.indexOf(":") + 1)); // 해당 신발의 카운트수.
			if(temp.contains(ShoesName)) {
				//out.println(temp);
				Iterator<String> it = map.keySet().iterator();
				if(!it.hasNext()) {
					map.put(temp, count);
					continue;
				}
			    while(it.hasNext()) {
			    	//out.println("ASD");
			        String temp2 = it.next();
			        if(temp2.equals(temp)) {
			        	 count = map.get(temp) + count;
			        	 map.remove(temp);
			        	 map.put(temp, count);
			        	 break;
			         }
			         else{
			        	 if(!it.hasNext()) {
			        		 map.put(temp, count);
				         }	 
			         }   
			     }
			}
		}
	shoes2br.close();
	 
	// 가장 count(순위)가 높은 신발 데이터 전송.
	if(map.size() == 0) {
		out.println(Shoes1Size);
	}
	else{
		Iterator<String> it = sortByValue(map).iterator();
		if(it.hasNext()) {
			String temp = (String)it.next();
			out.println(temp.split("_")[1]);
		}
	}
     //String temp = (String)its.next();
%>