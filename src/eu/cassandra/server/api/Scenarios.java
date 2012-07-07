package eu.cassandra.server.api;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import eu.cassandra.server.mongo.MongoScenarios;
import eu.cassandra.server.mongo.util.PrettyJSONPrinter;

@Path("scn")
@Produces(MediaType.APPLICATION_JSON)
public class Scenarios {

	/**
	 * 
	 * Gets the scenarios under a project id
	 * @param message contains the project_id to search the related scenarios
	 * @return
	 */
	@GET
	public String getScenarios(@QueryParam("prj_id") String prj_id) {
		return PrettyJSONPrinter.prettyPrint(new MongoScenarios().getScenarios(prj_id));
	}

	/**
	 * 
	 * Create a scenario
	 */
	@POST
	public String createScenario(String message) {
		return PrettyJSONPrinter.prettyPrint(new MongoScenarios().createScenario(message));
	}

}
