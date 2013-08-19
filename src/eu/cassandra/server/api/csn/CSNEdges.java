package eu.cassandra.server.api.csn;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import eu.cassandra.server.mongo.csn.MongoGraphs;
import eu.cassandra.server.mongo.util.PrettyJSONPrinter;
import eu.cassandra.sim.utilities.Utils;

@Path("csnedges")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CSNEdges {

	/**
	 * curl -k -i  'https://localhost:8443/cassandra/api/csnedges?graph_id=51d13998e4b0ebea2a3e81f6&limt=20&skip=20&filter=\{x:234.232\}'
	 * curl -k -i  'https://localhost:8443/cassandra/api/csnedges?graph_id=51d13998e4b0ebea2a3e81f6&limit=200&skip=100&filter=\{inst_id1:"51d13998e4b0ebea2a3e81fa"\}'
	 * curl -k -i  'https://localhost:8443/cassandra/api/csnedges?graph_id=51d13998e4b0ebea2a3e81f6&limit=200&skip=100&filter=\{weight:\{$gt:1000\}\}'
	 * 
	 * @param graph_id
	 * @param httpHeaders
	 * @return
	 */
	@GET
	public Response getEdges(
			@QueryParam("graph_id") String graph_id, 
			@QueryParam("filter") String filters,
			@QueryParam("limit") int limit,
			@QueryParam("skip") int skip,
			@QueryParam("count") boolean count) 
	{
		return Utils.returnResponse(PrettyJSONPrinter.prettyPrint(new MongoGraphs().getEdges(graph_id,filters, 
				limit, skip, count)));
	}
}
