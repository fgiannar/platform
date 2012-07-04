package cassandra.mongo.test;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import cassandra.mongo.util.PrettyJSONPrinter;

import com.mongodb.BasicDBList;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;

public class TestMongo {

	private static final String PROJECTS = "projects";
	private static final String SCENARIOS = "scenarios";
	private static final String INSTALLATIONS = "installations";
	private static final String ACTIVITIES = "activities";
	private static final String ACT_MODELS = "act_models";
	private static final String APPLIANCES = "appliances";

	public static void main(String args[]) {
		new TestMongo();
	}

	public TestMongo() {
		testCreate();
		getData("http://localhost:8080/cassandra/api/prj/","4ff410c8e4b0c338f131de9e",PROJECTS);
	}

	/**
	 * 
	 */
	public void testCreate() {
		System.out.println("Creating Projects");
		httpConnection("http://localhost:8080/cassandra/api/prj","POST","tests/project2.json",null,null);
		String res = httpConnection("http://localhost:8080/cassandra/api/prj","POST","tests/project.json",null,null);
		DBObject obj = (DBObject)JSON.parse(res); 
		String id = ((DBObject)obj.get("objectCreated")).get("_id").toString();

		System.out.println("\n\nCreating Scenarios");
		httpConnection("http://localhost:8080/cassandra/api/scn","POST","tests/scenario.json","project_id",id);
		res = httpConnection("http://localhost:8080/cassandra/api/scn","POST","tests/scenario2.json","project_id",id);
		obj = (DBObject)JSON.parse(res);
		id = ((DBObject)obj.get("objectCreated")).get("_id").toString();

		System.out.println("\n\nCreating Parameters");
		httpConnection("http://localhost:8080/cassandra/api/smp","POST","tests/simparam.json","scn_id",id);
		httpConnection("http://localhost:8080/cassandra/api/smp","POST","tests/simparam2.json","scn_id",id);

		System.out.println("\n\nCreating Installations");
		httpConnection("http://localhost:8080/cassandra/api/inst","POST","tests/installation.json","scenario_id",id);
		res = httpConnection("http://localhost:8080/cassandra/api/inst","POST","tests/installation2.json","scenario_id",id);
		obj = (DBObject)JSON.parse(res);
		id = ((DBObject)obj.get("objectCreated")).get("_id").toString();

		System.out.println("\n\nCreating Appliances");
		httpConnection("http://localhost:8080/cassandra/api/app","POST","tests/appliance.json","inst_id",id);
		httpConnection("http://localhost:8080/cassandra/api/app","POST","tests/appliance2.json","inst_id",id);

		System.out.println("\n\nCreating Activities");
		httpConnection("http://localhost:8080/cassandra/api/act","POST","tests/activity.json","inst_id",id);
		res = httpConnection("http://localhost:8080/cassandra/api/act","POST","tests/activity2.json","inst_id",id);
		obj = (DBObject)JSON.parse(res);
		id = ((DBObject)obj.get("objectCreated")).get("_id").toString();

		System.out.println("\n\nCreating Activity Models");
		httpConnection("http://localhost:8080/cassandra/api/actmod","POST","tests/activitymodel.json","act_id",id);
		res = httpConnection("http://localhost:8080/cassandra/api/actmod","POST","tests/activitymodel2.json","act_id",id);
		obj = (DBObject)JSON.parse(res);
		id = ((DBObject)obj.get("objectCreated")).get("_id").toString();
	}

	/**
	 * 
	 * @param url
	 * @param id
	 * @param type
	 * @return
	 */
	private BasicDBList getData(String url, String id, String type) {
		String res = httpConnection(url +id,"GET");
		DBObject obj = (DBObject)JSON.parse(res);
		BasicDBList data = (BasicDBList)obj.get("data");
		for(int i=0;i<data.size();i++) {
			System.out.println(PrettyJSONPrinter.prettyPrint(data.get(i).toString()) + "\n");
			String intID = ((DBObject)data.get(i)).get("_id").toString();

			if(type.equalsIgnoreCase(PROJECTS))
				getData("http://localhost:8080/cassandra/api/scn?prj_id=", intID,SCENARIOS);

			if(type.equalsIgnoreCase(SCENARIOS))
				getData("http://localhost:8080/cassandra/api/inst?scn_id=", intID,INSTALLATIONS);

			if(type.equalsIgnoreCase(SCENARIOS))
				getData("http://localhost:8080/cassandra/api/smp?scn_id=", intID,"");

			if(type.equalsIgnoreCase(INSTALLATIONS))
				getData("http://localhost:8080/cassandra/api/act?inst_id=", intID,ACTIVITIES);

			if(type.equalsIgnoreCase(INSTALLATIONS))
				getData("http://localhost:8080/cassandra/api/app?inst_id=", intID,APPLIANCES);

			if(type.equalsIgnoreCase(ACTIVITIES))
				getData("http://localhost:8080/cassandra/api/actmod?act_id=", intID,ACT_MODELS);
		}
		return data;
	}


	/**
	 * 
	 * @param url
	 * @param method
	 * @return
	 */
	private String httpConnection(String url,String method) {
		return httpConnection(url,method,null,null,null);
	}

	/**
	 * 
	 * @param url
	 * @param method
	 * @param fileToSend
	 * @return
	 */
	private String httpConnection(String url,String method, String fileToSend, 
			String keyToReplace, String valueToReplace) {
		System.out.println(method + " on: " + url);
		String response = "";
		HttpURLConnection httpCon = null;
		try {
			httpCon = (HttpURLConnection) new URL(url).openConnection();
			httpCon.setDoOutput(true);
			if(fileToSend != null) {
				httpCon.setDoInput(true);
				httpCon.setRequestMethod(method);
				String urlParameters = readFile(fileToSend,keyToReplace, valueToReplace); 
				httpCon.setRequestProperty("content-type", "application/json");
				httpCon.setRequestProperty("Content-Length", "" +  Integer.toString(urlParameters.getBytes().length));
				httpCon.connect();
				DataOutputStream wr = new DataOutputStream (httpCon.getOutputStream ());
				wr.writeBytes (urlParameters);
				wr.flush ();
				wr.close ();
			}
			else {
				httpCon.setRequestMethod(method);
			}
			response = convertStreamToString(httpCon.getInputStream());
			//System.out.println(response);
		}catch(Exception e) {
			e.printStackTrace();
		}
		finally{
			if(httpCon != null)
				httpCon.disconnect();
		}
		return response;
	}

	/**
	 * 
	 * @param fileName
	 * @return
	 */
	private String readFile(String fileName, String keyToReplace, String valueToReplace) {
		StringBuilder sb = new StringBuilder();
		String strLine = null;
		try{
			FileInputStream fstream = new FileInputStream(fileName);
			DataInputStream in = new DataInputStream(fstream);
			BufferedReader br = new BufferedReader(new InputStreamReader(in));

			while ((strLine = br.readLine()) != null)   {
				if(keyToReplace != null && valueToReplace != null) {
					strLine = strLine.trim();
					if(strLine.startsWith(keyToReplace)) {
						String comma = "";
						if(strLine.endsWith(","))
							comma = ",";
						strLine = keyToReplace + " : \"" + valueToReplace + "\"" + comma;
					}
				}
				sb.append(strLine);
			}
			in.close();
		}catch (Exception e){
			e.printStackTrace();
		}
		System.out.println("\n\n" + sb + "\n\n");
		return sb.toString();
	}

	/**
	 * 
	 * @param is
	 * @return
	 */
	private String convertStreamToString(java.io.InputStream is) {
		try {
			return new java.util.Scanner(is).useDelimiter("\\A").next();
		} catch (java.util.NoSuchElementException e) {
			return "";
		}
	}

}
