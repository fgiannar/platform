/*
 * File: app/view/InstallationForm.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('C.view.InstallationForm', {
	extend: 'Ext.form.Panel',

	autoScroll: true,
	bodyPadding: 10,
	title: 'My Form',

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype: 'container',
					minWidth: 400,
					width: 400,
					autoScroll: true,
					layout: {
						type: 'anchor'
					},
					items: [
						{
							xtype: 'fieldset',
							padding: '10px',
							width: 400,
							title: 'Properties',
							items: [
								{
									xtype: 'textfield',
									width: 246,
									fieldLabel: 'Name',
									name: 'name',
									listeners: {
										change: {
											fn: me.onTextfieldChange11111,
											scope: me
										}
									}
								},
								{
									xtype: 'textfield',
									width: 246,
									fieldLabel: 'Type',
									name: 'type'
								},
								{
									xtype: 'textareafield',
									width: 246,
									fieldLabel: 'Description',
									name: 'description'
								},
								{
									xtype: 'textfield',
									width: 246,
									fieldLabel: 'Transformer ID',
									name: 'trans_id'
								},
								{
									xtype: 'textfield',
									width: 246,
									fieldLabel: 'Location',
									name: 'location'
								},
								{
									xtype: 'numberfield',
									formBind: false,
									width: 246,
									fieldLabel: 'Lat',
									name: 'x',
									step: 0.01
								},
								{
									xtype: 'numberfield',
									width: 246,
									fieldLabel: 'Long',
									name: 'y',
									step: 0.01
								},
								{
									xtype: 'button',
									itemId: 'btn',
									margin: '10px 0 0 185px',
									width: 70,
									text: 'Update',
									listeners: {
										click: {
											fn: me.onButtonClick2,
											scope: me
										}
									}
								}
							]
						}
					]
				}
			],
			tools: [
				{
					xtype: 'tool',
					type: 'unpin',
					listeners: {
						click: {
							fn: me.onToolClick1,
							scope: me
						}
					}
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'button',
							handler: function(button, event) {
								var formWindow = new Ext.Window({
									items  : new C.view.ThermalModuleForm({operation: 'create','inst_form_id': button.up('form').id}),
									title  : 'Add Thermal Modeling'
								}); 
								formWindow.show();
							},
							cls: 'add_thermal',
							itemId: 'add_thermal',
							text: 'Add thermal modeling'
						},
						{
							xtype: 'button',
							handler: function(button, event) {
								return false;
								var myFormCmp = button.up('form'),
									myForm = myFormCmp.getForm(),
									record = myFormCmp.getRecord();

								var thermalModuleForm = new C.view.ThermalModuleForm({operation: 'update'});
								var thermalModuleStore = Ext.getStore('thermalModuleStore_inst_id' + record.get('_id'));
								//thermalModuleStore.getProxy().url += '/' +  button.up('form').getRecord().get('thermalModule_id');

								thermalModuleForm.loadRecord(thermalModuleStore.getRange()[0]);


								var formWindow = new Ext.Window({
									items  :  thermalModuleForm,
									title  : 'Add Thermal Modeling'
								}); 
								formWindow.show();
							},
							cls: 'thermal_added',
							hidden: true,
							itemId: 'update_thermal',
							text: 'Update thermal modeling'
						},
						{
							xtype: 'button',
							handler: function(button, event) {
								return false;
								var myFormCmp = button.up('form'),
									myForm = myFormCmp.getForm(),
									record = myFormCmp.getRecord();

								var thermalModuleStore = Ext.getStore('thermalModuleStore_inst_id' + record.get('_id'));
								thermalModuleStore.removeAll();
								record.set('thermalModule_id', '');

								myFormCmp.down('#delete_thermal').hide();
								myFormCmp.down('#update_thermal').hide();
								myFormCmp.down('#add_thermal').show();
							},
							cls: 'thermal_added',
							hidden: true,
							itemId: 'delete_thermal',
							text: 'Delete thermal modeling'
						},
						{
							xtype: 'tbseparator'
						},
						{
							xtype: 'button',
							handler: function(button, event) {
								var formWindow = new Ext.Window({
									items  : new C.view.LightingModuleForm({operation: 'create','inst_form_id': button.up('form').id}),
									title  : 'Add Lighting Modeling',
									height : 600,
									overflowY: 'scroll'
								}); 
								formWindow.show();
							},
							cls: 'add_lighting',
							itemId: 'add_lighting',
							text: 'Add lighting modeling'
						},
						{
							xtype: 'button',
							handler: function(button, event) {
								var myFormCmp = button.up('form'),
									myForm = myFormCmp.getForm(),
									record = myFormCmp.getRecord();

								var lightingModuleForm = new C.view.LightingModuleForm({operation: 'update', 'inst_form_id':  button.up('form').id});
								var lightingModuleStore = Ext.getStore('lightingModuleStore_inst_id' + record.get('_id'));

								lightingModuleStore.on('load', function(store, records) {
									lightingModuleForm.loadRecord(records[0]);
								}, null, {single:true});

									lightingModuleStore.load({url:lightingModuleStore.proxy.url+'/'+record.get('lightingModule_id')});

									var formWindow = new Ext.Window({
										items  :  lightingModuleForm,
										title  : 'Add Lighting Modeling',
										height : 600,
										overflowY: 'scroll'
									}); 
									formWindow.show();
							},
							cls: 'lighting_added',
							hidden: true,
							itemId: 'update_lighting',
							text: 'Update lighting modeling'
						},
						{
							xtype: 'button',
							handler: function(button, event) {
								var myFormCmp = button.up('form'),
									myForm = myFormCmp.getForm(),
									record = myFormCmp.getRecord();

								var lightingModuleStore = Ext.getStore('lightingModuleStore_inst_id' + record.get('_id'));
								lightingModuleStore.removeAll();
								record.set('lightingModule_id', '');

								myFormCmp.down('#delete_lighting').hide();
								myFormCmp.down('#update_lighting').hide();
								myFormCmp.down('#add_lighting').show();
							},
							cls: 'lighting_added',
							hidden: true,
							itemId: 'delete_lighting',
							text: 'Delete lighting modeling'
						}
					]
				}
			]
		});

		me.callParent(arguments);
	},

	onTextfieldChange11111: function(field, newValue, oldValue, eOpts) {
		this.setTitle(newValue);
		var node = C.app.getNodeFromTree(this.form.getRecord().internalId);
		node.set({'name':newValue});
	},

	onButtonClick2: function(button, e, eOpts) {

		var myForm = this.getForm();
		var node =C.app.getNodeFromTree(myForm.getRecord().internalId);
		var record = C.app.getRecordByNode(node);

		myForm.updateRecord(record);

		this.dirtyForm = false;

		//clear dirty record
		record.node.commit();

		if (record.isNew)
		record.isNew = false;
	},

	onToolClick1: function(tool, e, eOpts) {
		C.app.handleFormUnpin();
	}

});