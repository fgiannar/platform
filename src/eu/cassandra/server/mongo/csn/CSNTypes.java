package eu.cassandra.server.mongo.csn;

import java.util.HashMap;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class CSNTypes implements ServletContextListener{

	private static HashMap<String,String> csnTypesMap = new HashMap<String,String>();
	
	public static String getCsnTypes(String key){
		return csnTypesMap.get(key);
	}

	public void contextInitialized(ServletContextEvent arg0) {
		csnTypesMap.put(MongoEdges.InstallationType , "type");
		csnTypesMap.put(MongoEdges.PersonType , "personType");
		
//		csnTypesMap.put(MongoEdges.TotalConsumptionP , "sumP");
//		csnTypesMap.put(MongoEdges.TotalConsumptionQ , "sumQ");
//		
//		csnTypesMap.put(MongoEdges.AverageConsumptionP , "avgP");
//		csnTypesMap.put(MongoEdges.AverageConsumptionQ , "avgQ");
//
//		csnTypesMap.put(MongoEdges.MinConsumptionP , "minP");
//		csnTypesMap.put(MongoEdges.MinConsumptionQ , "minQ");
//
//		csnTypesMap.put(MongoEdges.MaxConsumptionP , "maxP");
//		csnTypesMap.put(MongoEdges.MaxConsumptionQ , "maxQ");
//		
//		//
//		csnTypesMap.put(MongoEdges.ConsumptionPerHourP , "hoursP");
//		csnTypesMap.put(MongoEdges.ConsumptionPerHourQ , "hoursQ");
//		
		

		//		//Sum
		//		graphType.equalsIgnoreCase(TotalConsumptionPerHourP) || graphType.equalsIgnoreCase(TotalConsumptionPerDayP)) {
		//			edge = decideIfToCreateEdge(edge, inst1, inst2, "sumP", graphType,minWeight); 
		//		graphType.equalsIgnoreCase(TotalConsumptionPerHourQ) || graphType.equalsIgnoreCase(TotalConsumptionPerDayQ)) {
		//			edge = decideIfToCreateEdge(edge, inst1, inst2, "sumQ", graphType,minWeight); 
		//		//avgP
		//		 graphType.equalsIgnoreCase(AverageConsumptionPerHourP) || graphType.equalsIgnoreCase(AverageConsumptionPerDayP)) {
		//			edge = decideIfToCreateEdge(edge, inst1, inst2, "avgP", graphType,minWeight); 
		//		graphType.equalsIgnoreCase(AverageConsumptionPerHourQ) || graphType.equalsIgnoreCase(AverageConsumptionPerDayQ)) {
		//			edge = decideIfToCreateEdge(edge, inst1, inst2, "avgQ", graphType,minWeight); 
		//		//Min
		//		graphType.equalsIgnoreCase(MinConsumptionPerHourP) || graphType.equalsIgnoreCase(MinConsumptionPerDayP) ) {
		//			edge = decideIfToCreateEdge(edge, inst1, inst2, "minP", graphType,minWeight); 
		//		graphType.equalsIgnoreCase(MinConsumptionPerHourQ) || graphType.equalsIgnoreCase(MinConsumptionPerDayQ)) {
		//			edge = decideIfToCreateEdge(edge, inst1, inst2, "minQ", graphType,minWeight); 
		//		//Max
		//		graphType.equalsIgnoreCase(MaxConsumptionPerHourP) || graphType.equalsIgnoreCase(MaxConsumptionPerDayP)) {
		//			edge = decideIfToCreateEdge(edge, inst1, inst2, "maxP", graphType,minWeight); 
		//		graphType.equalsIgnoreCase(MaxConsumptionPerHourQ) || graphType.equalsIgnoreCase(MaxConsumptionPerDayQ)) {
		//			edge = decideIfToCreateEdge(edge, inst1, inst2, "maxQ", graphType,minWeight); 

	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {

	}

}
