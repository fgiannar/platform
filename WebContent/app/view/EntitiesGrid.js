/*
 * File: app/view/EntitiesGrid.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('C.view.EntitiesGrid', {
	extend: 'Ext.grid.Panel',

	margin: '10px 0',
	columnLines: false,
	forceFit: true,
	store: 'DemographicEntities',

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			viewConfig: {
				minHeight: 100,
				autoScroll: false,
				loadingText: 'loading..',
				plugins: [
					Ext.create('Ext.grid.plugin.DragDrop', {
						ddGroup: 'ddGlobal',
						enableDrag: false
					})
				],
				listeners: {
					beforedrop: {
						fn: me.onGriddragdroppluginBeforeDrop,
						scope: me
					},
					drop: {
						fn: me.onGriddragdroppluginDrop,
						scope: me
					}
				}
			},
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
							text: 'Delete',
							listeners: {
								click: {
									fn: me.onButtonClick1,
									scope: me
								}
							}
						}
					]
				}
			],
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {

				})
			],
			columns: [
				{
					xtype: 'gridcolumn',
					hidden: true,
					dataIndex: 'entity_id',
					text: 'Entity_id'
				},
				{
					xtype: 'gridcolumn',
					dataIndex: 'entity_type',
					text: 'Entity_type'
				},
				{
					xtype: 'gridcolumn',
					dataIndex: 'entity_name',
					text: 'Entity_name'
				},
				{
					xtype: 'numbercolumn',
					dataIndex: 'probability',
					text: 'Probability',
					editor: {
						xtype: 'numberfield',
						maxValue: 1
					}
				}
			]
		});

		me.callParent(arguments);
	},

	onGriddragdroppluginBeforeDrop: function(node, data, overModel, dropPosition, dropFunction, eOpts) {
		console.info('Before drop.', this, node, data, overModel, dropPosition, dropFunction, eOpts);
		/* NOTE
		Returning false to this event signals that the drop gesture was invalid, and if the drag proxy will
		animate back to the point from which the drag began.
		Returning 0 To this event signals that the data transfer operation should not take place, but that
		the gesture was valid, and that the repair operation should not take place.
		*/

		var record = data.records[0];

		if( (record.get('nodeType')=='Appliance' || record.get('nodeType')=='Person')&& record.parentNode.parentNode.parentNode.parentNode.get('nodeId') == this.scenarioId){

			data.copy = true;

			this.store.insert(0, {'entity_id':record.get('nodeId'), 'entity_name':record.get('name'), 'entity_type':record.get('nodeType').toLowerCase()});
			dropFunction.cancelDrop();
			this.plugins[0].startEdit(0, 0);
			return 0;
		}
		return false;


	},

	onGriddragdroppluginDrop: function(node, data, overModel, dropPosition, eOpts) {
		return false;
	},

	onButtonClick1: function(button, e, eOpts) {
		console.info('Delete clicked.', this, button, e, eOpts);

		var selection = this.getView().getSelectionModel().getSelection();
		if (selection) {
			this.store.remove(selection);	
		}
	}

});