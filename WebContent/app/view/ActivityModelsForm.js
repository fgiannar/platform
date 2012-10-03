/*
 * File: app/view/ActivityModelsForm.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
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

Ext.define('C.view.ActivityModelsForm', {
	extend: 'Ext.form.Panel',

	height: 388,
	width: 555,
	layout: {
		type: 'auto'
	},
	bodyPadding: 10,
	closable: true,
	title: 'My Form',

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype: 'container',
					activeItem: 0,
					layout: {
						align: 'middle',
						type: 'hbox'
					},
					items: [
						{
							xtype: 'container',
							padding: '10px',
							flex: 0,
							items: [
								{
									xtype: 'textfield',
									width: 246,
									name: 'name',
									fieldLabel: 'Name'
								},
								{
									xtype: 'textfield',
									width: 246,
									name: 'type',
									fieldLabel: 'Type'
								},
								{
									xtype: 'textareafield',
									width: 246,
									name: 'description',
									fieldLabel: 'Description'
								}
							]
						},
						{
							xtype: 'container',
							padding: '10px',
							width: 266,
							flex: 0,
							items: [
								{
									xtype: 'combobox',
									width: 246,
									name: 'day_type',
									fieldLabel: 'Day type',
									displayField: 'day_type',
									queryMode: 'local',
									store: 'DayTypeStore',
									valueField: 'day_type'
								},
								{
									xtype: 'checkboxfield',
									name: 'shiftable',
									fieldLabel: 'Shiftable',
									boxLabel: ''
								}
							]
						}
					]
				},
				{
					xtype: 'button',
					margin: '10px 0 0 120px',
					width: 150,
					text: 'Update',
					listeners: {
						click: {
							fn: me.onButtonClick2,
							scope: me
						}
					}
				}
			]
		});

		me.callParent(arguments);
	},

	onButtonClick2: function(button, e, options) {
		var gridIds = [];
		var myForm = this.getForm();
		var record = myForm.getRecord(),
		values = myForm.getFieldValues();
		console.info(record, this.query('grid')[0].store.data);
		var gridData = this.query('grid')[0].store.data;

		Ext.each(gridData.items, function(index){
			gridIds.push(index.get('_id'));

		});

		record.set('containsAppliances', gridIds);

		gridData = this.query('grid')[1].store.data;
		var duration = gridData.items.length > 0 ? gridData.items[0].get('_id') : '';
		record.set('duration', duration);

		gridData = this.query('grid')[2].store.data;
		var startTime = gridData.items.length > 0 ? gridData.items[0].get('_id') : '';
		record.set('startTime', startTime);

		gridData = this.query('grid')[3].store.data;
		var repeatsNrOfTime = gridData.items.length > 0 ? gridData.items[0].get('_id') : '';
		record.set('repeatsNrOfTime', startTime); 

		//record.setDirty();
		myForm.updateRecord();console.info(record);
		//record.save();


	}

});