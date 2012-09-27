/*   
   Copyright 2011-2012 The Cassandra Consortium (cassandra-fp7.eu)


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
package eu.cassandra.server.mongo;

import eu.cassandra.server.api.exceptions.RestQueryParamMissingException;
import eu.cassandra.server.mongo.util.JSONValidator;
import eu.cassandra.server.mongo.util.JSONtoReturn;
import eu.cassandra.server.mongo.util.MongoDBQueries;

public class MongoActivities {

	public final static String COL_ACTIVITIES = "activities";
	public final static String REF_PERSON = "pers_id";

	/**
	 * 
	 * curl -i http://localhost:8080/cassandra/api/act/4fedc0cde4b00db232508ea6
	 * 
	 * @param cid
	 * @return
	 */
	public String getActivity(String id) {
		return new MongoDBQueries().getEntity(COL_ACTIVITIES,"_id", 
				id, "Activity retrieved successfully", false).toString();
	}

	/**
	 * curl -i http://localhost:8080/cassandra/api/act?pers_id=4ff154f8e4b0c855ac36d9ad
	 * 
	 * @param inst_id
	 * @return
	 */
	public String getActivities(String pers_id, boolean count) {
		if(pers_id == null) {
			return new JSONtoReturn().createJSONError(
					"Only the Activities of a particular Installation can be retrieved", 
					new RestQueryParamMissingException("inst_id QueryParam is missing")).toString();
		}
		else {
			return new MongoDBQueries().getEntity(COL_ACTIVITIES,"pers_id", 
					pers_id, "Activities retrieved successfully",count).toString();
		}
	}

	/**
	 * curl -i --data  @activity.json    --header Content-type:application/json http://localhost:8080/cassandra/api/act
	 * 
	 * @param dataToInsert
	 * @return
	 */
	public String createActivity(String dataToInsert) {
		return new MongoDBQueries().insertData(COL_ACTIVITIES ,dataToInsert,
				"Activity created successfully", MongoPersons.COL_PERSONS ,"pers_id",
				JSONValidator.ACTIVITY_SCHEMA).toString();
	}

	/**
	 * curl -i -X DELETE http://localhost:8080/cassandra/api/act/4ff153dbe4b0c855ac36d9a7
	 * 
	 * @param cid
	 * @return
	 */
	public String deleteActivity(String id) {
		return new MongoDBQueries().deleteDocument(COL_ACTIVITIES, id).toString();
	}

	/**
	 * curl -X PUT -d @activity.json   --header Content-type:application/json   http://localhost:8080/cassandra/api/act/4fec8b53df4ffdb8d1d1ce57
	 * 
	 * @param cid
	 * @param jsonToUpdate
	 * @return
	 */
	public String updateActivity(String id,String jsonToUpdate) {
		return new MongoDBQueries().updateDocument("_id", id,jsonToUpdate,
				COL_ACTIVITIES, "Activity updated successfully",
				MongoPersons.COL_PERSONS ,"pers_id",JSONValidator.ACTIVITY_SCHEMA).toString();
	}

}