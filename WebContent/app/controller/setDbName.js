/*
 * File: app/controller/setDbName.js
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

Ext.define('C.controller.setDbName', {
	extend: 'Ext.app.Controller',

	init: function(application) {
		C.dbname = window.location.hash.replace('#','');

		var params = Ext.urlDecode(location.search.substring(1));
		if (params.publicPage) {
			C.publicPage = true;
		}
		//set max loaded records limit
		C.limit = 200;

		//increase request timeout
		Ext.Ajax.timeout = 180000; // 180 seconds
		Ext.override(Ext.form.Basic, {
			timeout: Ext.Ajax.timeout / 1000
		});
		Ext.override(Ext.data.proxy.Server, {
			timeout: Ext.Ajax.timeout
		});
		Ext.override(Ext.data.Connection, {
			timeout: Ext.Ajax.timeout
		});

		//prevent pop up windows move out of browser area
		Ext.override(Ext.Window, {
			constrainHeader: true
		});

		Ext.QuickTips.init();
		// invalid markers to sides
		Ext.form.Field.prototype.msgTarget = 'side';


		Ext.util.Observable.observe(Ext.data.proxy.Rest);
		Ext.data.proxy.Rest.on('exception', function(server, response,operation) {
			try {
				var response_obj = JSON.parse(response.responseText);
				var action = response.request.options.operation.action;
				if (action == 'create' || action == 'update') {
					var record = response.request.options.operation.records[0];
					var store = record.store;
					if (action == 'create') {
						store.remove(record);
					}
					else if (action == 'update')
					store.rejectChanges();
				}
				Ext.MessageBox.show({title:'Error', msg: JSON.stringify(response_obj.errors), icon: Ext.MessageBox.ERROR, buttons: Ext.MessageBox.OK}); 
			}
			catch (e) {
				Ext.MessageBox.show({title:'Error', msg: response.status + '-' + response.statusText, icon: Ext.MessageBox.ERROR, buttons: Ext.MessageBox.OK});
			}
		});



		Ext.util.Observable.observe(Ext.data.AbstractStore);

		Ext.data.AbstractStore.on('write', function(store, operation, options) {
			if (Ext.getCmp("MainTabPanel").getActiveTab() && Ext.getCmp("MainTabPanel").getActiveTab().corresponding_node.get('nodeId') == operation.records[0].get('_id')) {
				if (Ext.getDom("warnings")) {
					Ext.getDom("warnings").parentElement.remove();
				}
			}

			var response =  Ext.JSON.decode(operation.response.responseText);
			if (response.warnings) {
				var warnings_html = "<ul id ='warnings'>";
				Ext.each(response.warnings, function(warning) {
					warnings_html += "<li>" + warning + "</li>";
				});
				warnings_html += "</ul>";

				Ext.getCmp("MainTabPanel").getActiveTab().insert(0, { html: warnings_html });
			}

			var successMsg = response.message;
			Ext.sliding_box.msg('Success', JSON.stringify(successMsg));
		});


		Ext.data.AbstractStore.on('add', function(store, records, index, options) {
			Ext.each(records, function(record){
				record.isNew = true;
			});
		});

		Ext.util.Observable.observe(Ext.data.Connection);
		Ext.data.Connection.on('beforerequest', function(conn, options, eOpts) {
			if (!options.headers)
			options.headers = (C.dbname) ? { "dbname": C.dbname, 'Authorization': Ext.util.Cookies.get('auth')} : {'Authorization': C.auth};
			if (Ext.getCmp("MainTabPanel")) {
				Ext.getCmp("MainTabPanel").setLoading();
			}
		});

		Ext.data.Connection.on('requestcomplete', function(conn, options, eOpts) {
			if (Ext.getCmp("MainTabPanel")) {
				Ext.getCmp("MainTabPanel").setLoading(false);
			}
		});

		Ext.data.Connection.on('requestexception', function(conn, response, options, eOpts) {
			if (Ext.getCmp("MainTabPanel")) {
				Ext.getCmp("MainTabPanel").setLoading(false);
			}
			var msg = '';
			try {
				var response_obj = JSON.parse(response.responseText);
				msg = JSON.stringify(response_obj.errors);
			}
			catch(e) {
				msg = response.status + ' - ' + response.statusText;
			}
			Ext.MessageBox.show({title:'Error', msg: msg, icon: Ext.MessageBox.ERROR, buttons: Ext.MessageBox.OK});

		});


		Ext.util.Observable.observe(Ext.tab.Tab);
		Ext.tab.Tab.on('close', function(panel, options) {
			if (Ext.getCmp("MainTabPanel").query("tab").length == 1)
			Ext.getCmp("MainTabPanel").dockedItems.items[0].hide();
		});



	}

});
