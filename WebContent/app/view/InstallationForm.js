/*
 * File: app/view/InstallationForm.js
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

Ext.define('C.view.InstallationForm', {
	extend: 'Ext.form.Panel',

	padding: 5,
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
									labelStyle: 'margin-top: 10px',
									name: 'x',
									step: 0.01
								},
								{
									xtype: 'numberfield',
									width: 246,
									fieldLabel: 'Long',
									labelStyle: 'margin-top: 10px',
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
			]
		});

		me.callParent(arguments);
	},

	onTextfieldChange11111: function(field, newValue, oldValue, eOpts) {
		this.setTitle(newValue);
		this.form.getRecord().node.set({'name':newValue});
	},

	onButtonClick2: function(button, e, eOpts) {

		var myForm = this.getForm();
		var record = myForm.getRecord();

		myForm.updateRecord();

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