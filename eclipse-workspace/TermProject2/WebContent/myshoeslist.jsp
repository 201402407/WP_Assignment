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
  File MemberList = new File(LoginFilePath); //��λ���
  if (!MemberList.exists()) {
    MemberList.mkdirs(); //���� ���丮�� �������� ������ �������丮���� ����.
  }
    String msg = "";
    if (MemberList.listFiles().length != 0) { // ���� �ȿ� ������ �����ϸ�
      File[] fileList = MemberList.listFiles();
      for (int j = 0; j < fileList.length; j++) {
        if(fileList[j].isFile()) { // Ȥ�ø��� ���� ����Ȯ��.
          String MemberName = fileList[j].getName();          
          if(MemberName.equals(ID)) { // �����ϸ� �α���.   
        	BufferedReader br = new BufferedReader(new FileReader(fileList[j])); //���۸�����ü����
      		String str;
      		while((str=br.readLine()) != null) { // ������ ���� �д´�.
      			String temp = str.substring(0, str.indexOf(":")); // ���� �Ź߰� ������ ���ڿ�.
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