/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	models: [
		'Project',
		'Scenario',
		'Installation',
		'Person',
		'Activity',
		'ActivityModel',
		'Appliance',
		'ConsumptionModel',
		'SimulationParam',
		'Run',
		'Distribution',
		'Demographic',
		'DemographicEntity',
		'Results',
		'DistributionResults'
	],
	stores: [
		'Projects',
		'Scenarios',
		'NavigationTreeStore',
		'Installations',
		'Persons',
		'Appliances',
		'Activities',
		'ActivityModels',
		'Distributions',
		'ConsumptionModels',
		'SimulationParams',
		'Runs',
		'DayTypeStore',
		'ActmodAppliances',
		'DistrTypeStore',
		'SetupStore',
		'EnergyClassStore',
		'PersonTypesStore',
		'ApplianceTypesStore',
		'SeasonsStore',
		'Demographics',
		'DemographicEntities',
		'Results',
		'MetricStore',
		'ConsumptionModelValues',
		'DistributionValues'
	],
	views: [
		'MyViewport',
		'RelationsGrid',
		'DistributionForm',
		'DynamicGrid',
		'InstallationForm',
		'ApplianceForm',
		'PersonForm',
		'ActivityForm',
		'SimulationParamsForm',
		'ActmodPropertiesForm',
		'TypesPieChart',
		'ProjectForm',
		'DemographicForm',
		'EntitiesGrid',
		'ResultsGraphForm',
		'ConsModChart',
		'DistributionChart'
	],
	autoCreateViewport: true,
	name: 'C',
	controllers: [
		'setDbName'
	],

	createForm: function(record) {
		if (!record.isExpanded())record.expand();//basic in order to be rendered

		var breadcrumb = record.getPath();
		var pathToMe =  record.get('nodeType')+':'+breadcrumb;
		var namesBreadcrumb = record.getPath('name');
		var tabs = Ext.getCmp('MainTabPanel');
		var isOpen = false;
		Ext.each (tabs.items.items, function(item, index) {
			if (item.pathToMe == pathToMe) {
				tabs.setActiveTab(item);
				isOpen = true;
				return false;
			}
		});
		if (!isOpen) {
			var cmpToAdd;

			if (record.get('nodeType').search('Collection') > 0 ) {
				var grid = Ext.getCmp('uiNavigationTreePanel').getCustomGrid(record.c.store);
				if (record.get('nodeType') == 'RunsCollection') {
					grid.getDockedItems()[0].hidden = true;
				}
				cmpToAdd = grid;
			}
			else {
				Ext.QuickTips.init();

				// invalid markers to sides
				Ext.form.Field.prototype.msgTarget = 'side';

				var myForm;
				var cur_record;
				switch(record.get('nodeType')) {
					case 'Project': 
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					myForm = C.app.getProjectForm(cur_record);
					break;
					case 'Scenario':
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					myForm = C.app.getScenarioForm(cur_record);
					break;
					case 'Installation':
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					myForm = C.app.getInstallationForm(cur_record);
					break;
					case 'Appliance':
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					myForm = C.app.getApplianceForm(cur_record);
					break;
					case 'Person':
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					myForm = C.app.getPersonForm(cur_record);
					break;
					case 'Activity':
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					myForm = C.app.getActivityForm(cur_record);
					break;
					case 'ActivityModel':
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					myForm = C.app.getActivityModelForm(cur_record);
					break;
					case 'SimulationParam':
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					myForm = C.app.getSimulationParamsForm(cur_record);
					break;
					case 'Demographic':
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					myForm = C.app.getDemographicForm(cur_record);
					break;
					case 'Run':
					cur_record = record.parentNode.c.store.getById(record.get('id'));
					if (cur_record.get('percentage') == 100) C.app.newRunWindow(cur_record);
					return false;
					case 'RunGraph':
					myForm = C.app.getResultsGraphForm();
					break;
					default:
					return false;
				}

				cmpToAdd = myForm;
			}
			cmpToAdd.pathToMe = pathToMe;
			cmpToAdd.setTitle(namesBreadcrumb.split('/').join(' >'));
			tabs.add(cmpToAdd);
			tabs.setActiveTab(cmpToAdd);
			tabs.getActiveTab().setTitle(record.get('name'));
		}
	},

	getScenarioForm: function(record) {
		var myFormCmp = new C.view.ScenarioForm({});

		var myForm = myFormCmp.getForm();

		myForm.loadRecord(record);

		if (!record.isNew) {
			myForm.findField('setup').readOnly = true;
		}

		/*var out='';
		var params = record.get('model').params;
		for (var param_key in params) {

		out = out + params[param_key].n + '{';
		var values = params[param_key].values;
		for (var value_key in values) {
		out = out + ',{ p:' + values[value_key].p + ', d:' + values[value_key].d + ', s:' + values[value_key].s + '}';
		}
		out = out + '}';
		}
		*/
		myPersonTypesStore = new C.store.PersonTypesStore({});
		myPersonTypesStore.load({
			params: {
				scn_id: record.node.get('nodeId')
			}
		});
		myPersonPie = new C.view.TypesPieChart({store: myPersonTypesStore, legend: {position:'right'}});
		myFormCmp.getComponent('pieChartContainer').insert(1, myPersonPie);

		myApplianceTypesStore = new C.store.ApplianceTypesStore({});
		myApplianceTypesStore.load({
			params: {
				scn_id: record.node.get('nodeId')
			}
		});
		myAppliancePie = new C.view.TypesPieChart({store: myApplianceTypesStore, legend: {position:'right'}});
		myFormCmp.getComponent('pieChartContainer').insert(3, myAppliancePie);

		Ext.each (record.node.childNodes, function(childNode, index) {
			if(!childNode.c){
				console.info('Creating structure for node '+childNode.data.name+'.', childNode);
				childNode.c = {
					store: {} // single store, not array (?)
				};
				switch(childNode.get('nodeType')) {
					case 'InstallationsCollection':
					childNode.c.store = new C.store.Installations({
						storeId: childNode.data.nodeType+'Store-scn_id-'+childNode.parentNode.get('nodeId'),
						navigationNode: childNode
					});
					break;
					case 'SimulationParamsCollection':
					childNode.c.store = new C.store.SimulationParams({
						storeId: childNode.data.nodeType+'Store-scn_id-'+childNode.parentNode.get('nodeId'),
						navigationNode: childNode
					});
					break;
					case 'DemographicsCollection':
					childNode.c.store = new C.store.Demographics({
						storeId: childNode.data.nodeType+'Store-scn_id-'+childNode.parentNode.get('nodeId'),
						navigationNode: childNode
					});
					break;
				}
				childNode.c.store.load({
					params: {
						scn_id: childNode.parentNode.get('nodeId')
					}
				});
			}
			var grid = Ext.getCmp('uiNavigationTreePanel').getCustomGrid(childNode.c.store);
			grid.closable = false;
			grid.setTitle(childNode.get('name'));
			myFormCmp.getComponent('dataContainer').insert(index + 1, grid);
		});

		console.info(record);
		return myFormCmp;
	},

	getActivityModelForm: function(record) {
		var myFormCmp = new C.view.ActivityModelForm({});

		var gridStore = new C.store.ActmodAppliances();
		var grid = new C.view.RelationsGrid({store:gridStore});

		propertiesCmp = new C.view.ActmodPropertiesForm({});
		var myForm = propertiesCmp.getForm();
		myForm.loadRecord(record);
		console.info(record);

		curUrl = '/cassandra/api/app?actmod_id=' + record.data._id;

		Ext.Ajax.request({
			url: curUrl,
			method: 'GET',
			scope: this,
			success: function(response, opts) {
				var o = Ext.decode(response.responseText);
				gridStore.loadData(o.data, true);
				var successMsg = Ext.JSON.decode(response.responseText).message;
				Ext.sliding_box.msg('Success', JSON.stringify(successMsg));
			},
			failure: function(response, options) {
				var errors = Ext.JSON.decode(response.responseText).errors;
				Ext.MessageBox.show({title:'Error', msg: JSON.stringify(errors), icon: Ext.MessageBox.ERROR});
			}
		});

		var myDurationCmp = C.app.getDistributionForm('duration', 'Duration');
		var myStartCmp = C.app.getDistributionForm('startTime', 'Start Time');
		var myRepeatsCmp = C.app.getDistributionForm('repeatsNrOfTime', 'Repeats Nr of Times');

		distr_store = new C.store.Distributions({
			storeId: 'DistributionsStore-actmod_id-'+record.node.get('nodeId'),
			listeners:{
				'load': 
				function(store,records,options){console.info(record);
					Ext.each(records, function(distr_record, index){
						var myCurrentCmp;
						if ( distr_record.get('_id') == record.get('duration')) {
							myCurrentCmp = myDurationCmp;
						}
						else if ( distr_record.get('_id') == record.get('startTime')) {
							myCurrentCmp = myStartCmp;
						}
						else if ( distr_record.get('_id') == record.get('repeatsNrOfTime')) {
							myCurrentCmp = myRepeatsCmp;
						}
						else {return true;}

						myCurrentCmp.getForm().loadRecord(distr_record);
						myCurrentCmp.getForm().setValues({ 
							params: JSON.stringify(distr_record.get('parameters')),
							val: JSON.stringify(distr_record.get('values'))
						});
						myCurrentCmp.query('chart')[0].store.proxy.url += '/' + distr_record.get('_id');
						myCurrentCmp.query('chart')[0].store.load();

					});			
				}
			}	
		});

		distr_store.load({
			params: {
				actmod_id: record.node.get('nodeId')
			}
		});

		record.c = {store: distr_store};
		propertiesCmp.items.items[0].getComponent('appliancesFieldset').insert(1,grid);
		myFormCmp.getComponent('properties_and_appliances').add(propertiesCmp);
		myFormCmp.getComponent('distributionsFieldSet').add(myDurationCmp);	
		myFormCmp.getComponent('distributionsFieldSet').add(myStartCmp);
		myFormCmp.getComponent('distributionsFieldSet').add(myRepeatsCmp);
		return myFormCmp;
	},

	launch: function() {
		this.dbname = window.location.hash.replace('#','');
		C.app = this;

		//C.dbname = window.location.hash.replace('#','');

	},

	getInstallationForm: function(record) {
		var myFormCmp = new C.view.InstallationForm({});

		var myForm = myFormCmp.getForm();

		myForm.loadRecord(record);

		Ext.each (record.node.childNodes, function(childNode, index) {
			if(!childNode.c){
				console.info('Creating structure for node '+childNode.data.name+'.', childNode);
				childNode.c = {
					store: {} // single store, not array (?)
				};
				switch(childNode.get('nodeType')) {
					case 'PersonsCollection':
					childNode.c.store = new C.store.Persons({
						storeId: childNode.data.nodeType+'Store-inst_id-'+childNode.parentNode.get('nodeId'),
						navigationNode: childNode
					});
					break;
					case 'AppliancesCollection':
					childNode.c.store = new C.store.Appliances({
						storeId: childNode.data.nodeType+'Store-inst_id-'+childNode.parentNode.get('nodeId'),
						navigationNode: childNode
					});
					break;
				}
				childNode.c.store.load({
					params: {
						inst_id: childNode.parentNode.get('nodeId')
					}
				});
			}
			var grid = Ext.getCmp('uiNavigationTreePanel').getCustomGrid(childNode.c.store);
			grid.closable = false;
			grid.setTitle(childNode.get('name'));
			myFormCmp.insert(index + 1, grid);
		});

		console.info(record);
		return myFormCmp;
	},

	getApplianceForm: function(record) {
		var myFormCmp = new C.view.ApplianceForm({});

		var myForm = myFormCmp.getForm();

		myForm.loadRecord(record);

		console.info(record);

		/*curUrl = '/cassandra/api/consmod?app_id=' + record.get('_id');

		Ext.Ajax.request({
		url: curUrl,
		method: 'GET',
		scope: this,
		success: function(response, opts) {
		var o = Ext.decode(response.responseText);
		var model = o.data[0] ? JSON.stringify(o.data[0].model) : {};
		myForm.setValues({ expression: model});
		var name = o.data[0] ? o.data[0].name : '';
		myForm.setValues({ consmod_name: name});
		var description = o.data[0] ? o.data[0].description : {};
		myForm.setValues({ consmod_description: description});
		}
		});
		*/
		consmodGraphStore = new C.store.ConsumptionModelValues({});
		myResultsChart = new C.view.ConsModChart({store: consmodGraphStore});
		myFormCmp.insert(3, myResultsChart);

		consmod_store = new C.store.ConsumptionModels({
			storeId: 'ConsumptionModelsStore-app_id-'+record.node.get('nodeId'),
			listeners:{
				'load': 
				function(store,records,options){
					var consmod_record = records[0];
					if (consmod_record) {
						var model = JSON.stringify(consmod_record.get('model'));
						myForm.setValues({ expression: model});
						myForm.setValues({ consmod_name: consmod_record.get('name')});
						myForm.setValues({ consmod_description: consmod_record.get('description')});

						consmodGraphStore.proxy.url += '/' + consmod_record.get('_id');
						consmodGraphStore.load();
					}
				}
			}	
		});

		consmod_store.load({
			params: {
				app_id: record.node.get('id')
			}
		});
		record.c = {store: consmod_store};

		console.info(consmod_store);
		return myFormCmp;
	},

	getPersonForm: function(record) {
		var myFormCmp = new C.view.PersonForm({});

		var myForm = myFormCmp.getForm();

		myForm.loadRecord(record);

		var childNode = record.node.childNodes[0];
		if(!childNode.c){
			console.info('Creating structure for node '+childNode.data.name+'.', childNode);
			childNode.c = {
				store: {} // single store, not array (?)
			};

			childNode.c.store = new C.store.Activities({
				storeId: childNode.data.nodeType+'Store-pers_id-'+childNode.parentNode.get('nodeId'),
				navigationNode: childNode
			});

			childNode.c.store.load({
				params: {
					pers_id: childNode.parentNode.get('nodeId')
				}
			});
		}

		var grid = Ext.getCmp('uiNavigationTreePanel').getCustomGrid(childNode.c.store);
		grid.closable = false;
		grid.setTitle(childNode.get('name'));
		myFormCmp.insert(1, grid);

		console.info(record);
		return myFormCmp;
	},

	getActivityForm: function(record) {
		var myFormCmp = new C.view.ActivityForm({});

		var myForm = myFormCmp.getForm();

		myForm.loadRecord(record);

		var childNode = record.node.childNodes[0];
		if(!childNode.c){
			console.info('Creating structure for node '+childNode.data.name+'.', childNode);
			childNode.c = {
				store: {} // single store, not array (?)
			};

			childNode.c.store = new C.store.ActivityModels({
				storeId: childNode.data.nodeType+'Store-act_id-'+childNode.parentNode.get('nodeId'),
				navigationNode: childNode
			});

			childNode.c.store.load({
				params: {
					act_id: childNode.parentNode.get('nodeId')
				}
			});
		}

		var grid = Ext.getCmp('uiNavigationTreePanel').getCustomGrid(childNode.c.store);
		grid.closable = false;
		grid.setTitle(childNode.get('name'));
		myFormCmp.insert(1, grid);

		console.info(record);
		return myFormCmp;
	},

	getDistributionForm: function(distr_type, title) {
		var distrCmp = new C.view.DistributionForm({distr_type: distr_type});
		distrCmp.setTitle(title);
		var distrGraphStore = new C.store.DistributionValues({});

		switch (distr_type) {
			case 'duration': distrGraphStore.xAxisTitle = 'Duration (Minutes)'; break;
			case 'startTime': distrGraphStore.xAxisTitle = 'Start Time (Minute of day)'; break;
			case 'repeatsNrOfTime': distrGraphStore.xAxisTitle = 'Daily Repetitions'; break;
		}
		var myResultsChart = new C.view.DistributionChart({store: distrGraphStore});
		var myChartLabel = new Ext.form.Label({
			style: 'font-size:10px;',
			text:''
		});
		myChartLabel.html = '<b>Probability</b> (%) Vs <br /><b>'+ distrGraphStore.xAxisTitle +'</b>';
		var myClickLabel = new Ext.form.Label({
			style: 'font-size:10px; font-style:italic;',
			text: 'Click on the chart to enlarge'
		});

		distrCmp.add(myChartLabel);
		distrCmp.add(myResultsChart);
		distrCmp.add(myClickLabel);

		return distrCmp;


	},

	getSimulationParamsForm: function(record) {
		var myFormCmp = new C.view.SimulationParamsForm({});

		var myForm = myFormCmp.getForm();

		myForm.loadRecord(record);

		var ended = '';
		var day = record.get('calendar').dayOfMonth;
		var month = record.get('calendar').month - 1;
		var year = record.get('calendar').year;
		var started = (new Date(year,month,day) == 'Invalid Date') ? '' : new Date(year,month,day);
		if (started) {
			ended = (record.get('numberOfDays') === 0) ? '' : new Date((started.getTime() + record.get('numberOfDays')*24*60*60*1000));
		}
		myForm.setValues({ dateStarted:  started, dateEnds: ended});
		console.info(record);
		return myFormCmp;
	},

	getProjectForm: function(record) {
		var myFormCmp = new C.view.ProjectForm({});

		var myForm = myFormCmp.getForm();

		myForm.loadRecord(record);

		Ext.each (record.node.childNodes, function(childNode, index) {
			if(!childNode.c){
				console.info('Creating structure for node '+childNode.data.name+'.', childNode);
				childNode.c = {
					store: {} // single store, not array (?)
				};
				switch(childNode.get('nodeType')) {
					case 'ScenariosCollection':
					childNode.c.store = new C.store.Scenarios({
						storeId: childNode.data.nodeType+'Store-prj_id-'+childNode.parentNode.get('nodeId'),
						navigationNode: childNode
					});
					break;
					case 'RunsCollection':
					childNode.c.store = new C.store.Runs({
						storeId: childNode.data.nodeType+'Store-prj_id-'+childNode.parentNode.get('nodeId'),
						navigationNode: childNode
					});
					break;
					default: return false;
				}
				childNode.c.store.load({
					params: {
						prj_id: childNode.parentNode.get('nodeId')
					}
				});
			}
			var grid = Ext.getCmp('uiNavigationTreePanel').getCustomGrid(childNode.c.store);
			grid.closable = false;
			if (childNode.get('nodeType') == 'RunsCollection') grid.getDockedItems()[0].hidden = true;
			grid.setTitle(childNode.get('name'));
			myFormCmp.insert(index + 1, grid);
		});

		console.info(record);
		return myFormCmp;
	},

	newRunWindow: function(record) {
		var url = document.URL+'#'+record.get('_id');
		var wname = 'cassandra';
		var wfeatures = 'menubar=yes,resizable=yes,scrollbars=yes,status=yes,location=yes';
		window.open(url,wname,wfeatures);


	},

	getDemographicForm: function(record) {
		var myFormCmp = new C.view.DemographicForm({});
		var myForm = myFormCmp.getForm();
		myForm.loadRecord(record);

		/*var gridStore =  new C.store.DemographicEntities();
		gridStore.loadData(record.get('generators'));*/
		var demoGrid = new C.view.EntitiesGrid();
		demoGrid.store.loadData(record.get('generators'));
		demoGrid.scenarioId = record.node.parentNode.parentNode.get('nodeId');
		/*store = gridStore,
		fields = store.getProxy().getModel().getFields(),
		cols = [];


		// Create columns for new store
		Ext.Array.forEach(fields, function (f) {
			cols.push({
				header: f.name,
				dataIndex: f.name,
				hidden: false//(f.type.type == 'auto') ? true : false
			});
		});

		demoGrid.reconfigure(store, cols); */

		myFormCmp.items.items[0].getComponent('entitiesFieldset').insert(1,demoGrid);
		return myFormCmp;

	},

	getResultsGraphForm: function() {
		var myFormCmp = new C.view.ResultsGraphForm({});

		myResultsStore = new C.store.Results({});
		/*myResultsStore.load({
		params: {
		scn_id: record.node.get('nodeId')
		}
		});*/

		myResultsStore.load();
		myResultsChart = new C.view.ResultsLineChart({store: myResultsStore});
		myFormCmp.insert(2, myResultsChart);

		return myFormCmp;
	}

});
