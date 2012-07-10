package eu.cassandra.server.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import eu.cassandra.server.mongo.MongoConsumptionModels;
import eu.cassandra.server.mongo.util.PrettyJSONPrinter;

@Path("consmod/{consmod_id: [a-z0-9][a-z0-9]*}")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ConsumptionModel {

	/**
	 * 
	 * @param consmod_id
	 * @return
	 */
	@GET
	public String getConsumptionModel(@PathParam("consmod_id") String consmod_id) {
		return PrettyJSONPrinter.prettyPrint(new MongoConsumptionModels().getConsumptionModel(consmod_id));
	}

	/**
	 * 
	 * @param consmod_id
	 * @param message
	 * @return
	 */
	@PUT
	public String updateConsumptionModel(@PathParam("consmod_id") String consmod_id, String message) {
		return PrettyJSONPrinter.prettyPrint(new MongoConsumptionModels().updateConsumptionModel(consmod_id,message));
	}

	/**
	 * 
	 * @param consmod_id
	 * @return
	 */
	@DELETE
	public String deleteConsumptionModel(@PathParam("consmod_id") String consmod_id) {
		// TODO remove references
		return PrettyJSONPrinter.prettyPrint(new MongoConsumptionModels().deleteConsumptionModel(consmod_id));
	}

}