/*
 * File: app/store/PublicConsumptionComparisonStore.js
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

Ext.define('C.store.PublicConsumptionComparisonStore', {
	extend: 'Ext.data.Store',

	constructor: function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId: 'PublicConsumptionComparisonStore',
			proxy: {
				type: 'ajax',
				reader: {
					type: 'array',
					root: 'energyBarsData'
				}
			},
			fields: [
				{
					name: 'name',
					type: 'string'
				},
				{
					name: 'value',
					type: 'float'
				}
			]
		}, cfg)]);
	}
});