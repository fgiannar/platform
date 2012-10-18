/*
 * File: app/model/Activity.js
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

Ext.define('C.model.Activity', {
	extend: 'Ext.data.Model',

	idProperty: '_id',

	fields: [
		{
			name: '_id'
		},
		{
			name: 'name',
			type: 'string'
		},
		{
			name: 'type',
			type: 'string'
		},
		{
			name: 'description',
			type: 'string'
		},
		{
			name: 'pers_id'
		},
		{
			name: 'activityModels',
			mapping: 'act_models_counter',
			persist: false,
			type: 'int'
		}
	]
});