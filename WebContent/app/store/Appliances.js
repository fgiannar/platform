/*
 * File: app/store/Appliances.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
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

Ext.define('C.store.Appliances', {
	extend: 'Ext.data.Store',

	requires: [
		'C.model.Appliance'
	],

	constructor: function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			autoLoad: false,
			autoSync: true,
			remoteFilter: true,
			storeId: 'MyJsonStore4',
			model: 'C.model.Appliance',
			clearOnPageLoad: false,
			proxy: {
				type: 'rest',
				url: '/cassandra/api/app',
				reader: {
					type: 'json',
					root: 'data',
					totalProperty: 'size'
				},
				writer: {
					type: 'json'
				}
			},
			listeners: {
				load: {
					fn: me.onJsonstoreLoad,
					scope: me
				},
				update: {
					fn: me.onJsonstoreUpdate,
					single: false,
					scope: me
				},
				remove: {
					fn: me.onJsonstoreRemove,
					scope: me
				},
				beforeload: {
					fn: me.onJsonstoreBeforeLoad,
					scope: me
				}
			}
		}, cfg)]);
	},

	onJsonstoreLoad: function(store, records, successful, options) {
		if(store.navigationNode){
			Ext.each(records, function(record, index){
				var node = store.navigationNode.appendChild({
					id: record.data._id,
					name: record.data.name,
					nodeType: 'Appliance',
					nodeId: record.data._id,
					nodeStoreId: store.storeId,
					leaf: true,
					expandable: false,
					draggable: true
				});
				record.node = node;
			});
		}else{
			console.info('Store is not bound to a navigation node. Nothing to render there.');
		}
	},

	onJsonstoreUpdate: function(abstractstore, record, operation, modifiedFieldNames, options) {
		if (!record.node) {
			if (operation == 'commit') {
				console.info('++ Node does not exist. Creating it.');
				var node = abstractstore.navigationNode.appendChild({
					id: record.get('_id'),
					name: record.get('name'),
					nodeType: 'Appliance',
					nodeId: record.get('_id'),
					nodeStoreId: abstractstore.storeId,
					expanded: false,
					leaf: true,
					expandable: false,
					draggable: true
				});
				record.node = node;
				C.app.createForm(record.node);
			}
		}

	},

	onJsonstoreRemove: function(store, record, index, options) {
		store.navigationNode.removeChild(record.node);
	},

	onJsonstoreBeforeLoad: function(store, operation, options) {
		if (C.dbname) this.proxy.headers = {"dbname": C.dbname};
	}

});