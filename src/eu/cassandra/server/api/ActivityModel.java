/*   
   Copyright 2011-2013 The Cassandra Consortium (cassandra-fp7.eu)


   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
package eu.cassandra.server.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import eu.cassandra.server.mongo.MongoActivityModels;
import eu.cassandra.server.mongo.util.PrettyJSONPrinter;
import eu.cassandra.sim.utilities.Utils;

@Path("actmod/{actmod_id: [a-z0-9][a-z0-9]*}")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ActivityModel {

	/**
	 * Returns the scenario data based on the scenario id
	 * @param scn_id
	 * @return
	 */
	@GET
	public Response getActivityModel(@PathParam("actmod_id") String actmod_id,
			@Context HttpHeaders httpHeaders) {
		return Utils.returnResponse(PrettyJSONPrinter.prettyPrint(new MongoActivityModels().getActivityModel(httpHeaders,actmod_id)));
	}

	/**
	 * Scenario update
	 * @param scn_id
	 * @return
	 */
	@PUT
	public Response updateActivityModel(@PathParam("actmod_id") String actmod_id, String message) {
		return Utils.returnResponse(PrettyJSONPrinter.prettyPrint(new MongoActivityModels().updateActivityModel(actmod_id,message)));
	}

	/**
	 * Delete a scenario
	 */
	@DELETE
	public Response deleteActivityModel(@PathParam("actmod_id") String actmod_id) {
		return Utils.returnResponse(PrettyJSONPrinter.prettyPrint(new MongoActivityModels().deleteActivityModel(actmod_id)));
	}

}
