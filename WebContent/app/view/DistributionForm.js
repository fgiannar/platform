/*
 * File: app/view/DistributionForm.js
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

Ext.define('C.view.DistributionForm', {
	extend: 'Ext.form.Panel',

	border: '0 0 0 0',
	frame: false,
	margin: '10px',
	style: 'border: none',
	width: 170,
	layout: {
		type: 'auto'
	},
	bodyBorder: false,
	bodyCls: 'x-panel-mc',
	bodyPadding: 10,
	closable: false,
	collapsible: false,
	titleCollapse: false,

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype: 'container',
					height: 326,
					padding: '10px',
					width: 151,
					items: [
						{
							xtype: 'textfield',
							width: 126,
							name: 'name'
						},
						{
							xtype: 'textfield',
							width: 126,
							name: 'type'
						},
						{
							xtype: 'textareafield',
							height: 41,
							width: 128,
							name: 'description'
						},
						{
							xtype: 'combobox',
							width: 128,
							name: 'distrType',
							readOnly: false,
							allowBlank: false,
							displayField: 'distrType',
							queryMode: 'local',
							store: 'DistrTypeStore',
							valueField: 'distrType'
						},
						{
							xtype: 'textareafield',
							height: 45,
							width: 129,
							name: 'val'
						},
						{
							xtype: 'textareafield',
							height: 67,
							width: 129,
							name: 'params'
						},
						{
							xtype: 'button',
							margin: '10px 0 0 50px',
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
		});

		me.callParent(arguments);
	},

	onButtonClick2: function(button, e, options) {

		var myForm = this.getForm();
		var record = myForm.getRecord(),
		values = myForm.getFieldValues();

		var parameters = myForm.getFieldValues().params;
		var valuesDistr = myForm.getFieldValues().val;
		var myConsModChartStore = this.query('chart')[0].store;

		try {
			parameters = JSON.parse(parameters);
		}
		catch(e) {
			Ext.MessageBox.alert('Field "parameters" must be an array');
			return false;
		}
		try {
			valuesDistr = JSON.parse(valuesDistr);
		}
		catch(e) {
			Ext.MessageBox.alert('Field "values" must be an array');
			return false;
		}

		if (record) {
			myForm.updateRecord();
			record.set({'parameters': parameters, 'values': valuesDistr});
			myConsModChartStore.removeAll();
			myConsModChartStore.load();
		}
		else {
			var actmod_record = propertiesCmp.getForm().getRecord();
			var distr_store = actmod_record.c.store;
			distr_store.insert(0,{
				name:values.name,
				type: values.type,
				description: values.description,
				distrType: values.distrType,
				values: valuesDistr, 
				parameters: parameters,
				actmod_id:actmod_record.get('_id')
			});
			distr_type = this.distr_type;
			distr_store.on('update', function(records) {
				actmod_record.set(distr_type,records.data.items[0].get('_id') );
				myConsModChartStore.proxy.url += '/' + records.data.items[0].get('_id');
				myConsModChartStore.load();
			});							  
		}


	}

});