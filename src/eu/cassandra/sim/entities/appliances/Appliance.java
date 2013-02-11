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
package eu.cassandra.sim.entities.appliances;

import com.mongodb.BasicDBObject;

import eu.cassandra.server.mongo.MongoAppliances;
import eu.cassandra.sim.entities.Entity;
import eu.cassandra.sim.entities.appliances.ConsumptionModel.Tripplet;
import eu.cassandra.sim.entities.installations.Installation;
import eu.cassandra.sim.utilities.Constants;
import eu.cassandra.sim.utilities.RNG;

/**
 * Class modeling an electric appliance. The appliance has a stand by
 * consumption otherwise there are a number of periods along with their
 * consumption rates.
 * 
 * @author kyrcha
 * @version prelim
 */
public class Appliance extends Entity {
	private final ConsumptionModel cm;
	private final double standByConsumption;
	private final boolean base;
	private final Installation installation;
	
	private boolean inUse;
	private long onTick;
	private String who;
	
	public static class Builder {
		// Required variables
		private final String id;
		private final String description;
		private final String type;
	    private final String name;
		private final Installation installation;
		private final ConsumptionModel cm;
		private final double standByConsumption;
		private final boolean base;
		// Optional or state related variables
		private long onTick = -1;
		private String who = null;
		public Builder(
				String aid,
				String aname, 
				String adesc, 
				String atype,
				Installation ainstallation, 
				ConsumptionModel acm, 
				double astandy, 
				boolean abase) {
			id = aid;
			name = aname;
			description = adesc;
			type = atype;		
			installation = ainstallation;
			cm = acm;
			standByConsumption = astandy;
			base = abase;
		}
		public Appliance build() {
			return new Appliance(this);
		}
	}
	
	private Appliance(Builder builder) {
		id = builder.id;
		name = builder.name;
		description = builder.description;
		type = builder.type;
		installation = builder.installation;
		standByConsumption = builder.standByConsumption;
		cm = builder.cm;
		base = builder.base;
		inUse = (base) ? true : false;
		onTick = (base) ? -RNG.nextInt(Constants.MIN_IN_DAY) : builder.onTick;
		who = builder.who;
	}

	public Installation getInstallation() {
		return installation;
	}

	public boolean isInUse() {
		return inUse;
	}
	
	public ConsumptionModel getConsumptionModel() {
		return cm;
	}

	public double getPower(long tick) {
		double power = 0;
		// TODO
		if(isInUse()) {
			long relativeTick = Math.abs(tick - onTick);
			// If the device has a limited operational duration
			long divTick = relativeTick / cm.getTotalDuration();
			if(divTick >= cm.getOuterN() && cm.getOuterN() > 0) {
				power = 0;
			} else {
				int sum = 0;
				long moduloTick = relativeTick % cm.getTotalDuration();
				int index1 = -1;
				for(int i = 0; i < cm.getPatternN(); i++) {
					sum += (cm.getN(i) * cm.getPatternDuration(i));
					long whichPattern = moduloTick / sum;
					if(whichPattern == 0) {
						index1 = i;
						break;
					}
				}
				sum = 0;
				long moduloTick2 = moduloTick % cm.getPatternDuration(index1);
				int index2 = -1;
				for(int j = 0; j < cm.getPattern(index1).size(); j++) {
					sum += ((Tripplet)cm.getPattern(index1).get(j)).d;
					long whichPattern = moduloTick2 / sum;
					if(whichPattern == 0) {
						index2 = j;
						break;
					}
				}
				relativeTick++;		
				power = ((Tripplet)cm.getPattern(index1).get(index2)).p; 
			}
			//System.out.println(name + " " + tick + " " + power);
		} else {
			power = standByConsumption;
		}
		return power;
	}

	public void turnOff() {
		if(!base) {
			inUse = false;
			onTick = -1;
		}
	}

	public void turnOn(long tick, String awho) {
		inUse = true;
		onTick = tick;
		who = awho;
	}

	public long getOnTick() {
		return onTick;
	}
	
	public String getWho() {
		return who;
	}
	
	public static void main(String[] args) {
		// TODO [TEST] check the getPower method
		RNG.init();
		String s = "{ \"n\" : 0, \"params\" : [{ \"n\" : 1, \"values\" : [ {\"p\" : 140.0, \"d\" : 20, \"s\": 0.0}, {\"p\" : 117.0, \"d\" : 18, \"s\": 0.0}, {\"p\" : 0.0, \"d\" : 73, \"s\": 0.0}]},{ \"n\" : 1, \"values\" : [ {\"p\" : 14.0, \"d\" : 20, \"s\": 0.0}, {\"p\" : 11.0, \"d\" : 18, \"s\": 0.0}, {\"p\" : 5.0, \"d\" : 73, \"s\": 0.0}]}]}";
		Appliance freezer = new Appliance.Builder("id2",
				"freezer", 
				"A new freezer", 
				"FreezerA", 
				null,
				new ConsumptionModel(s),
				2f,
				true).build();
		System.out.println(freezer.getId());
		System.out.println(freezer.getName());
		for(int i = 0; i < 200; i++) {
			System.out.println(freezer.getPower(i));
		}
	}

	@Override
	public BasicDBObject toDBObject() {
		BasicDBObject obj = new BasicDBObject();
		obj.put("name", name);
		obj.put("description", description);
		obj.put("standby_consumption", standByConsumption);
		obj.put("inst_id", parentId);
		return obj;
	}

	@Override
	public String getCollection() {
		return MongoAppliances.COL_APPLIANCES;
	}
	
}
