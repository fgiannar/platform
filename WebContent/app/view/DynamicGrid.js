/*
 * File: app/view/DynamicGrid.js
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

Ext.define('C.view.DynamicGrid', {
	extend: 'Ext.grid.Panel',

	height: 250,
	margin: '0 0 10px 0',
	minWidth: 400,
	width: 400,
	autoScroll: true,
	bodyCls: 'gridbg',
	closable: false,
	title: 'My Grid Panel',
	forceFit: true,
	store: 'Scenarios',
	columnLines: false,

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			viewConfig: {
				loadingText: 'loading..',
				plugins: [
					Ext.create('Ext.grid.plugin.DragDrop', {
						ptype: 'gridviewdragdrop',
						ddGroup: 'ddGlobal'
					})
				],
				listeners: {
					beforedrop: {
						fn: me.onGriddragdroppluginBeforeDrop,
						scope: me
					}
				}
			},
			columns: [
				{
					xtype: 'gridcolumn',
					dataIndex: '_id',
					text: '_id'
				}
			],
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					ptype: 'rowediting'
				})
			],
			selModel: Ext.create('Ext.selection.RowModel', {
				mode: 'MULTI'
			}),
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					width: 508,
					items: [
						{
							xtype: 'button',
							text: 'New',
							listeners: {
								click: {
									fn: me.onButtonClick,
									scope: me
								}
							}
						},
						{
							xtype: 'button',
							text: 'Delete',
							listeners: {
								click: {
									fn: me.onButtonClick1,
									scope: me
								}
							}
						},
						{
							xtype: 'button',
							text: 'Edit',
							listeners: {
								click: {
									fn: me.onButtonClick11,
									scope: me
								}
							}
						}
					]
				}
			],
			listeners: {
				itemdblclick: {
					fn: me.onGridpanelItemDblClick,
					scope: me
				}
			}
		});

		me.callParent(arguments);
	},

	onGriddragdroppluginBeforeDrop: function(node, data, overModel, dropPosition, dropFunction, options) {
		console.info('Before drop.', this, node, data, overModel, dropPosition, dropFunction, options);
		/* NOTE
		Returning false to this event signals that the drop gesture was invalid, and if the drag proxy will
		animate back to the point from which the drag began.
		Returning 0 To this event signals that the data transfer operation should not take place, but that
		the gesture was valid, and that the repair operation should not take place.
		*/

		if('C.model.'+data.records[0].get('nodeType')==this.store.model.modelName){
			dropFunction.cancelDrop();
			record = data.records[0];
			var index = Ext.getStore(record.get('nodeStoreId')).findExact('_id',record.get('id'));
			var node = Ext.getStore(record.get('nodeStoreId')).getAt(index);
			parent_id = this.store.navigationNode.parentNode.get('id');
			parent_idKey = '';
			switch(record.get('nodeType')){
				case 'Scenario': parent_idKey = 'project_id'; break;
				case 'SimulationParam': parent_idKey = 'scn_id'; break;
				case 'Installation': parent_idKey = 'scn_id'; break;
				case 'Demographic': parent_idKey = 'scenario_id'; break;
				case 'Person': parent_idKey = 'inst_id'; break;
				case 'Appliance': parent_idKey = 'inst_id'; break;
				case 'Activity': parent_idKey = 'pers_id'; break;
				case 'ActivityModel': parent_idKey = 'act_id'; break;
				default: return false;
			}

			if ( (!Ext.EventObject.shiftKey || record.get('nodeType') == 'Demographic' || record.get('nodeType') == 'SimulationParam' ) && (record.get('nodeType') != 'Appliance' && record.get('nodeType') != 'ActivityModel') ){

				//Ext.sliding_box.msg('Drag and Drop info', 'By holding <b>Shift</b> key pressed while copying a node </br> all its childred will be copied as well');

				var dataToAdd = JSON.parse(JSON.stringify(node.data));
				delete dataToAdd._id;
				dataToAdd[parent_idKey] = parent_id;
				this.store.add(dataToAdd);
			} 
			else {
				data.copy = true;
				var targetID = '';
				var meID = '';
				switch(record.get('nodeType')){
					case 'Scenario': targetID = 'toPrjID'; meID = 'scnID'; parent_idKey = 'prj_id'; break;
					case 'Installation': targetID = 'toScnID'; meID = 'instID'; parent_idKey = 'scn_id'; break;
					case 'Person': targetID = 'toInstID'; meID = 'persID'; break;
					case 'Activity': targetID = 'toPersID'; meID = 'actID'; break;
					case 'ActivityModel': targetID = 'toActID'; meID = 'actmodID'; break;
					case 'Appliance': targetID = 'toInstID'; meID = 'appID'; break;
					default: return false;
				}
				//TODO See why on failure success function is executed
				Ext.Ajax.request({
					url: 'http://localhost:8080/cassandra/api/copy?'+meID+'='+node.get('_id')+'&'+targetID+'='+parent_id,
					method: 'POST',
					scope: this,
					callback: function(options, success, response) {	
						response = JSON.parse(response.responseText);
						if (response.success) {
							var params = {};
							params[parent_idKey] = parent_id;
							this.store.navigationNode.removeAll();
							this.store.load( {params : params });
							Ext.sliding_box.msg('Success', JSON.stringify(response.message));
						}
						else {
							Ext.MessageBox.show({title:'Error', msg: JSON.stringify(response.errors), icon: Ext.MessageBox.ERROR, buttons: Ext.MessageBox.OK});
						}
					}
					/*success: function(response, options) {
					var message = Ext.JSON.decode(response.responseText).message;
					var params = {};
					params[parent_idKey] = parent_id;
					this.store.navigationNode.removeAll();
					this.store.load( {params : params });
					Ext.sliding_box.msg('Success', JSON.stringify(message));
					},
					failure: function(response, options) {
					var errors = Ext.JSON.decode(response.responseText).errors;
					Ext.MessageBox.show({title:'Error', msg: JSON.stringify(errors), icon: Ext.MessageBox.ERROR});
					}*/
				});
				return 0;
			}
		}
		return false;
	},

	onButtonClick: function(button, e, options) {
		console.info('Add clicked.', this, button, e, options);

		var parent_id = (this.store.navigationNode.get('nodeType') == 'ProjectsCollection')?'':this.store.navigationNode.parentNode.get('id');
		var inputArray = {};
		switch(this.store.navigationNode.get('nodeType')){
			case 'ProjectsCollection': inputArray = {};break;
			case 'ScenariosCollection': inputArray = {'project_id' : parent_id};break;
			case 'InstallationsCollection': inputArray = {'scenario_id' : parent_id}; break;
			case 'DemographicsCollection': inputArray = {'scn_id' : parent_id}; break;
			case 'SimulationParamsCollection': inputArray = {'scn_id' : parent_id, calendar: {}}; break;
			case 'PersonsCollection': inputArray = {'inst_id' : parent_id}; break;
			case 'AppliancesCollection': inputArray = {'inst_id': parent_id}; break;
			case 'ActivitiesCollection': inputArray = {'pers_id': parent_id}; break;
			case 'ActivityModelsCollection': inputArray = {'act_id' : parent_id, containsAppliances:[]}; break;
			default: return false;
		}
		var currentModel = this.store.getProxy().getModel();
		var cur_record = new currentModel(inputArray);

		this.store.insert(0, cur_record);

		/*this.store.on('update', function(abstractstore, records, operation) {
		if (operation == 'commit') {
		var record = this.getAt(0);
		C.app.createForm(record.node);
		}
		});
		*/

		//this.plugins[0].startEdit(0, 0);



	},

	onButtonClick1: function(button, e, options) {
		console.info('Delete clicked.', this, button, e, options);

		var tabs = Ext.getCmp('MainTabPanel');
		var selections = this.getView().getSelectionModel().getSelection();

		if (selections) {

			//check if there are open tabs with selections and if yes, close them
			Ext.each(selections, function(selection, index) {
				var node = selection.node;
				var pathToMe =  node.get('nodeType')+':'+node.getPath();
				Ext.each (tabs.items.items, function(item, index) {
					if (item.pathToMe == pathToMe) {
						item.close();
						return false;
					}
				});
			});

			this.store.remove(selections);
		}
	},

	onButtonClick11: function(button, e, options) {
		console.info('Edit clicked.', this, button, e, options);

		var selections = this.getView().getSelectionModel().getSelection();
		if (selections) {
			Ext.each(selections, function(index){
				C.app.createForm(index.node);
			});
		}
	},

	onGridpanelItemDblClick: function(tablepanel, record, item, index, e, options) {
		C.app.createForm(record.node);
	}

});