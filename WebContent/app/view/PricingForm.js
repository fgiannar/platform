/*
 * File: app/view/PricingForm.js
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

Ext.define('C.view.PricingForm', {
	extend: 'Ext.form.Panel',

	padding: 5,
	autoScroll: true,
	layout: {
		type: 'auto'
	},
	bodyPadding: '10px',

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype: 'fieldset',
					title: 'Properties',
					items: [
						{
							xtype: 'textfield',
							width: 246,
							fieldLabel: 'Name',
							name: 'name',
							listeners: {
								change: {
									fn: me.onTextfieldChange11,
									scope: me
								}
							}
						},
						{
							xtype: 'combobox',
							width: 246,
							fieldLabel: 'Type <span style=color:red>*</span>',
							name: 'type',
							allowBlank: false,
							displayField: 'pricingTypeName',
							queryMode: 'local',
							store: 'PricingTypeStore',
							valueField: 'pricingTypeTag',
							listeners: {
								change: {
									fn: me.onComboboxChange,
									scope: me
								}
							}
						},
						{
							xtype: 'textareafield',
							width: 246,
							fieldLabel: 'Description',
							name: 'description'
						},
						{
							xtype: 'numberfield',
							width: 246,
							fieldLabel: 'Billing Cycle',
							name: 'billingCycle',
							allowDecimals: false
						},
						{
							xtype: 'numberfield',
							width: 246,
							fieldLabel: 'Fixed Charge',
							name: 'fixedCharge'
						},
						{
							xtype: 'numberfield',
							itemId: 'offpeakPrice',
							width: 246,
							fieldLabel: 'Offpeak Price',
							name: 'offpeakPrice'
						}
					]
				},
				{
					xtype: 'fieldset',
					itemId: 'ScalarEnergyPricing',
					layout: {
						type: 'auto'
					},
					title: 'Extra Parameters',
					items: [
						{
							xtype: 'gridpanel',
							title: 'Levels',
							forceFit: false,
							store: 'LevelsStore',
							viewConfig: {
								minHeight: 70
							},
							columns: [
								{
									xtype: 'numbercolumn',
									dataIndex: 'order',
									text: 'Order',
									editor: {
										xtype: 'numberfield',
										allowDecimals: false,
										minValue: 0
									}
								},
								{
									xtype: 'numbercolumn',
									dataIndex: 'price',
									text: 'Price',
									editor: {
										xtype: 'numberfield'
									}
								},
								{
									xtype: 'numbercolumn',
									dataIndex: 'level',
									text: 'Level',
									editor: {
										xtype: 'numberfield'
									}
								}
							],
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
													fn: me.onButtonClick2,
													scope: me
												}
											}
										},
										{
											xtype: 'button',
											text: 'Delete',
											listeners: {
												click: {
													fn: me.onButtonClick12,
													scope: me
												}
											}
										}
									]
								}
							],
							plugins: [
								Ext.create('Ext.grid.plugin.RowEditing', {
									clicksToMoveEditor: 1
								})
							]
						}
					]
				},
				{
					xtype: 'fieldset',
					hidden: true,
					itemId: 'ScalarEnergyPricingTimeZones',
					title: 'Extra Parameters',
					items: [
						{
							xtype: 'gridpanel',
							title: 'Levels',
							store: 'LevelsStore',
							viewConfig: {
								minHeight: 70
							},
							columns: [
								{
									xtype: 'numbercolumn',
									dataIndex: 'order',
									text: 'Order',
									editor: {
										xtype: 'numberfield',
										allowDecimals: false,
										minValue: 0
									}
								},
								{
									xtype: 'numbercolumn',
									dataIndex: 'price',
									text: 'Price',
									editor: {
										xtype: 'numberfield'
									}
								},
								{
									xtype: 'numbercolumn',
									dataIndex: 'level',
									text: 'Level',
									editor: {
										xtype: 'numberfield'
									}
								}
							],
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
													fn: me.onButtonClick21,
													scope: me
												}
											}
										},
										{
											xtype: 'button',
											text: 'Delete',
											listeners: {
												click: {
													fn: me.onButtonClick121,
													scope: me
												}
											}
										}
									]
								}
							],
							plugins: [
								Ext.create('Ext.grid.plugin.RowEditing', {
									clicksToMoveEditor: 1
								})
							]
						},
						{
							xtype: 'gridpanel',
							title: 'Offpeak',
							store: 'OffpickStore',
							viewConfig: {
								minHeight: 70
							},
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
													fn: me.onButtonClick211,
													scope: me
												}
											}
										},
										{
											xtype: 'button',
											text: 'Delete',
											listeners: {
												click: {
													fn: me.onButtonClick1211,
													scope: me
												}
											}
										}
									]
								}
							],
							plugins: [
								Ext.create('Ext.grid.plugin.RowEditing', {
									clicksToMoveEditor: 1
								})
							],
							columns: [
								{
									xtype: 'numbercolumn',
									dataIndex: 'from',
									text: 'From',
									editor: {
										xtype: 'numberfield'
									}
								},
								{
									xtype: 'numbercolumn',
									dataIndex: 'to',
									text: 'To',
									editor: {
										xtype: 'numberfield'
									}
								}
							]
						}
					]
				},
				{
					xtype: 'fieldset',
					hidden: true,
					itemId: 'EnergyPowerPricing',
					layout: {
						align: 'stretch',
						type: 'hbox'
					},
					title: 'Extra Parameters',
					items: [
						{
							xtype: 'numberfield',
							width: 200,
							fieldLabel: 'Contracted Capacity',
							labelWidth: 60,
							name: 'contractedCapacity'
						},
						{
							xtype: 'numberfield',
							width: 200,
							fieldLabel: 'Energy Price',
							labelWidth: 60,
							name: 'energyPrice'
						},
						{
							xtype: 'numberfield',
							width: 200,
							fieldLabel: 'Power Price',
							labelWidth: 60,
							name: 'powerPrice'
						}
					]
				},
				{
					xtype: 'fieldset',
					hidden: true,
					itemId: 'AllInclusivePricing',
					layout: {
						align: 'stretch',
						type: 'hbox'
					},
					title: 'Extra Parameters',
					items: [
						{
							xtype: 'numberfield',
							width: 200,
							fieldLabel: 'Contracted Energy',
							labelWidth: 60,
							name: 'contractedEnergy',
							allowDecimals: false
						},
						{
							xtype: 'numberfield',
							width: 200,
							fieldLabel: 'Fixed Cost',
							labelWidth: 60,
							name: 'fixedCost'
						},
						{
							xtype: 'numberfield',
							width: 200,
							fieldLabel: 'Additional Cost',
							labelWidth: 60,
							name: 'additionalCost'
						}
					]
				},
				{
					xtype: 'fieldset',
					itemId: 'TOUPricing',
					layout: {
						type: 'auto'
					},
					title: 'Extra Parameters',
					items: [
						{
							xtype: 'numberfield',
							width: 200,
							fieldLabel: 'Onekw24',
							labelWidth: 60,
							name: 'onekw24',
							readOnly: true
						},
						{
							xtype: 'gridpanel',
							margin: '10 0 0 0',
							title: 'Timezones',
							store: 'TimezonesStore',
							viewConfig: {
								minHeight: 70
							},
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
													fn: me.onButtonClick212,
													scope: me
												}
											}
										},
										{
											xtype: 'button',
											text: 'Delete',
											listeners: {
												click: {
													fn: me.onButtonClick1212,
													scope: me
												}
											}
										}
									]
								}
							],
							plugins: [
								Ext.create('Ext.grid.plugin.RowEditing', {
									clicksToMoveEditor: 1
								})
							],
							columns: [
								{
									xtype: 'gridcolumn',
									dataIndex: 'starttime',
									text: 'Starttime',
									editor: {
										xtype: 'timefield',
										invalidText: '{0} is not a valid time. </br> (i.e. 24:56)'
									}
								},
								{
									xtype: 'gridcolumn',
									dataIndex: 'endtime',
									text: 'Endtime',
									editor: {
										xtype: 'timefield',
										invalidText: '{0} is not a valid time. </br> (i.e. 24:56)'
									}
								},
								{
									xtype: 'numbercolumn',
									dataIndex: 'price',
									text: 'Price',
									editor: {
										xtype: 'numberfield'
									}
								}
							]
						}
					]
				},
				{
					xtype: 'button',
					itemId: 'btn',
					margin: '10px 120px',
					width: 70,
					text: 'Update',
					listeners: {
						click: {
							fn: me.onButtonClick1,
							scope: me
						}
					}
				}
			]
		});

		me.callParent(arguments);
	},

	onTextfieldChange11: function(field, newValue, oldValue, eOpts) {
		this.setTitle(newValue);
		this.form.getRecord().node.set({'name':newValue});
	},

	onComboboxChange: function(field, newValue, oldValue, eOpts) {
		Ext.each(this.items.items, function(item, index){
			if (index > 0 && item.xtype != 'button')
			item.hide();
		});

		this.getComponent(newValue).show();

		if (newValue == 'ScalarEnergyPricingTimeZones')
		this.down('#offpeakPrice').show();
		else
		this.down('#offpeakPrice').hide();
	},

	onButtonClick2: function(button, e, eOpts) {

		this.query('grid')[0].store.insert(0, {price:0, level : 0});
		this.query('grid')[0].plugins[0].startEdit(0, 0);




	},

	onButtonClick12: function(button, e, eOpts) {
		console.info('Delete clicked.', this, button, e, eOpts);

		var selections = this.query('grid')[0].getView().getSelectionModel().getSelection();
		this.query('grid')[0].store.remove(selections);

	},

	onButtonClick21: function(button, e, eOpts) {

		this.query('grid')[1].store.insert(0, {order:1, price:0, level : 0});
		this.query('grid')[1].plugins[0].startEdit(0, 0);




	},

	onButtonClick121: function(button, e, eOpts) {
		console.info('Delete clicked.', this, button, e, eOpts);

		var selections = this.query('grid')[1].getView().getSelectionModel().getSelection();
		this.query('grid')[1].store.remove(selections);

	},

	onButtonClick211: function(button, e, eOpts) {

		this.query('grid')[2].store.insert(0, {price:0, level : 0});
		this.query('grid')[2].plugins[0].startEdit(0, 0);




	},

	onButtonClick1211: function(button, e, eOpts) {
		console.info('Delete clicked.', this, button, e, eOpts);

		var selections = this.query('grid')[2].getView().getSelectionModel().getSelection();
		this.query('grid')[2].store.remove(selections);

	},

	onButtonClick212: function(button, e, eOpts) {

		this.query('grid')[3].store.insert(0, {starttime:"", endtime:"", price : 0});
		this.query('grid')[3].plugins[0].startEdit(0, 0);




	},

	onButtonClick1212: function(button, e, eOpts) {
		console.info('Delete clicked.', this, button, e, eOpts);

		var selections = this.query('grid')[3].getView().getSelectionModel().getSelection();
		this.query('grid')[3].store.remove(selections);

	},

	onButtonClick1: function(button, e, eOpts) {
		var levels = [];
		var offpeak = []; 
		var levelsData = [];
		var timezones = [];
		var myForm = this.getForm();
		var record = myForm.getRecord();
		var values = myForm.getValues();

		switch (record.get('type')) {
			case 'ScalarEnergyPricing':
			levelsData = this.query('grid')[0].store.data;
			Ext.each(levelsData.items, function(index){
				levels.push(index.data);
			});
			break;
			case 'ScalarEnergyPricingTimeZones':
			levelsData = this.query('grid')[1].store.data;
			Ext.each(levelsData.items, function(index){
				levels.push(index.data);
			});
			var offpeakData =  this.query('grid')[2].store.data;
			Ext.each(offpeakData.items, function(index){
				offpeak.push(index.data);
			});
			break;
			case 'TOUPricing':
			var timezonesData = this.query('grid')[3].store.data;
			Ext.each(timezonesData.items, function(index){
				timezones.push(index.data);
			});
			break;
		}


		record.set({
			'name' : values.name,
			'type' : values.type,
			'description' : values.description,
			'billingCycle' : values.billingCycle,
			'fixedCharge' : values.fixedCharge,
			'offpeakPrice' : values.offpeakPrice,
			'levels' : levels,
			'offpeak' : offpeak,
			'contractedCapacity' : (record.get('type') == 'EnergyPowerPricing') ? values.contractedCapacity : 0,
			'energyPrice' : (record.get('type') == 'EnergyPowerPricing') ? values.energyPrice : 0,
			'powerPrice' : (record.get('type') == 'EnergyPowerPricing') ? values.powerPrice : 0,
			'contractedEnergy' : (record.get('type') == 'AllInclusivePricing') ? values.contractedEnergy : 0,
			'fixedCost' : (record.get('type') == 'AllInclusivePricing') ? values.fixedCost : 0,
			'additionalCost' : (record.get('type') == 'AllInclusivePricing') ? values.additionalCost : 0,
			'timezones': timezones
		});

		this.dirtyForm = false;
		//clear dirty record
		record.node.commit();

		if (record.isNew)
		record.isNew = false;
		//record.save();
	}

});